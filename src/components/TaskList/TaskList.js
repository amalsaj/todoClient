import React from "react";
import "./list.css";
import TaskItem from "../TaskItem/TaskItem";
import NoTasks from "../noTask/NoTask";

function TaskList({
  tasks,
  deleteTask,
  toggleCompleteTask,
  editTask,
  current,
  setForm,
}) {
  // To display current date
  const today = new Date().toISOString().split("T")[0];
  const dateObject = new Date(today);
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div>
      <div className="head-title">
        <h2 className="task-heading">
          {current === "Today"
            ? `Today's Tasks (${formattedDate})`
            : `${current} Tasks`}
        </h2>
        <p className="task-subheading">
          {current === "Today"
            ? "Make the most of today."
            : "Keep going, you're doing great!"}
        </p>
      </div>

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
        <NoTasks />
      )}
    </div>
  );
}

export default TaskList;
