# LearnGrow

LearnGrow is a hands-on course-selling web app project inspired by [100x Devs](https://app.100xdevs.com). The goal: help you learn modern web development by building a full-stack application where admins publish courses and users can buy them.

---

## 🚀 Features

- **Admin Panel:** Easily create, edit, and manage courses.
- **User Portal:** Sign up, log in, browse, and purchase courses.
- **Secure Authentication:** JWT-based login for both admins and users.
- **Course Management:** Publish/unpublish and update course details.
- **Purchase Tracking:** Users can view their purchased courses.
- **State Management:** Uses [Recoil](https://recoiljs.org/) for efficient state in React frontend.

---

## 🗂️ Project Structure

- `client` – React + Recoil frontend (recommended if you're familiar with React)
- `backend` – Express.js REST API

You can mimic the UI from [app.100xdevs.com](https://app.100xdevs.com) for design ideas.

---

## 📦 API Reference

### Admin Endpoints

- **POST `/admin/signup`**  
  Create a new admin.  
  Request: `{ "username": "admin", "password": "pass" }`  
  Response: `{ "message": "Admin created successfully", "token": "jwt_token_here" }`

- **POST `/admin/login`**  
  Log in as admin (send username & password in headers).  
  Response: `{ "message": "Logged in successfully", "token": "jwt_token_here" }`

- **POST `/admin/courses`**  
  Create a course (send JWT in Authorization header).  
  Body:  
  ```json
  {
    "title": "Title",
    "description": "Description",
    "price": 100,
    "imageLink": "https://...",
    "published": true
  }
  ```
  Response: `{ "message": "Course created successfully", "courseId": 1 }`

- **PUT `/admin/courses/:courseId`**  
  Edit a course.  
  Body: *same as above*  
  Response: `{ "message": "Course updated successfully" }`

- **GET `/admin/courses`**  
  Get all courses.  
  Response:  
  ```json
  {
    "courses": [
      { "id": 1, "title": "...", "description": "...", "price": 100, "imageLink": "...", "published": true }
    ]
  }
  ```

---

### User Endpoints

- **POST `/users/signup`**  
  Register a new user.  
  Request: `{ "username": "user", "password": "pass" }`  
  Response: `{ "message": "User created successfully", "token": "jwt_token_here" }`

- **POST `/users/login`**  
  User login (send username & password in headers).  
  Response: `{ "message": "Logged in successfully", "token": "jwt_token_here" }`

- **GET `/users/courses`**  
  List all courses.  
  Response:  
  ```json
  {
    "courses": [
      { "id": 1, "title": "...", "description": "...", "price": 100, "imageLink": "...", "published": true }
    ]
  }
  ```

- **POST `/users/courses/:courseId`**  
  Purchase a course.  
  Response: `{ "message": "Course purchased successfully" }`

- **GET `/users/purchasedCourses`**  
  View purchased courses.  
  Response:  
  ```json
  {
    "purchasedCourses": [
      { "id": 1, "title": "...", "description": "...", "price": 100, "imageLink": "...", "published": true }
    ]
  }
  ```

---

## 🛠️ Tech Stack

- **Frontend:** React (with Recoil) or vanilla JS (client-easy)
- **Backend:** Node.js, Express.js
- **Auth:** JWT tokens

---

## 📚 Getting Started

1. **Clone the repository**
2. Install dependencies in both frontend and backend folders.
3. Start the backend server.
4. Run the frontend (`client` for React, or `client-easy` for beginners).

---

## 💡 Tips

- Use Recoil for state management in React UI.
- Reference [app.100xdevs.com](https://app.100xdevs.com) for design inspiration.
- Follow the API specs for smooth development.

---

Happy learning! 🚀
