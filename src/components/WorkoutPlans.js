import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './WorkoutPlans.css';

function WorkoutPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      const data = await response.json();
      
      // Check if response is successful and is an array
      if (response.ok && Array.isArray(data)) {
        setPlans(data);
      } else {
        // Handle error response (e.g., database not connected)
        console.error('Error fetching plans:', data.message || 'Unknown error');
        setPlans([]); // Set empty array to prevent map error
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]); // Set empty array to prevent map error
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading workout plans...</div>;
  }

  return (
    <div className="workout-plans-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Workout Plans</h1>
          <p className="page-subtitle">Choose from our expertly designed workout routines</p>
          {user && (
            <Link to="/custom-workout" className="btn btn-primary">
              Create Custom Plan
            </Link>
          )}
        </div>

        {plans.length === 0 && !loading ? (
          <div className="no-plans card">
            <h2>No Workout Plans Available</h2>
            <p>The database is not connected. Please check your MongoDB connection.</p>
            <p>If you're using MongoDB Atlas, ensure your connection string is correct and your IP is whitelisted.</p>
          </div>
        ) : (
          <div className="plans-grid">
            {plans.map((plan) => (
            <div key={plan._id} className="plan-card card">
              <div className="plan-header">
                <h2 className="plan-name">{plan.name}</h2>
                <span className="plan-days">{plan.daysPerWeek} days/week</span>
              </div>
              
              <p className="plan-description">{plan.description}</p>

              <div className="plan-schedule">
                <h3>Schedule:</h3>
                <ul className="schedule-list">
                  {plan.schedule.map((day, index) => (
                    <li key={index}>
                      <span className="day-name">{day.day}:</span> {day.focus}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plan-stats">
                <div className="stat">
                  <span className="stat-icon">👥</span>
                  <span className="stat-value">{plan.followers || 0}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🔥</span>
                  <span className="stat-value">{plan.difficulty}</span>
                  <span className="stat-label">Level</span>
                </div>
              </div>

              <div className="plan-actions">
                <Link to={`/plan/${plan._id}`} className="btn btn-primary btn-full">
                  View Details
                </Link>
                {user && (
                  <Link to={`/community/${plan._id}`} className="btn btn-secondary btn-full">
                    Find Buddies
                  </Link>
                )}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutPlans;