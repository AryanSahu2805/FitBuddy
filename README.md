# 💪 FitBuddy - Your Personal Fitness Companion

![FitBuddy](https://img.shields.io/badge/FitBuddy-Fitness%20Tracker-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

**FitBuddy** is a comprehensive fitness tracking application that helps users achieve their fitness goals through structured workout plans, progress tracking, and community engagement. Whether you're a beginner or an experienced fitness enthusiast, FitBuddy provides the tools and motivation you need to stay on track.

## 🌟 Features

### 🏠 Home Page
- **Hero Section**: Inspiring banner with call-to-action buttons
- **Feature Showcase**: Highlights key benefits of using FitBuddy
- **Popular Plans Preview**: Quick access to featured workout plans
- **Responsive Design**: Beautiful, modern UI that works on all devices

### 👤 User Authentication
- **User Registration**: Create an account with name, email, and password
- **Secure Login**: Email and password authentication
- **Session Management**: Persistent login sessions using localStorage
- **Protected Routes**: Secure access to user-specific features

### 📋 Workout Plans
- **Pre-Built Plans**: Three expertly designed workout routines:
  - **Push Pull Legs (PPL)**: 6-day split focusing on push, pull, and leg movements
  - **Bro Split**: 5-day split targeting one major muscle group per day
  - **Upper/Lower Split**: 4-day split alternating between upper and lower body
- **Detailed Plan Information**: 
  - Complete weekly schedules
  - Exercise lists with sets and reps
  - Difficulty levels and follower counts
  - Detailed descriptions for each plan
- **Plan Adoption**: Easily add any plan to your personal workout library

### ✨ Custom Workout Creation
- **Flexible Schedule Builder**: Create workouts for any day of the week
- **Exercise Management**: Add multiple exercises per day with:
  - Exercise names
  - Sets and reps
  - Custom focus areas
- **Plan Customization**: 
  - Set plan name and description
  - Choose your training days
  - Build your ideal workout routine
- **Validation**: Form validation ensures complete workout plans

### 📊 My Workouts Dashboard
- **Workout Library**: View all your active workout plans
- **Progress Tracking**: 
  - Mark workout days as complete
  - Track completion percentage
  - View days completed vs. total days
- **Workout Management**:
  - Delete workouts you no longer need
  - View detailed schedules
  - See workout statistics
- **Quick Actions**: Easy access to community and plan details

### 👥 Community Features
- **Workout Buddies**: Connect with others following the same workout plan
- **User Profiles**: View detailed profiles of community members
- **Progress Comparison**: 
  - See consistency percentages
  - View days active
  - Compare progress with others
- **Community Stats**: 
  - See how many people are following each plan
  - Find motivation from others' progress
  - Connect with like-minded fitness enthusiasts

### 👤 Buddy Profiles
- **User Information**: View name, email, and membership date
- **Workout Statistics**: 
  - Active workout plans count
  - Total days completed
  - Overall progress percentage
- **Workout History**: See all workout plans a user is following
- **Progress Visualization**: Visual progress bars for each workout

### 🎨 User Interface
- **Modern Design**: Clean, intuitive interface with beautiful styling
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Navigation**: Easy-to-use navigation bar with user context
- **Visual Feedback**: Loading states, success messages, and error handling
- **Accessibility**: User-friendly forms and interactions

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0**: Modern UI library for building user interfaces
- **React Router DOM 6.20.0**: Client-side routing and navigation
- **React Context API**: State management for user authentication
- **Axios 1.6.2**: HTTP client for API requests
- **CSS3**: Custom styling with modern design patterns

### Backend
- **Node.js**: JavaScript runtime environment
- **Express 4.18.2**: Web application framework
- **MongoDB 6.3.0**: NoSQL database for data storage
- **MongoDB Atlas**: Cloud database hosting
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 16.3.1**: Environment variable management

### Development Tools
- **React Scripts 5.0.1**: Build tools and development server
- **Nodemon 3.0.2**: Automatic server restarts during development
- **ESLint**: Code linting and quality checks

## 📦 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (free tier available)
- **Git** (optional, for cloning the repository)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd fitbuddy
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitbuddy?retryWrites=true&w=majority
PORT=7070
REACT_APP_API_URL=http://localhost:7070
```

### Step 4: Configure MongoDB Atlas
1. Create a MongoDB Atlas account at [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and add it to `.env`

### Step 5: Start the Application

#### Start Backend Server
```bash
npm run server
```
The server will start on `http://localhost:7070`

#### Start Frontend Development Server
```bash
npm start
```
The application will open in your browser at `http://localhost:3000`

## 🚀 Usage

### Getting Started
1. **Register an Account**: Click "Sign Up" and create your account
2. **Browse Workout Plans**: Explore the available workout plans
3. **Adopt a Plan**: Click "Start This Plan" to add it to your workouts
4. **Create Custom Workouts**: Design your own workout routine
5. **Track Progress**: Mark workout days as complete in "My Workouts"
6. **Join Community**: Connect with others following the same plans

### Key Workflows

#### Adopting a Workout Plan
1. Navigate to "Workout Plans"
2. Click on a plan to view details
3. Click "Start This Plan"
4. The plan will be added to "My Workouts"
5. Start tracking your progress!

#### Creating a Custom Workout
1. Go to "Create Custom" in the navigation
2. Enter plan name and description
3. Add workout days and exercises
4. Specify sets and reps for each exercise
5. Click "Create Workout Plan"
6. Your custom plan will appear in "My Workouts"

#### Tracking Progress
1. Go to "My Workouts"
2. Find your workout plan
3. Check off completed days
4. View your progress percentage
5. See your consistency stats

#### Finding Workout Buddies
1. Open any workout plan
2. Click "Find Workout Buddies"
3. Browse community members
4. View their profiles and progress
5. Get motivated by others' achievements!

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Workout Plans
- `GET /api/plans` - Get all workout plans
- `GET /api/plans/:planId` - Get a specific workout plan

### User Workouts
- `GET /api/user-workouts/:userId` - Get user's workouts
- `POST /api/user-workouts` - Create a new user workout
- `DELETE /api/user-workouts/:workoutId` - Delete a workout
- `PATCH /api/user-workouts/:workoutId/complete` - Mark workout day as complete

### Community
- `GET /api/community/:planId` - Get community members for a plan
- `GET /api/users/:userId` - Get user profile

## 📁 Project Structure

```
fitbuddy/
├── public/
│   ├── assets/
│   │   └── images/          # Images and icons
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/          # React components
│   │   ├── Home.js          # Home page
│   │   ├── Login.js         # Login page
│   │   ├── Register.js      # Registration page
│   │   ├── WorkoutPlans.js  # Workout plans listing
│   │   ├── PlanDetails.js   # Plan details page
│   │   ├── CustomWorkout.js # Custom workout creator
│   │   ├── MyWorkouts.js    # User workouts dashboard
│   │   ├── Community.js     # Community page
│   │   ├── BuddyProfile.js  # User profile page
│   │   └── Navbar.js        # Navigation bar
│   ├── context/
│   │   └── AuthContext.js   # Authentication context
│   ├── utils/
│   │   └── api.js           # API utility functions
│   ├── App.js               # Main app component
│   ├── App.css              # Global styles
│   └── index.js             # Entry point
├── server.js                # Express server
├── package.json             # Dependencies
└── README.md                # This file
```

## 🎯 Key Features in Detail

### 1. Pre-Built Workout Plans
FitBuddy comes with three professionally designed workout plans:

**Push Pull Legs (PPL)**
- 6 days per week
- Intermediate level
- Focuses on push movements (chest, shoulders, triceps), pull movements (back, biceps), and leg workouts
- Includes detailed exercise lists with sets and reps

**Bro Split**
- 5 days per week
- Beginner level
- Targets one major muscle group per day
- Perfect for focused, high-volume training

**Upper/Lower Split**
- 4 days per week
- Intermediate level
- Alternates between upper body and lower body workouts
- Ideal for balanced training frequency

### 2. Custom Workout Builder
Create your own workout plans with:
- Flexible scheduling (choose any days of the week)
- Multiple exercises per day
- Custom exercise names, sets, and reps
- Plan descriptions and naming
- Full control over your workout routine

### 3. Progress Tracking
Monitor your fitness journey with:
- Day-by-day completion tracking
- Progress percentage calculations
- Days completed vs. total days
- Visual progress indicators
- Consistency metrics

### 4. Community Engagement
Connect with the FitBuddy community:
- Find users following the same plans
- View other users' progress
- Compare consistency and achievements
- Get motivated by community stats
- Build a supportive fitness network

### 5. User Profiles
Comprehensive user profiles showing:
- User information and membership date
- Active workout plans count
- Total days completed
- Overall progress percentage
- Workout history and statistics

## 🔒 Security Features

- **Password Protection**: User passwords stored securely (Note: In production, use bcrypt for hashing)
- **Protected Routes**: Authentication required for user-specific features
- **Input Validation**: Form validation on both client and server
- **Error Handling**: Comprehensive error handling and user feedback
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface design
- **Responsive Layout**: Works on all screen sizes
- **Smooth Animations**: Engaging user interactions
- **Visual Feedback**: Loading states and success messages
- **Accessibility**: User-friendly forms and navigation
- **Brand Identity**: Consistent styling and branding

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB Atlas cluster is running
- Check that your IP is whitelisted in Network Access
- Ensure your connection string is correct in `.env`
- Verify database user credentials

### Port Already in Use
- Change the port in `package.json` or `.env`
- Kill the process using the port: `lsof -ti:7070 | xargs kill`

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**FitBuddy Development Team**

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- React team for the amazing framework
- All the fitness enthusiasts who inspired this project

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Start your fitness journey today with FitBuddy! 💪**
