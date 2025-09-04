# Candidatem - Employee Candidate Nurturing Management

A React-based dashboard for managing and nurturing employee candidates through the hiring process.

![Candidate Dashboard](https://github.com/user-attachments/assets/c9e65355-f26f-40b7-a73b-2bc7676fe810)

## Features

- **Dashboard Overview**: Visual summary of active candidates, high priority candidates, and candidates in final stages
- **Candidate Cards**: Detailed view of each candidate including:
  - First contact date with days elapsed
  - Current status in the hiring process
  - Priority level (High/Medium/Low)
  - Closing date when applicable
- **Data Visualization**: 
  - Bar chart showing priority distribution
  - Doughnut chart showing status distribution
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React** with TypeScript
- **Chart.js** with react-chartjs-2 for data visualization
- **CSS3** for styling and responsive design
- **Jest** for testing

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tnir/candidatem.git
   cd candidatem
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the dashboard in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Future Enhancements

The following features are planned for future releases:

- **Persistent Data Storage**: Integration with Supabase or Cloudflare D1 for data persistence
- **Candidate Management**: Add, edit, and delete candidates
- **Advanced Filtering**: Filter candidates by status, priority, or date range
- **Email Integration**: Track email communications with candidates
- **Notes and Comments**: Add notes and comments to candidate records
- **Calendar Integration**: Schedule and track interviews
- **Reporting**: Advanced analytics and reporting features
- **Team Collaboration**: Multi-user support with role-based permissions

## Data Model

The application uses the following data structure for candidates:

```typescript
interface Candidate {
  id: string;
  name: string;
  firstContactDate: Date;
  closingDate?: Date;
  status: CandidateStatus;
  priority: CandidatePriority;
  isActive: boolean;
}
```

### Candidate Statuses
- Initial Contact
- Phone Screening
- Interview Scheduled
- Technical Interview
- Final Interview
- Offer Made
- Hired
- Rejected
- Withdrawn

### Priority Levels
- High
- Medium
- Low
