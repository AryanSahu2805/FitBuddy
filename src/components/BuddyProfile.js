import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BuddyProfile.css';

function BuddyProfile() {
  const { userId } = useParams();
  const [buddy, setBuddy] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuddyProfile();
  }, [userId]);

  const fetchBuddyProfile = async () => {
    try {
      const [userResponse, workoutsResponse] = await Promise.all([
        fetch(`/api/users/${userId}`),
        fetch(`/api/user-workouts/${userId}`)
      ]);

      const userData = await userResponse.json();
      const workoutsData = await workoutsResponse.json();

      // Check if responses are successful
      if (userResponse.ok && !userData.message) {
        setBuddy(userData);
      } else {
        setBuddy(null);
      }
      
      if (workoutsResponse.ok && Array.isArray(workoutsData)) {
        setWorkouts(workoutsData);
      } else {
        setWorkouts([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching buddy profile:', error);
      setBuddy(null);
      setWorkouts([]);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!buddy) {
    return <div className="loading">User not found</div>;
  }

  return (
    <div className="buddy-profile-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="btn btn-secondary back-button">
          ← Back
        </button>

        <div className="profile-header card">
          <div className="profile-avatar">
            <img src="/assets/images/avatar-placeholder.png" alt={buddy.name} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{buddy.name}</h1>
            <p className="profile-email">{buddy.email}</p>
            <p className="profile-joined">Member since {new Date(buddy.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="profile-stats card">
          <h2>Workout Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">💪</span>
              <span className="stat-value">{workouts.length}</span>
              <span className="stat-label">Active Plans</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🔥</span>
              <span className="stat-value">
                {workouts.reduce((acc, w) => acc + w.schedule.filter(d => d.completed).length, 0)}
              </span>
              <span className="stat-label">Days Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📈</span>
              <span className="stat-value">
                {workouts.length > 0 
                  ? Math.round(
                      (workouts.reduce((acc, w) => 
                        acc + w.schedule.filter(d => d.completed).length, 0) / 
                        workouts.reduce((acc, w) => acc + w.schedule.length, 0)) * 100
                    )
                  : 0}%
              </span>
              <span className="stat-label">Overall Progress</span>
            </div>
          </div>
        </div>

        <div className="profile-workouts">
          <h2>Current Workout Plans</h2>
          {workouts.length === 0 ? (
            <p className="no-workouts-text">No active workout plans</p>
          ) : (
            <div className="workouts-list">
              {workouts.map((workout) => (
                <div key={workout._id} className="workout-preview card">
                  <h3>{workout.planName}</h3>
                  {workout.isCustom && <span className="custom-badge">Custom</span>}
                  <div className="workout-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{
                          width: `${(workout.schedule.filter(d => d.completed).length / workout.schedule.length) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {workout.schedule.filter(d => d.completed).length} / {workout.schedule.length} days completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuddyProfile;