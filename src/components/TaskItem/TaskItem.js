import React, { useState } from "react";
import "./item.css";

function TaskItem({ task, deleteTask, toggleCompleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newTime, setTime] = useState(task.time);
  const [newDate, setDate] = useState(task.date);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task._id, newDescription, newTime, newDate);
    }
    setIsEditing(!isEditing);
  };

  const handleComplete = (isCompleted) => {
    toggleCompleteTask(task._id, !isCompleted);
    if (!isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const dateObject = new Date(task.date);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`task-item ${task.isCompleted ? "completed" : ""}`}>
      {showConfetti && task.isCompleted && (
        <div className="confetti">
          {[...Array(30)].map((_, index) => (
            <div
              key={index}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `hsl(${Math.random() * 360}, 70%, 50%)`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 1}s`,
              }}
            ></div>
          ))}
        </div>
      )}

      {isEditing ? (
        <>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <input
            type="time"
            value={newTime}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setDate(e.target.value)}
            min={today}
          />
        </>
      ) : (
        <>
          <h3>{task.description}</h3>
          <p>{formattedDate}</p>
          <p>{task.time}</p>
        </>
      )}
      <p>Category: {task.category}</p>
      <p>
        {task.important ? (
          <i className="bi bi-star-fill text-warning border border-2 rounded-circle p-1 starIcon starImp"></i>
        ) : (
          <i className="bi bi-star border border-2 rounded-circle p-1 starIcon"></i>
        )}
      </p>

      <div className="task-actions">
        <button onClick={() => handleComplete(task.isCompleted)}>
          <i
            className={
              task.isCompleted
                ? "bi bi-arrow-counterclockwise"
                : "bi bi-check-circle text-success"
            }
          ></i>
        </button>
        <button onClick={handleEdit}>
          <i className={isEditing ? "bi bi-save" : "bi bi-pencil-square"}></i>
        </button>
        <button onClick={() => deleteTask(task._id)}>
          <i className="bi bi-trash text-danger"></i>
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
