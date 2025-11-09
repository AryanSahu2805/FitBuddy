import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './PlanDetails.css';

function PlanDetails() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlanDetails();
  }, [planId]);

  const fetchPlanDetails = async () => {
    try {
      const response = await fetch(`/api/plans/${planId}`);
      const data = await response.json();
      setPlan(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plan details:', error);
      setLoading(false);
    }
  };

  const handleAdoptPlan = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/user-workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          planId: plan._id,
          planName: plan.name,
          schedule: plan.schedule,
        }),
      });

      if (response.ok) {
        setSuccess('Plan added to your workouts!');
        setTimeout(() => navigate('/my-workouts'), 2000);
      }
    } catch (error) {
      console.error('Error adopting plan:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading plan details...</div>;
  }

  if (!plan) {
    return <div className="loading">Plan not found</div>;
  }

  return (
    <div className="plan-details-page">
      <div className="container">
        {success && <div className="success-message">{success}</div>}
        
        <div className="plan-details-header">
          <div className="plan-title-section">
            <h1 className="plan-title">{plan.name}</h1>
            <p className="plan-meta">{plan.daysPerWeek} days per week • {plan.difficulty} Level</p>
          </div>
          {user && (
            <button onClick={handleAdoptPlan} className="btn btn-primary btn-large">
              Start This Plan
            </button>
          )}
          {!user && (
            <Link to="/login" className="btn btn-primary btn-large">
              Login to Start
            </Link>
          )}
        </div>

        <div className="plan-content">
          <div className="plan-description-full card">
            <h2>About This Plan</h2>
            <p>{plan.description}</p>
            <p>{plan.detailedDescription}</p>
          </div>

          <div className="plan-schedule-detailed card">
            <h2>Weekly Schedule</h2>
            <div className="schedule-detailed-list">
              {plan.schedule.map((day, index) => (
                <div key={index} className="schedule-day-card">
                  <div className="day-header">
                    <h3>{day.day}</h3>
                    <span className="day-focus">{day.focus}</span>
                  </div>
                  {day.exercises && day.exercises.length > 0 && (
                    <div className="exercises-list">
                      <h4>Exercises:</h4>
                      <ul>
                        {day.exercises.map((exercise, idx) => (
                          <li key={idx}>
                            {exercise.name} - {exercise.sets} sets × {exercise.reps} reps
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="plan-community-section card">
            <h2>Join the Community</h2>
            <p>Connect with {plan.followers || 0} others following this plan</p>
            {user ? (
              <Link to={`/community/${plan._id}`} className="btn btn-primary">
                Find Workout Buddies
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login to Join Community
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;