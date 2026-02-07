const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillora';
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

// Course Schema
const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        instructor: {
            type: String,
            default: 'SKILLORA',
        },
        duration: {
            type: String,
            default: 'Self-paced',
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Beginner',
        },
        videoUrl: {
            type: String,
        },
        enrolledUsers: [
            {
                userId: mongoose.Schema.Types.ObjectId,
                enrolledAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: 'courses' }
);

const Course = mongoose.model('Course', courseSchema);

// Routes

// Health check
// API root
app.get('/api', (req, res) => {
    res.json({
        message: 'SKILLORA API root',
        endpoints: [
            '/api/health',
            '/api/auth/register',
            '/api/auth/login',
            '/api/courses',
            '/api/courses/:id'
        ]
    });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({
            username,
            password,
            email,
        });

        await newUser.save();
        res
            .status(201)
            .json({ message: 'User registered successfully', userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            userId: user._id,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Course Routes
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error: error.message });
    }
});

app.post('/api/courses', async (req, res) => {
    try {
        const { title, description, instructor, level, videoUrl, duration } =
            req.body;

        if (!title) {
            return res.status(400).json({ message: 'Course title is required' });
        }

        const newCourse = new Course({
            title,
            description,
            instructor,
            level,
            videoUrl,
            duration,
        });

        const savedCourse = await newCourse.save();
        res
            .status(201)
            .json({ message: 'Course created successfully', course: savedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error: error.message });
    }
});

app.put('/api/courses/:id', async (req, res) => {
    try {
        const { title, description, instructor, level, videoUrl, duration } =
            req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                instructor,
                level,
                videoUrl,
                duration,
            },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error: error.message });
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SKILLORA server running on http://localhost:${PORT}`);
});

module.exports = app;
