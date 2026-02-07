const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillora';

// User Schema
const userSchema = new mongoose.Schema({
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
});

// Course Schema
const courseSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

async function seedDatabase() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Sample courses
        const sampleCourses = [
            {
                title: 'JavaScript Basics',
                description: 'Learn the fundamentals of JavaScript programming',
                instructor: 'SKILLORA',
                duration: '4 weeks',
                level: 'Beginner',
                videoUrl: 'https://example.com/js-basics',
            },
            {
                title: 'React Advanced',
                description: 'Master advanced React concepts and patterns',
                instructor: 'SKILLORA',
                duration: '6 weeks',
                level: 'Advanced',
                videoUrl: 'https://example.com/react-advanced',
            },
            {
                title: 'MongoDB Essentials',
                description: 'Learn NoSQL database design with MongoDB',
                instructor: 'SKILLORA',
                duration: '3 weeks',
                level: 'Intermediate',
                videoUrl: 'https://example.com/mongo-essentials',
            },
        ];

        // Check if courses exist
        const courseCount = await Course.countDocuments();
        if (courseCount === 0) {
            await Course.insertMany(sampleCourses);
            console.log('✓ Sample courses created');
        } else {
            console.log('✓ Courses already exist');
        }

        // Sample user
        const sampleUser = {
            username: 'testuser',
            password: 'password123',
            email: 'test@skillora.com',
        };

        const userExists = await User.findOne({ username: 'testuser' });
        if (!userExists) {
            await User.create(sampleUser);
            console.log('✓ Sample user created');
        } else {
            console.log('✓ User already exists');
        }

        console.log('✓ Database seeding completed');
        process.exit(0);
    } catch (err) {
        console.error('Database seeding error:', err);
        process.exit(1);
    }
}

seedDatabase();
