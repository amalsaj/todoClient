import React from 'react';
import { FaClipboard } from 'react-icons/fa'; // Or any other suitable icon
import "./notask.css"

const NoTasks = () => {
  return (
    <div className="no-tasks">
      <div className="no-tasks-content">
        <FaClipboard className="no-tasks-icon" />
        <p className="no-tasks-message">You have no tasks for now.</p>
      </div>
    </div>
  );
};

export default NoTasks;
