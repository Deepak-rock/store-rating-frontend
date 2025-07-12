# 🧠 Store Rating Frontend

A responsive and role-based frontend application for users, admins, and store owners to interact with the Store Rating system. Built using **React.js** and designed with a clean component structure.

---

## ⚙️ Tech Stack

- **React.js** – UI library
- **React Router** – Navigation
- **Axios** – API integration
- **Context API / State** – Authentication & global state
- **CSS** – Simple styling
- **dotenv** – Environment config

---

## 🧪 Roles & Pages

| Role         | Pages                                         |
|--------------|-----------------------------------------------|
| `admin`      | AdminDashboard, AddStore, AddUser, AdminLists |
| `store_owner`| StoreDashboard                                |
| `user`       | NormalUser page (View & Rate stores)          |

---

## 📦 Getting Started

### 🔧 Prerequisites

- Node.js (v18+)
- Backend server running at specified URL

---

### 🚀 Setup Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/Deepak-rock/store-rating-frontend

2. **Install dependencies**

    ```bash
    npm install

3. **Start the development server**

    ```bash
    npm start

    App runs at: http://localhost:3000

---

## 🧠 App Structure

    FRONTEND/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── AddStore/
    │   │   ├── AddUser/
    │   │   ├── AdminStoresList/
    │   │   ├── AdminUsersList/
    │   │   ├── Header/
    │   │   ├── LogInForm/
    │   │   ├── SignInForm/
    │   │   ├── ProtectedRoute/
    │   │   ├── NotFound/
    │   │   └── UpdatePassword/
    │   ├── pages/
    │   │   ├── AdminDashboard/
    │   │   ├── StoreDashboard/
    │   │   └── NormalUser/
    │   ├── App.js
    │   ├── App.css
    │   └── index.js

---

### 🔐 Key Features

    🔒 Authentication: JWT token stored in localStorage

    🚫 Protected Routes: Redirect if unauthorized

    🎯 Role-Based Navigation: Show pages based on user role

    ⚡ Axios Interceptors: For attaching auth token

### 🧠 Usage Flows

    ✅ User: Log in → View stores → Rate

    🛒 Store Owner: Log in → See ratings dashboard

    🧑‍💼 Admin: Log in → Add users/stores, monitor system

---

🧪 Scripts

    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    }

## 🧠 Author

Frontend crafted with clarity by Deepak U