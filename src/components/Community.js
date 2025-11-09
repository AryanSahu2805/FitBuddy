import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Community.css';

function Community() {
  const { planId } = useParams();
  const { user } = useAuth();
  const [buddies, setBuddies] = useState([]);
  const [planName, setPlanName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunityMembers();
  }, [planId]);

  const fetchCommunityMembers = async () => {
    try {
      const response = await fetch(`/api/community/${planId}`);
      const data = await response.json();
      setBuddies(data.users);
      setPlanName(data.planName);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching community members:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading community members...</div>;
  }

  return (
    <div className="community-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Workout Buddies</h1>
          <p className="page-subtitle">Connect with others following {planName}</p>
        </div>

        {buddies.length === 0 ? (
          <div className="no-buddies card">
            <h2>No Buddies Yet</h2>
            <p>Be the first to start this workout plan and connect with others!</p>
            <Link to="/workout-plans" className="btn btn-primary">Browse More Plans</Link>
          </div>
        ) : (
          <div className="buddies-grid">
            {buddies.map((buddy) => (
              <div key={buddy._id} className="buddy-card card">
                <div className="buddy-avatar">
                  <img src="/assets/images/avatar-placeholder.png" alt={buddy.name} />
                </div>
                <h3 className="buddy-name">{buddy.name}</h3>
                <div className="buddy-stats">
                  <div className="buddy-stat">
                    <span className="stat-value">{buddy.completedDays || 0}</span>
                    <span className="stat-label">Days Completed</span>
                  </div>
                  <div className="buddy-stat">
                    <span className="stat-value">{buddy.consistency || 0}%</span>
                    <span className="stat-label">Consistency</span>
                  </div>
                </div>
                <div className="buddy-info">
                  <p>Started: {new Date(buddy.startDate).toLocaleDateString()}</p>
                  <p>Active: {buddy.daysActive || 0} days</p>
                </div>
                {buddy._id !== user._id && (
                  <Link to={`/buddy/${buddy._id}`} className="btn btn-primary btn-full">
                    View Profile
                  </Link>
                )}
                {buddy._id === user._id && (
                  <span className="you-badge">You</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Community;