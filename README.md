# Amelia Medical Camp Backend

This is the backend service for the **Amelia Medical Camp** project.  
It is built with **Node.js**, **Express.js**, and **MongoDB**, and provides RESTful APIs for authentication, camp management, enrollments, feedback, and payment processing.

---

## 📋 Prerequisites

Before running the server, ensure you have:

- **Node.js** (LTS version recommended)
- **MongoDB** (Local installation or MongoDB Atlas)

---

## 📥 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/nafisaali0/medical-camp-server-side.git
cd medical-camp-server-side
npm install
```
----

## 🔑 Environment Variables

Create a `.env` file in the **root directory**:

```env
DB_USER = your_mongodb_connection_name
DB_PASS = your_mongodb_connection_password
STRIPE_SECRET_KEY = your_SECRET_KEY
```

Then, in your backend code, you can connect to MongoDB using:

```JavaScript
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nlu12w4.mongodb.net/?retryWrites=true&w=majority`;
```

---

## ▶️ Run the Server

Start the backend server:

```bash
npm start
# or if you use nodemon
```

## 🌐 API Base URL

- **Base URL:** [http://localhost:5000](http://localhost:5000)




