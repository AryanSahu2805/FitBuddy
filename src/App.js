import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import WorkoutPlans from './components/WorkoutPlans';
import PlanDetails from './components/PlanDetails';
import CustomWorkout from './components/CustomWorkout';
import MyWorkouts from './components/MyWorkouts';
import Community from './components/Community';
import BuddyProfile from './components/BuddyProfile';
import './App.css';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workout-plans" element={<WorkoutPlans />} />
            <Route path="/plan/:planId" element={<PlanDetails />} />
            <Route 
              path="/custom-workout" 
              element={
                <PrivateRoute>
                  <CustomWorkout />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-workouts" 
              element={
                <PrivateRoute>
                  <MyWorkouts />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/community/:planId" 
              element={
                <PrivateRoute>
                  <Community />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/buddy/:userId" 
              element={
                <PrivateRoute>
                  <BuddyProfile />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;