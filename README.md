# Medical System Frontend

This project is a frontend system developed for managing relationships between doctors and patients. The application supports different roles (doctor and patient) and provides appropriate dashboards for each user type. The project uses React.js along with Material UI (MUI) for styling, Axios for API calls, and React Router for navigation.

## Features
- **Authentication**: Login and registration for both doctors and patients.
- **Doctor Dashboard**: Allows doctors to view available patients, link patients to their profile, and manage linked patients.
- **Patient Dashboard**: Allows patients to view available doctors and link themselves to a doctor.
- **Profile Management**: Users can edit their profile information and update their password.
- **Role-Based Navigation**: Depending on the user role (doctor or patient), they are redirected to the appropriate dashboard after login.

## Components
1. **AuthPage**: Handles login and registration functionality.
2. **DoctorDashboard**: Displays patients available for linking and linked patients for doctors.
3. **PatientDashboard**: Displays available doctors for linking and the current linked doctor for patients.
4. **UserDrawer**: Contains user profile details and options for editing the profile and logging out.
5. **DashboardLayout**: Layout component used to structure the dashboard pages.

## Context
- **AuthContext**: Manages user authentication state and provides `login`, `logout`, and `user` context values to the application.

## API Services
- **login**: Authenticates the user and retrieves a token.
- **register**: Registers a new user (either a doctor or a patient).
- **getDoctors**: Fetches a list of available doctors.
- **getPatients**: Fetches a list of available patients.
- **linkDoctor**: Links a patient to a doctor.
- **linkPatient**: Links a patient to a doctor.
- **editDoctor**: Edits the doctor's profile information.
- **editPatient**: Edits the patient's profile information.

## Testing
The project includes unit tests for the following components:
- **UserDrawer**: Verifies that the user profile information is displayed correctly and the logout functionality works.
- **AuthPage**: Ensures the login and registration form functionality.
- **DoctorDashboard**: Tests the correct rendering of available and linked patients for doctors.
- **PatientDashboard**: Tests the correct rendering of available and linked doctors for patients.

## Technologies Used
- **React**: For building the UI components.
- **Material UI (MUI)**: For UI styling and components.
- **Axios**: For making HTTP requests to the backend API.
- **React Router**: For handling client-side routing.
- **Jest & React Testing Library**: For writing unit tests.

## How to Run the Project
1. Install the dependencies:
   npm install

2. Start the development server:
npm start
3. Run the tests
npm test

Project Structure

- src/components: Contains reusable UI components such as UserDrawer and DashboardLayout.

- src/pages: Contains the main pages of the application such as AuthPage, DoctorDashboard, and PatientDashboard.

- src/services: Contains API service functions for making HTTP requests.

- src/contexts: Contains the AuthContext for managing authentication state.

- src/tests: Contains the unit tests for the application.