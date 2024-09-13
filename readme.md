# CodeIgniter + React App

## Overview

This project is a web application that uses CodeIgniter as the backend framework and React for the frontend. CodeIgniter handles the server-side logic and API endpoints, while React provides a dynamic and responsive user interface.

## Features

- RESTful API with CodeIgniter
- Dynamic frontend with React
- User authentication
- CRUD operations
- Responsive design

## Prerequisites

- PHP 7.4 or higher
- Composer
- Node.js and npm (Node Package Manager)
- MySQL or any compatible database

## Installation

### Backend (CodeIgniter)

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mekdi1610/menu_management.git
   cd menu_management/backend
   ```

2. **Install Dependencies:**

   Make sure you have Composer installed. Run the following command to install CodeIgniter dependencies:

   ```bash
   composer install
   ```

3. **Configure Environment:**

   Copy the environment configuration file and adjust settings as needed:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database and other configuration settings.

4. **Run Migrations (if applicable):**

   If you have database migrations, run:

   ```bash
   Import the attached mysql db
   ```

5. **Start the Server:**

   ```bash
   php spark serve
   ```

   By default, the backend will be available at `http://localhost:8080`.

### Frontend (React)

1. **Navigate to the React Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies:**

   Ensure you have Node.js and npm installed. Run the following command to install React dependencies:

   ```bash
   npm install
   ```

3. **Configure API Endpoint:**

   Update the API endpoint in your React app to point to your backend server. This is typically done in a configuration file or directly in your API service files.

4. **Start the Development Server:**

   ```bash
   npm start
   ```

   By default, the React frontend will be available at `http://localhost:3000`.

## Usage

1. **Access the Application:**

   Open your browser and navigate to `http://localhost:3000` to access the React frontend. The React app will communicate with the CodeIgniter backend via API requests.

2. **API Endpoints:**

   The CodeIgniter backend exposes various API endpoints. Refer to the backend documentation or codebase for available endpoints and their usage.

## Development

- **Backend Development:**

  - CodeIgniter controllers, models, and views are located in the `backend/app` directory.
  - API routes are defined in `backend/app/Config/Routes.php`.

- **Frontend Development:**

  - React components are located in the `frontend/src` directory.
  - The main entry point is `frontend/src/index.js`.
