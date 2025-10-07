# 💰 Budget Tracker Backend

A robust and secure backend service for managing personal financial transactions and budgets.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/badge-No%20License-red)
![Stars](https://img.shields.io/github/stars/hazlmendoza/budget-tracker-backend?style=social)
![Forks](https://img.shields.io/github/forks/hazlmendoza/budget-tracker-backend?style=social)

## ✨ Features

*   🔐 **Secure User Authentication**: Protects financial data with robust authentication mechanisms using JSON Web Tokens.
*   💸 **Transaction Management API**: Provides comprehensive endpoints for creating, reading, updating, and deleting financial transactions.
*   📊 **Budget Tracking Capabilities**: Enables users to define budgets and monitor spending against them.
*   ⚡️ **High Performance & Scalability**: Built with Express.js and optimized for efficient data handling using `compression` and `lodash`.
*   🛡️ **Cross-Origin Resource Sharing (CORS)**: Securely handles requests from various frontend applications.


## 🚀 Installation Guide

Follow these steps to get the `budget-tracker-backend` up and running on your local machine.

### Prerequisites

Ensure you have the following installed:

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or Yarn

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/hazlmendoza/budget-tracker-backend.git
cd budget-tracker-backend
```

### Install Dependencies

Install all necessary project dependencies using npm:

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the root directory of the project based on the `.env.example` (if provided, otherwise create manually). This file will store your environment variables.

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/budgetdb
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

*   `PORT`: The port on which the server will run.
*   `MONGO_URI`: Your MongoDB connection string.
*   `JWT_SECRET`: A strong, secret key for signing JWTs.
*   `CORS_ORIGIN`: The URL of your frontend application to allow CORS requests.

### Running the Server

Start the development server using `nodemon` for automatic restarts on file changes:

```bash
npm run dev
```

The server should now be running at `http://localhost:5000` (or your specified `PORT`).


## 💡 Usage Examples

The backend exposes a RESTful API for managing budget data. Here are some basic examples of how to interact with it.

**Base URL**: `http://localhost:5000/api/v1` (adjust based on your `PORT` configuration)

### Register a User

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "securepassword123"
}
```

### Log In a User

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "securepassword123"
}
```
*Response will include a JWT token in the `Authorization` header or body.*

### Create a New Transaction

After logging in, use the received JWT token in the `Authorization` header for protected routes.

```http
POST /api/v1/transactions
Content-Type: application/json
Authorization: Bearer <YOUR_JWT_TOKEN>

{
  "description": "Groceries at SuperMart",
  "amount": 55.75,
  "type": "expense",
  "category": "Food",
  "date": "2023-10-26T10:00:00Z"
}
```

### Get All Transactions for a User

```http
GET /api/v1/transactions
Authorization: Bearer <YOUR_JWT_TOKEN>
```

## 🗺️ Project Roadmap

The `budget-tracker-backend` is under active development. Here are some planned features and improvements:

*   **Version 1.1 - Advanced Analytics**: Implement endpoints for generating financial reports, trends, and visualizations.
*   **Version 1.2 - Recurring Transactions**: Add functionality to manage and automate recurring income and expense entries.
*   **Version 1.3 - User Roles & Permissions**: Introduce different user roles (e.g., admin, standard user) with varying access levels.
*   **Future Enhancements**: Integration with third-party financial services, multi-currency support, and notification systems for budget limits.

## ⚖️ License Information

This project currently has **No License** specified. This means that by default, all rights are reserved by the copyright holder, and you may not use, distribute, or modify this software without explicit permission.

Copyright (c) 2023 hazlmendoza. All rights reserved.
