import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CustomWorkout.css';

function CustomWorkout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [schedule, setSchedule] = useState([
    { day: 'Monday', focus: '', exercises: [] },
    { day: 'Tuesday', focus: '', exercises: [] },
    { day: 'Wednesday', focus: '', exercises: [] },
    { day: 'Thursday', focus: '', exercises: [] },
    { day: 'Friday', focus: '', exercises: [] },
    { day: 'Saturday', focus: '', exercises: [] },
    { day: 'Sunday', focus: '', exercises: [] },
  ]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!planName.trim()) {
      newErrors.planName = 'Plan name is required';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    const activeDays = schedule.filter(day => day.focus.trim() !== '');
    if (activeDays.length === 0) {
      newErrors.schedule = 'Please add at least one workout day';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDayFocusChange = (index, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].focus = value;
    setSchedule(updatedSchedule);
  };

  const handleAddExercise = (dayIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].exercises.push({
      name: '',
      sets: '',
      reps: '',
    });
    setSchedule(updatedSchedule);
  };

  const handleExerciseChange = (dayIndex, exerciseIndex, field, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].exercises[exerciseIndex][field] = value;
    setSchedule(updatedSchedule);
  };

  const handleRemoveExercise = (dayIndex, exerciseIndex) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].exercises.splice(exerciseIndex, 1);
    setSchedule(updatedSchedule);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const activeDays = schedule.filter(day => day.focus.trim() !== '');

    const customPlan = {
      userId: user._id,
      planName,
      description,
      daysPerWeek: activeDays.length,
      schedule: activeDays,
      isCustom: true,
    };

    setLoading(true);

    try {
      const response = await fetch('/api/user-workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customPlan),
      });

      if (response.ok) {
        setSuccess('Custom workout plan created successfully!');
        setTimeout(() => navigate('/my-workouts'), 2000);
      } else {
        setErrors({ submit: 'Failed to create workout plan' });
      }
    } catch (error) {
      setErrors({ submit: 'Error creating workout plan' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-workout-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Create Custom Workout Plan</h1>
          <p className="page-subtitle">Design your personalized fitness routine</p>
        </div>

        {success && <div className="success-message">{success}</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit} className="custom-workout-form">
          <div className="form-section card">
            <h2 className="section-title">Plan Details</h2>
            
            <div className="form-group">
              <label htmlFor="planName">Plan Name *</label>
              <input
                type="text"
                id="planName"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className={errors.planName ? 'input-error' : ''}
                placeholder="e.g., My Custom Split"
              />
              {errors.planName && <span className="error-text">{errors.planName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={errors.description ? 'input-error' : ''}
                placeholder="Describe your workout plan..."
                rows="4"
              />
              {errors.description && <span className="error-text">{errors.description}</span>}
            </div>
          </div>

          <div className="form-section card">
            <h2 className="section-title">Weekly Schedule</h2>
            {errors.schedule && <div className="error-text">{errors.schedule}</div>}
            
            <div className="schedule-builder">
              {schedule.map((day, dayIndex) => (
                <div key={dayIndex} className="day-builder">
                  <div className="day-builder-header">
                    <h3>{day.day}</h3>
                    <div className="day-focus-input">
                      <input
                        type="text"
                        value={day.focus}
                        onChange={(e) => handleDayFocusChange(dayIndex, e.target.value)}
                        placeholder="e.g., Back & Biceps (leave empty for rest day)"
                      />
                    </div>
                  </div>

                  {day.focus && (
                    <div className="exercises-builder">
                      <h4>Exercises</h4>
                      {day.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="exercise-input-group">
                          <input
                            type="text"
                            placeholder="Exercise name"
                            value={exercise.name}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                            className="exercise-name-input"
                          />
                          <input
                            type="text"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', e.target.value)}
                            className="exercise-sets-input"
                          />
                          <input
                            type="text"
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', e.target.value)}
                            className="exercise-reps-input"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExercise(dayIndex, exerciseIndex)}
                            className="btn-remove-exercise"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddExercise(dayIndex)}
                        className="btn btn-secondary btn-add-exercise"
                      >
                        + Add Exercise
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
              {loading ? 'Creating Plan...' : 'Create Workout Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomWorkout;