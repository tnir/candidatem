import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Candidate, CandidateStatus, CandidatePriority } from '../types/Candidate';
import { getStatusColor, getPriorityColor } from '../utils/candidateData';
import CandidateCard from './CandidateCard';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardProps {
  candidates: Candidate[];
}

const Dashboard: React.FC<DashboardProps> = ({ candidates }) => {
  const activeCandidates = candidates.filter(c => c.isActive).slice(0, 10);

  // Status distribution data
  const statusCounts = activeCandidates.reduce((acc, candidate) => {
    acc[candidate.status] = (acc[candidate.status] || 0) + 1;
    return acc;
  }, {} as Record<CandidateStatus, number>);

  const statusData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Candidates by Status',
        data: Object.values(statusCounts),
        backgroundColor: Object.keys(statusCounts).map(status => 
          getStatusColor(status as CandidateStatus)
        ),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Priority distribution data
  const priorityCounts = activeCandidates.reduce((acc, candidate) => {
    acc[candidate.priority] = (acc[candidate.priority] || 0) + 1;
    return acc;
  }, {} as Record<CandidatePriority, number>);

  const priorityData = {
    labels: Object.keys(priorityCounts),
    datasets: [
      {
        label: 'Number of Candidates',
        data: Object.values(priorityCounts),
        backgroundColor: Object.keys(priorityCounts).map(priority => 
          getPriorityColor(priority as CandidatePriority)
        ),
        borderColor: Object.keys(priorityCounts).map(priority => 
          getPriorityColor(priority as CandidatePriority)
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Candidate Nurturing Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Active Candidates</h3>
            <p className="stat-number">{activeCandidates.length}</p>
          </div>
          <div className="stat-card">
            <h3>High Priority</h3>
            <p className="stat-number">
              {activeCandidates.filter(c => c.priority === CandidatePriority.HIGH).length}
            </p>
          </div>
          <div className="stat-card">
            <h3>In Final Stages</h3>
            <p className="stat-number">
              {activeCandidates.filter(c => 
                c.status === CandidateStatus.FINAL_INTERVIEW || 
                c.status === CandidateStatus.OFFER_MADE
              ).length}
            </p>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="charts-section">
          <div className="chart-container">
            <h3>Candidates by Priority</h3>
            <Bar data={priorityData} options={chartOptions} />
          </div>
          <div className="chart-container">
            <h3>Status Distribution</h3>
            <Doughnut data={statusData} options={doughnutOptions} />
          </div>
        </div>

        <div className="candidates-section">
          <h2>Active Candidates ({activeCandidates.length})</h2>
          <div className="candidates-grid">
            {activeCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;