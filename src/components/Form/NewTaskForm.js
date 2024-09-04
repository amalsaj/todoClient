import React, { useState } from "react";
import "./form.css";

function NewTaskForm({ addTask, setForm }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [important, setImportant] = useState(false);
  const [isCompleted, setStatus] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ description, category, date, time, important, isCompleted });
    setDescription("");
    setCategory("");
    setDate("");
    setTime("");
    setImportant(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="title">New Task</h1>
        <input
          type="text"
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select Category
          </option>
          <option value="Work">Work</option>
          <option value="Home">Home</option>
          <option value="Fun">Fun</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <label>
          Important?
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
        </label>
        <button type="submit">Done</button>
      </form>
    </div>
  );
}

export default NewTaskForm;
