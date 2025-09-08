# Web Login App

This project is a simple web application that provides a login and signup functionality using Firebase authentication. It includes a basic user interface for users to log in, sign up, and verify their email through a One-Time Password (OTP) system.

## Features

- User login with email and password.
- User signup with full name and email.
- OTP verification sent to the user's email for account verification.
- Password validation to ensure security.

## Technologies Used

- React
- Firebase Authentication
- CSS for styling

## Project Structure

```
web-login-app
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   ├── OTPVerification.jsx
│   │   └── PasswordValidation.js
│   ├── firebase
│   │   └── firebaseConfig.js
│   ├── App.jsx
│   ├── index.js
│   └── styles
│       └── main.css
├── package.json
├── README.md
└── .gitignore
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd web-login-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Email/Password authentication in the Firebase Authentication section.
   - Update the `firebaseConfig.js` file with your Firebase project configuration.

5. Start the application:
   ```
   npm start
   ```

## Usage

- Navigate to the login page to log in with your email and password.
- If you don't have an account, click on the signup link to create a new account.
- After signing up, check your email for the OTP and enter it to verify your account.

## License

This project is open-source and available under the MIT License.