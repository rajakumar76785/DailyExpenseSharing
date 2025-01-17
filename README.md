Daily Expenses Backend
Overview
This backend service allows users to manage daily expenses, including splitting costs among participants and generating balance sheets.

Setup and Installation
Clone the Repository

git clone https://github.com/rajakumar76785/DailyExpenseSharing.git
cd DailyExpenseSharing
Install Dependencies


npm install
Set Up Environment Variables

Create a .env file in the root directory and add:


JWT_SECRET=your_jwt_secret
Start the Server

Ensure MongoDB is running locally, then start the server:

bash
Copy code
npm run dev
API Endpoints
POST /api/auth/register: Register a new user.
POST /api/auth/login: Authenticate and receive a JWT token.
POST /api/expenses: Add a new expense (requires JWT token).
GET /api/expenses/user/:userId: Retrieve expenses for a user (requires JWT token).
GET /api/expenses/overall: Retrieve all expenses (requires JWT token).
GET /api/expenses/download: Download the balance sheet (requires JWT token).
Running the Backend
To run the backend server, use:


npm run dev
