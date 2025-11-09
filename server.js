const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7070; // use PORT from .env or default to 7070

// Add debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// (Auth routes consolidated later under /api/auth)

// MongoDB Connection
let db;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitbuddy';

// Connection options for better error handling
const clientOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

MongoClient.connect(mongoURI, clientOptions)
  .then(client => {
    console.log('✅ Connected to MongoDB successfully');
    db = client.db('fitbuddy');
    
    // Initialize default workout plans if none exist
    initializeDefaultPlans();
  })
  .catch(error => {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Please check your MongoDB connection string in .env file');
    console.error('If using MongoDB Atlas, ensure your IP is whitelisted and connection string is correct');
    // Server will still run but routes will return 503 until connection is established
  });

// Initialize default workout plans
async function initializeDefaultPlans() {
  const plansCollection = db.collection('plans');
  const count = await plansCollection.countDocuments();
  
  if (count === 0) {
    const defaultPlans = [
      {
        name: 'Push Pull Legs (PPL)',
        description: 'A 6-day split focusing on push movements, pull movements, and leg workouts.',
        detailedDescription: 'The Push Pull Legs split is one of the most effective and popular workout routines. It divides your training into three main categories: push exercises (chest, shoulders, triceps), pull exercises (back, biceps), and leg exercises. This allows for optimal muscle recovery while maintaining high training frequency.',
        daysPerWeek: 6,
        difficulty: 'Intermediate',
        followers: 1247,
        schedule: [
          {
            day: 'Monday',
            focus: 'Push (Chest, Shoulders, Triceps)',
            exercises: [
              { name: 'Bench Press', sets: '4', reps: '8-10' },
              { name: 'Overhead Press', sets: '3', reps: '8-12' },
              { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12' },
              { name: 'Lateral Raises', sets: '3', reps: '12-15' },
              { name: 'Tricep Dips', sets: '3', reps: '10-12' },
              { name: 'Tricep Pushdowns', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Pull (Back, Biceps)',
            exercises: [
              { name: 'Deadlift', sets: '4', reps: '6-8' },
              { name: 'Pull-ups', sets: '3', reps: '8-12' },
              { name: 'Barbell Rows', sets: '3', reps: '8-10' },
              { name: 'Face Pulls', sets: '3', reps: '12-15' },
              { name: 'Barbell Curls', sets: '3', reps: '10-12' },
              { name: 'Hammer Curls', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Legs',
            exercises: [
              { name: 'Squats', sets: '4', reps: '8-10' },
              { name: 'Romanian Deadlifts', sets: '3', reps: '10-12' },
              { name: 'Leg Press', sets: '3', reps: '12-15' },
              { name: 'Leg Curls', sets: '3', reps: '12-15' },
              { name: 'Calf Raises', sets: '4', reps: '15-20' },
              { name: 'Ab Wheel Rollouts', sets: '3', reps: '10-15' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Push (Chest, Shoulders, Triceps)',
            exercises: [
              { name: 'Incline Bench Press', sets: '4', reps: '8-10' },
              { name: 'Dumbbell Shoulder Press', sets: '3', reps: '10-12' },
              { name: 'Cable Flyes', sets: '3', reps: '12-15' },
              { name: 'Front Raises', sets: '3', reps: '12-15' },
              { name: 'Overhead Tricep Extension', sets: '3', reps: '10-12' },
              { name: 'Close Grip Bench', sets: '3', reps: '10-12' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Pull (Back, Biceps)',
            exercises: [
              { name: 'Weighted Pull-ups', sets: '4', reps: '6-10' },
              { name: 'T-Bar Rows', sets: '3', reps: '8-12' },
              { name: 'Lat Pulldowns', sets: '3', reps: '10-12' },
              { name: 'Cable Rows', sets: '3', reps: '12-15' },
              { name: 'Preacher Curls', sets: '3', reps: '10-12' },
              { name: 'Cable Curls', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Saturday',
            focus: 'Legs',
            exercises: [
              { name: 'Front Squats', sets: '4', reps: '8-12' },
              { name: 'Bulgarian Split Squats', sets: '3', reps: '10-12' },
              { name: 'Leg Extensions', sets: '3', reps: '12-15' },
              { name: 'Hamstring Curls', sets: '3', reps: '12-15' },
              { name: 'Seated Calf Raises', sets: '4', reps: '15-20' },
              { name: 'Hanging Leg Raises', sets: '3', reps: '12-15' }
            ]
          }
        ]
      },
      {
        name: 'Bro Split',
        description: 'A 5-day split targeting one major muscle group per day for maximum focus and intensity.',
        detailedDescription: 'The Bro Split is a classic bodybuilding routine that dedicates each training day to a specific muscle group. This allows you to perform high volume training for each muscle while ensuring adequate recovery time. Perfect for those who want to focus intensely on each body part.',
        daysPerWeek: 5,
        difficulty: 'Beginner',
        followers: 892,
        schedule: [
          {
            day: 'Monday',
            focus: 'Chest',
            exercises: [
              { name: 'Flat Bench Press', sets: '4', reps: '8-10' },
              { name: 'Incline Dumbbell Press', sets: '4', reps: '10-12' },
              { name: 'Decline Press', sets: '3', reps: '10-12' },
              { name: 'Cable Flyes', sets: '3', reps: '12-15' },
              { name: 'Dumbbell Pullovers', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Back',
            exercises: [
              { name: 'Deadlifts', sets: '4', reps: '6-8' },
              { name: 'Pull-ups', sets: '4', reps: '8-12' },
              { name: 'Barbell Rows', sets: '4', reps: '8-10' },
              { name: 'Lat Pulldowns', sets: '3', reps: '10-12' },
              { name: 'Seated Cable Rows', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Wednesday',
            focus: 'Shoulders',
            exercises: [
              { name: 'Military Press', sets: '4', reps: '8-10' },
              { name: 'Lateral Raises', sets: '4', reps: '12-15' },
              { name: 'Front Raises', sets: '3', reps: '12-15' },
              { name: 'Rear Delt Flyes', sets: '3', reps: '12-15' },
              { name: 'Shrugs', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Arms (Biceps & Triceps)',
            exercises: [
              { name: 'Barbell Curls', sets: '4', reps: '10-12' },
              { name: 'Hammer Curls', sets: '3', reps: '10-12' },
              { name: 'Preacher Curls', sets: '3', reps: '12-15' },
              { name: 'Close Grip Bench', sets: '4', reps: '8-10' },
              { name: 'Tricep Dips', sets: '3', reps: '10-12' },
              { name: 'Overhead Tricep Extension', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Legs',
            exercises: [
              { name: 'Squats', sets: '4', reps: '8-10' },
              { name: 'Leg Press', sets: '4', reps: '10-12' },
              { name: 'Romanian Deadlifts', sets: '3', reps: '10-12' },
              { name: 'Leg Extensions', sets: '3', reps: '12-15' },
              { name: 'Leg Curls', sets: '3', reps: '12-15' },
              { name: 'Calf Raises', sets: '4', reps: '15-20' }
            ]
          }
        ]
      },
      {
        name: 'Upper/Lower Split',
        description: 'A 4-day split alternating between upper body and lower body workouts.',
        detailedDescription: 'The Upper/Lower split divides your training into upper body and lower body days, allowing you to train each muscle group twice per week. This is an excellent balance between training frequency and recovery, making it ideal for strength gains and muscle growth.',
        daysPerWeek: 4,
        difficulty: 'Intermediate',
        followers: 634,
        schedule: [
          {
            day: 'Monday',
            focus: 'Upper Body',
            exercises: [
              { name: 'Bench Press', sets: '4', reps: '6-8' },
              { name: 'Barbell Rows', sets: '4', reps: '6-8' },
              { name: 'Overhead Press', sets: '3', reps: '8-10' },
              { name: 'Pull-ups', sets: '3', reps: '8-12' },
              { name: 'Barbell Curls', sets: '3', reps: '10-12' },
              { name: 'Tricep Dips', sets: '3', reps: '10-12' }
            ]
          },
          {
            day: 'Tuesday',
            focus: 'Lower Body',
            exercises: [
              { name: 'Squats', sets: '4', reps: '6-8' },
              { name: 'Romanian Deadlifts', sets: '3', reps: '8-10' },
              { name: 'Leg Press', sets: '3', reps: '10-12' },
              { name: 'Leg Curls', sets: '3', reps: '12-15' },
              { name: 'Calf Raises', sets: '4', reps: '15-20' },
              { name: 'Planks', sets: '3', reps: '60sec' }
            ]
          },
          {
            day: 'Thursday',
            focus: 'Upper Body',
            exercises: [
              { name: 'Incline Bench Press', sets: '4', reps: '8-10' },
              { name: 'T-Bar Rows', sets: '4', reps: '8-10' },
              { name: 'Dumbbell Shoulder Press', sets: '3', reps: '10-12' },
              { name: 'Lat Pulldowns', sets: '3', reps: '10-12' },
              { name: 'Hammer Curls', sets: '3', reps: '10-12' },
              { name: 'Tricep Pushdowns', sets: '3', reps: '12-15' }
            ]
          },
          {
            day: 'Friday',
            focus: 'Lower Body',
            exercises: [
              { name: 'Deadlifts', sets: '4', reps: '5-6' },
              { name: 'Front Squats', sets: '3', reps: '8-10' },
              { name: 'Bulgarian Split Squats', sets: '3', reps: '10-12' },
              { name: 'Leg Extensions', sets: '3', reps: '12-15' },
              { name: 'Seated Calf Raises', sets: '4', reps: '15-20' },
              { name: 'Ab Wheel Rollouts', sets: '3', reps: '10-15' }
            ]
          }
        ]
      }
    ];

    await plansCollection.insertMany(defaultPlans);
    console.log('Default workout plans initialized');
  }
}

// ============= AUTH ROUTES =============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not connected. Please try again later.' });
    }
    const { name, email, password } = req.body;
    
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user (in production, hash the password!)
    const newUser = {
      name,
      email,
      password, // WARNING: In production, use bcrypt to hash passwords!
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    
    res.status(201).json({ success: true, user: { _id: result.insertedId, name, email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not connected. Please try again later.' });
    }
    const { email, password } = req.body;
    
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ success: true, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ============= WORKOUT PLANS ROUTES =============

// Get all workout plans
app.get('/api/plans', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const plansCollection = db.collection('plans');
    const plans = await plansCollection.find({}).toArray();
    res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single plan by ID
app.get('/api/plans/:planId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const plansCollection = db.collection('plans');
    const plan = await plansCollection.findOne({ _id: new ObjectId(req.params.planId) });
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.json(plan);
  } catch (error) {
    console.error('Error fetching plan:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============= USER WORKOUTS ROUTES =============

// Get user workouts
app.get('/api/user-workouts/:userId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const userWorkoutsCollection = db.collection('userWorkouts');
    const workouts = await userWorkoutsCollection
      .find({ userId: req.params.userId })
      .toArray();
    
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create user workout
app.post('/api/user-workouts', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const userWorkoutsCollection = db.collection('userWorkouts');
    const workout = {
      ...req.body,
      createdAt: new Date(),
      startDate: new Date(),
    };

    const result = await userWorkoutsCollection.insertOne(workout);
    res.status(201).json({ _id: result.insertedId, ...workout });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user workout
app.delete('/api/user-workouts/:workoutId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const userWorkoutsCollection = db.collection('userWorkouts');
    await userWorkoutsCollection.deleteOne({ _id: new ObjectId(req.params.workoutId) });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark workout day as complete
app.patch('/api/user-workouts/:workoutId/complete', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const { dayIndex } = req.body;
    const userWorkoutsCollection = db.collection('userWorkouts');
    
    const workout = await userWorkoutsCollection.findOne({ 
      _id: new ObjectId(req.params.workoutId) 
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    workout.schedule[dayIndex].completed = !workout.schedule[dayIndex].completed;

    await userWorkoutsCollection.updateOne(
      { _id: new ObjectId(req.params.workoutId) },
      { $set: { schedule: workout.schedule } }
    );

    res.json(workout);
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// (Do not start server here — final listen is at the end after all routes are registered)

// ============= COMMUNITY ROUTES =============

// Get community members for a plan
app.get('/api/community/:planId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const userWorkoutsCollection = db.collection('userWorkouts');
    const usersCollection = db.collection('users');
    const plansCollection = db.collection('plans');

    // Get plan details
    const plan = await plansCollection.findOne({ _id: new ObjectId(req.params.planId) });

    // Get all users following this plan
    const workouts = await userWorkoutsCollection
      .find({ planId: req.params.planId })
      .toArray();

    const userIds = workouts.map(w => w.userId).filter(id => id); // Filter out any null/undefined IDs
    if (userIds.length === 0) {
      return res.json({
        planName: plan?.name || 'Workout Plan',
        users: [],
      });
    }
    
    // Convert userIds to ObjectId, handling any invalid IDs
    const validUserIds = userIds
      .map(id => {
        try {
          return new ObjectId(id);
        } catch (error) {
          console.error(`Invalid userId: ${id}`, error);
          return null;
        }
      })
      .filter(id => id !== null);
    
    const users = await usersCollection
      .find({ _id: { $in: validUserIds } })
      .toArray();

    // Enrich user data with workout stats
    const enrichedUsers = users.map(user => {
      const userWorkout = workouts.find(w => w.userId === user._id.toString());
      const completedDays = userWorkout ? userWorkout.schedule.filter(d => d.completed).length : 0;
      const totalDays = userWorkout ? userWorkout.schedule.length : 1;
      const consistency = Math.round((completedDays / totalDays) * 100);
      
      // Remove password before sending to client
      const { password, ...userWithoutPassword } = user;
      
      return {
        ...userWithoutPassword,
        completedDays,
        consistency,
        startDate: userWorkout?.startDate || user.createdAt,
        daysActive: userWorkout ? Math.floor((new Date() - new Date(userWorkout.startDate)) / (1000 * 60 * 60 * 24)) : 0,
      };
    });

    res.json({
      planName: plan?.name || 'Workout Plan',
      users: enrichedUsers,
    });
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============= USER ROUTES =============

// Get user by ID
app.get('/api/users/:userId', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ message: 'Database not connected. Please try again later.' });
    }
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.userId) });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});