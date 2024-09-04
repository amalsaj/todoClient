import React, { useState } from "react";
import "./item.css";

function TaskItem({ task, deleteTask, toggleCompleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);
  const [newTime, setTime] = useState(task.time);
  const [newDate, setDate] = useState(task.date);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task._id, newDescription, newTime, newDate);
    }
    setIsEditing(!isEditing);
  };

  const today = new Date().toISOString().split("T")[0];
  const dateObject = new Date(task.date);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className={`task-item ${task.isCompleted ? "completed" : ""}`}>
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
        <button onClick={() => toggleCompleteTask(task._id, !task.isCompleted)}>
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
