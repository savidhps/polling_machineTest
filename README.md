<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A NestJS backend application for managing public/private polls with admin and user roles.</p>

## 🗳️ Polling System - Backend

This is the backend for the Polling System project built using [NestJS](https://nestjs.com), featuring:
- Role-based access control (Admin/User)
- Public & Private Polls
- Voting system
- Poll Expiry logic
- JWT-based Authentication

---

## 📁 Project Structure


---

## 🛠️ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or remote instance)
- Postman (for testing APIs)
- `npm` or `yarn`

---

## 🚀 Project Setup

```bash
# Clone the repo
git clone https://github.com/your-username/polling-system-backend.git
cd polling-system-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Set your MongoDB URI and JWT Secret inside `.env`

# Start the development server
npm run start:dev

 Authentication
The application uses JWT-based authentication. After login, pass the token in the header for protected routes.

Header format:

makefile
Copy
Edit
Authorization: Bearer <token>
🧪 Testing Using Postman
Import the Postman collection from /postman/polling-system-collection.json or create requests as per below.

🧍 Register (User/Admin)
arduino
Copy
Edit
POST /auth/register
Body:

json
Copy
Edit
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456",
  "role": "admin"
}
🔐 Login
bash
Copy
Edit
POST /auth/login
➕ Create Poll (Admin only)
nginx
Copy
Edit
POST /poll
Authorization: Bearer <admin_token>
📥 Vote in Poll (User)
ruby
Copy
Edit
POST /poll/:pollId/vote
Authorization: Bearer <user_token>
Body:
{
  "option": "Option A"
}
📊 Get Poll Results
ruby
Copy
Edit
GET /poll/:pollId/results