import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay"></div>
        <img src="/assets/images/hero-banner.jpg" alt="Fitness Hero" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Body, <span className="highlight">Transform Your Life</span></h1>
          <p className="hero-subtitle">Join thousands of fitness enthusiasts achieving their goals with personalized workout plans</p>
          <div className="hero-buttons">
            {user ? (
              <>
                <Link to="/custom-workout" className="btn btn-primary">Create Custom Plan</Link>
                <Link to="/workout-plans" className="btn btn-secondary">Browse Plans</Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">Get Started Free</Link>
                <Link to="/workout-plans" className="btn btn-secondary">View Plans</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose FitBuddy?</h2>
          <div className="features-grid">
            <div className="feature-card card">
              <div className="feature-icon">💪</div>
              <h3>Pre-Built Plans</h3>
              <p>Access proven workout routines designed by fitness experts</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">✨</div>
              <h3>Custom Workouts</h3>
              <p>Create personalized plans tailored to your specific goals</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">👥</div>
              <h3>Find Buddies</h3>
              <p>Connect with others following the same workout routine</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>Monitor your consistency and achievements over time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="popular-plans">
        <div className="container">
          <h2 className="section-title">Popular Workout Splits</h2>
          <div className="plans-preview">
            <div className="plan-preview-card card">
              <img src="/assets/images/workout-pushpull.jpg" alt="Push Pull Legs" className="plan-preview-image" />
              <h3>Push Pull Legs (PPL)</h3>
              <p>6-day split focusing on push, pull, and leg movements</p>
              <Link to="/workout-plans" className="btn btn-primary">View Details</Link>
            </div>
            <div className="plan-preview-card card">
              <img src="/assets/images/workout-brosplit.jpg" alt="Bro Split" className="plan-preview-image" />
              <h3>Bro Split</h3>
              <p>5-day split targeting one major muscle group per day</p>
              <Link to="/workout-plans" className="btn btn-primary">View Details</Link>
            </div>
            <div className="plan-preview-card card">
              <img src="/assets/images/workout-custom.jpg" alt="Custom Workout" className="plan-preview-image" />
              <h3>Custom Plan</h3>
              <p>Design your own unique workout schedule</p>
              {user ? (
                <Link to="/custom-workout" className="btn btn-primary">Create Now</Link>
              ) : (
                <Link to="/login" className="btn btn-primary">Login to Create</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Fitness Journey?</h2>
            <p>Join FitBuddy today and achieve your fitness goals with structured workout plans</p>
            {!user && (
              <Link to="/register" className="btn btn-primary btn-large">Create Free Account</Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;