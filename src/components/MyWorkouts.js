import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MyWorkouts.css';

function MyWorkouts() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUserWorkouts();
  }, []);

  const fetchUserWorkouts = async () => {
    try {
      const response = await fetch(`/api/user-workouts/${user._id}`);
      const data = await response.json();
      setWorkouts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workouts:', error);
      setLoading(false);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (!window.confirm('Are you sure you want to delete this workout plan?')) {
      return;
    }

    try {
      const response = await fetch(`/api/user-workouts/${workoutId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Workout plan deleted successfully!');
        setWorkouts(workouts.filter(w => w._id !== workoutId));
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleMarkComplete = async (workoutId, dayIndex) => {
    try {
      const response = await fetch(`/api/user-workouts/${workoutId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dayIndex }),
      });

      if (response.ok) {
        fetchUserWorkouts();
      }
    } catch (error) {
      console.error('Error marking workout complete:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading your workouts...</div>;
  }

  return (
    <div className="my-workouts-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Workout Plans</h1>
          <Link to="/custom-workout" className="btn btn-primary">
            Create New Plan
          </Link>
        </div>

        {success && <div className="success-message">{success}</div>}

        {workouts.length === 0 ? (
          <div className="no-workouts card">
            <h2>No Workout Plans Yet</h2>
            <p>Start your fitness journey by creating a custom plan or adopting one from our collection</p>
            <div className="no-workouts-actions">
              <Link to="/custom-workout" className="btn btn-primary">Create Custom Plan</Link>
              <Link to="/workout-plans" className="btn btn-secondary">Browse Plans</Link>
            </div>
          </div>
        ) : (
          <div className="workouts-list">
            {workouts.map((workout) => (
              <div key={workout._id} className="workout-card card">
                <div className="workout-header">
                  <div>
                    <h2 className="workout-name">{workout.planName}</h2>
                    {workout.isCustom && <span className="custom-badge">Custom</span>}
                  </div>
                  <button
                    onClick={() => handleDeleteWorkout(workout._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>

                <p className="workout-description">{workout.description}</p>

                <div className="workout-schedule">
                  <h3>Your Schedule:</h3>
                  <div className="schedule-grid">
                    {workout.schedule.map((day, index) => (
                      <div key={index} className="schedule-day">
                        <div className="day-info">
                          <span className="day-name">{day.day}</span>
                          <span className="day-focus">{day.focus}</span>
                        </div>
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={day.completed || false}
                            onChange={() => handleMarkComplete(workout._id, index)}
                          />
                          <span className="checkmark"></span>
                          <span className="checkbox-label">Completed</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="workout-stats">
                  <div className="stat">
                    <span className="stat-value">
                      {workout.schedule.filter(d => d.completed).length}
                    </span>
                    <span className="stat-label">Days Completed</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{workout.schedule.length}</span>
                    <span className="stat-label">Total Days</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">
                      {Math.round((workout.schedule.filter(d => d.completed).length / workout.schedule.length) * 100)}%
                    </span>
                    <span className="stat-label">Progress</span>
                  </div>
                </div>

                {workout.planId && (
                  <Link to={`/community/${workout.planId}`} className="btn btn-secondary btn-full">
                    Find Workout Buddies
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyWorkouts;