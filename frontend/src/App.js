import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to hold the list of tasks. We'll try to load from localStorage first.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  // State to hold the text of the new task being entered.
  const [newTaskText, setNewTaskText] = useState('');

  // useEffect hook to save tasks to localStorage whenever the tasks state changes.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (newTaskText.trim() === '') return; // Don't add empty tasks

    const newTask = {
      id: Date.now(), // Unique ID using timestamp
      text: newTaskText,
      isDone: false,
      progress: 0, // Initial progress is 0
      date: new Date().toLocaleDateString(), // Today's date
    };

    setTasks([...tasks, newTask]);
    setNewTaskText(''); // Clear the input field
  };

  // Function to toggle a task's 'done' status
  const handleToggleDone = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        // If task is marked as done, set progress to 100
        return { ...task, isDone: !task.isDone, progress: !task.isDone ? 100 : task.progress };
      }
      return task;
    }));
  };

  // Function to handle changes in the progress slider
  const handleProgressChange = (taskId, newProgress) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        // A task with 100% progress is considered done
        return { ...task, progress: newProgress, isDone: newProgress === 100 };
      }
      return task;
    }));
  };
  
  // Function to delete a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>My Daily Tasks</h1>
        <p>Stay organized, one task at a time.</p>
      </header>
      
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className={`task-item ${task.isDone ? 'done' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => handleToggleDone(task.id)}
                  className="task-checkbox"
                />
                <div className="task-details">
                  <span className="task-text">{task.text}</span>
                  <span className="task-date">Added: {task.date}</span>
                </div>
              </div>

              {/* Progress Section: Show only if the task is NOT done */}
              {!task.isDone && (
                <div className="progress-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress}
                    onChange={(e) => handleProgressChange(task.id, parseInt(e.target.value))}
                    className="progress-slider"
                  />
                  <div className="progress-labels">
                    <span>Done: {task.progress}%</span>
                    <span>Pending: {100 - task.progress}%</span>
                  </div>
                </div>
              )}
              
              <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">
                ×
              </button>
            </div>
          ))
        ) : (
          <p className="no-tasks-message">No tasks yet. Add one above to get started!</p>
        )}
      </div>
    </div>
  );
}

export default App;