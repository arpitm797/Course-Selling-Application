# 🎓 Course Selling Application

A full-stack MERN-based Course Selling Application that allows users to explore, purchase, and manage online courses through a modern and responsive interface. The platform provides secure authentication, role-based access for users and administrators, course management, and payment gateway integration.

---

## 🚀 Features

### 👨‍🎓 User Features

* User Registration & Login
* Secure JWT Authentication
* Browse Available Courses
* View Course Details
* Purchase Courses
* View Purchased Courses
* Responsive User Interface

### 👨‍💼 Admin Features

* Admin Registration & Login
* Create New Courses
* Update Existing Courses
* Delete Courses
* Manage All Courses

### 💳 Payment Integration

* Stripe Payment Gateway
* Secure Payment Processing

### ☁️ Media Management

* Upload Course Images using Cloudinary

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast
* Stripe React SDK

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js
* Express File Upload
* Cloudinary
* Stripe API

---

## 📁 Project Structure

```text
Course-Selling-Application/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/arpitm797/Course-Selling-Application.git
```

### 2. Navigate to the Project

```bash
cd Course-Selling-Application
```

### 3. Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:5173

JWT_USER_PASSWORD=your_user_secret

JWT_ADMIN_PASSWORD=your_admin_secret

cloud_name=your_cloudinary_cloud_name

api_key=your_cloudinary_api_key

api_secret=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## ▶️ Run the Project

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

---

## 📷 Screenshots

You can add screenshots of:

* Home Page
* Login Page
* Signup Page
* Course Listing
* Course Details
* Admin Dashboard
* Create Course Page
* Purchase Page

---

## 📌 Future Enhancements

* Wishlist
* Course Ratings & Reviews
* Search & Filter Courses
* User Profile
* Course Progress Tracking
* Certificate Generation
* Email Notifications
* Dark Mode
* Analytics Dashboard
* Payment History

---

## 📚 Learning Outcomes

Through this project, I gained practical experience with:

* Building RESTful APIs
* Authentication using JWT
* Role-Based Authorization
* MongoDB Database Design
* Image Upload using Cloudinary
* Payment Integration with Stripe
* React State Management
* CRUD Operations
* Responsive UI Development
* Full-Stack MERN Application Development

---

## 👨‍💻 Author

**Arpit Mishra**

GitHub: https://github.com/arpitm797

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
