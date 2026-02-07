# SKILLORA - MERN Learning Platform

A full-stack learning platform built with **MongoDB, Express, React, and Node.js**.

## Project Structure

```
MERN PROJECT/
├── frontend/                 # Frontend files (HTML, CSS, JS)
│   ├── home.html
│   ├── login.html
│   ├── index.html
│   ├── style.css
│   └── script.js
├── app.js                   # Express backend server
├── package.json             # Backend dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Prerequisites

- **Node.js** (v14+) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas) - [Download](https://www.mongodb.com/) or [Sign up for Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js)

## Installation & Setup

### 1. Clone or navigate to the project
```bash
cd "MERN PROJECT"
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Create a `.env` file
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Then edit `.env` with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillora
NODE_ENV=development
```

**For MongoDB Atlas (cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillora?retryWrites=true&w=majority
```

### 4. Start the backend server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ username, password, email }`
- `POST /api/auth/login` - Login user
  - Body: `{ username, password }`

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course by ID
- `POST /api/courses` - Create new course (admin)
  - Body: `{ title, description, instructor, level, videoUrl, duration }`
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

## Frontend Setup

1. Open `frontend/index.html` in your browser for registration
2. Use `frontend/login.html` to login
3. After login, `frontend/home.html` displays available courses
4. Click on any course card to open its YouTube video

## Features

✅ User registration and login  
✅ Browse courses  
✅ Click course cards to watch YouTube videos  
✅ Interactive logos on auth pages  
✅ Responsive design  
✅ Rest API for course management  

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Additional**: CORS, dotenv

## Future Enhancements

- Add Password Hashing (bcryptjs)
- JWT Tokens for authentication
- User progress tracking
- Course completion certificates
- Rating and review system
- React frontend

## License

ISC
