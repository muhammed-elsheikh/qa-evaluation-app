# QA Evaluation App

## Overview
The QA Evaluation App is a web application designed to streamline the evaluation submission process for the QA team. It allows users to submit evaluations through forms, manage evaluations with CRUD operations, and provides a simple dashboard for viewing submissions.

## Tech Stack
- **Backend**: Golang
- **Frontend**: React with Tailwind CSS
- **Database**: PostgreSQL

## Project Structure
```
qa-evaluation-app
├── backend
│   ├── main.go
│   ├── routes
│   │   └── routes.go
│   ├── controllers
│   │   └── evaluationController.go
│   ├── models
│   │   └── evaluation.go
│   ├── database
│   │   └── connection.go
│   └── go.mod
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── EvaluationForm.jsx
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.js
│   ├── public
│   │   └── index.html
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Run `go mod tidy` to install dependencies.
3. Set up your PostgreSQL database and update the connection settings in `backend/database/connection.go`.
4. Start the backend server by running `go run main.go`.

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies by running `npm install`.
3. Start the development server with `npm start`.

### Docker
To run the application using Docker, execute the following command in the root directory:
```
docker-compose up
```

## Usage
- Access the application in your browser at `http://localhost:3000`.
- Use the login page to authenticate and access the dashboard.
- Submit evaluations through the provided forms and manage them in the dashboard.

## Contributing
Feel free to submit issues or pull requests to improve the application.