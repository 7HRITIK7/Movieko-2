# Booking App

## Overview
This project is a booking application that consists of a backend server built with Node.js and Express, and a frontend application built with React. The application allows users to book movie tickets, view offers, and manage their bookings.

## Project Structure
```
booking-app
├── api
│   ├── server.js
│   ├── routes
│   │   └── index.js
│   ├── controllers
│   │   └── index.js
│   ├── models
│   │   └── index.js
│   └── package.json
├── src
│   ├── app.js
│   ├── components
│   │   └── [component files]
│   └── index.js
├── public
│   └── [static files]
├── package.json
├── vercel.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd booking-app
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd api
   npm install
   cd ../src
   npm install
   cd ..
   ```

3. Install `concurrently` to run both servers simultaneously:
   ```bash
   npm install concurrently --save-dev
   ```

### Running the Application
To run both the backend and frontend simultaneously, use the following command from the root directory:
```bash
npm start
```

This command will start the backend server and the frontend application concurrently.

### Deployment on Vercel
To deploy the application on Vercel, ensure that the `vercel.json` file is configured correctly. Here’s an example configuration:

```json
{
  "builds": [
    {
      "src": "api/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "src/index.js",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/src/$1"
    }
  ]
}
```

### Features
- User can book movie tickets.
- View available offers and discounts.
- Manage bookings and view booking history.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.