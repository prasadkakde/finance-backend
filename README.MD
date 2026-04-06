 ## Finance Backend  System

Project Overview

This is a role-based backend system for managing financial records.
It supports user management, transaction handling, and dashboard analytics with secure authentication.

## Admin Setup 
 Note :
         The admin user is created manually in the database for security purposes.  
         Admin credentials are not exposed in this repository.

## Features

*  JWT Authentication (Register & Login)
*  Role-Based Access Control (Admin, Analyst, Viewer)
*  Financial Records Management 
*  Dashboard Summary (Income, Expense, Trends)
*  Filtering Records(Recent Transaction , categeory )
*  Input Validation & Error Handling
*  Pagination Techinque



##  Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (Authentication)
* bcryptjs (Password hashing)

## API Testing tool
   ** Postman **

##  API Endpoints

##  User APIs

* POST /api/users/register → Register User
* POST /api/users/login → Login User
* GET /api/users → Get All Users (Admin only)
* PUT /api/users/:id → Update User (Admin only)
* DELETE /api/users/:id → Delete User (Admin only)


## Record APIs

* POST /api/records → Create Record (Admin only)
* GET /api/records → Get Records (Role-based access)
* PUT /api/records/:id → Update Record (Admin only)
* DELETE /api/records/:id → Delete Record (Admin only)



##  Dashboard API

* GET /api/dashboard → Get Dashboard Summary (Role-based access)

---

##  Role System

* **Admin**

  - Full access (users + records)
  - Can assign roles and create records for viewers

* **Analyst**

  - Can view all records
  - Can access dashboard insights

* **Viewer**

  - Can view only their own records only in Dashboard
  

---

## Setup Instructions

### 1️. Clone Repository


git clone  https://github.com/prasadkakde/finance-backend
cd finance-backend


## 2️. Install Dependencies


npm install


## 3️. Environment Variables (.env)


PORT=5000

MONGO_URI=mongodb+srv://kakdeprasad11_db_user:*****@cluster0.zprxrf3.mongodb.net/financeDB

JWT_SECRET=pra1234


## 4️ Run Server

    npm run dev


##  API Documentation

     published API docs link:

https://documenter.getpostman.com/view/48439439/2sBXiqEoew


##  Live API (Deployed)

https://finance-backend-1-m9id.onrender.com


###  Thought Process

##  My Thought Process 

1. Focused on **data modeling** and decided required input fields like name, email, role, amount, type, etc.
2. Faced initial confusion but understood how real systems structure data.
3. Designed **role-based system (Admin, Analyst, Viewer)**.
4. Created **Admin manually in database** for security, and admin assigns roles.
5. Learned that:
    -MongoDB is flexible and easy
    -SQL schema design is stricter and complex
6. Implemented **authentication using JWT (register & login)**.
7. Built system with clear access:

   - Admin → full control
   - Analyst → view & analyze data
   - Viewer → access only own data

8. Always thought in a **real-world backend perspective**.
9. Goal was to build a **practical and structured backend system**.


##  Author

Prasad Kakde
kakdeprasad11@gmail.com
