import React from "react";
import "./list.css";
import TaskItem from "../TaskItem/TaskItem";

function TaskList({
  tasks,
  deleteTask,
  toggleCompleteTask,
  editTask,
  current,
  setForm,
}) {
  return (
    <div>
      <h2>Tasks for {current ? current : "Category"}</h2>
      <div className="newItem text-secondary mb-3">
        Add a new item
        <i className="bi bi-plus-square addItem" onClick={() => setForm()}></i>
      </div>
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleteTask={toggleCompleteTask}
            editTask={editTask}
          />
        ))
      ) : (
        <h3 className="fs-6 text-secondary mt-5"></h3>
      )}
    </div>
  );
}

export default TaskList;
