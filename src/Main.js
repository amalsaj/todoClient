import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import axios from "axios";
import TaskList from "./components/TaskList/TaskList";
import NewTaskForm from "./components/Form/NewTaskForm";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./main.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const [tasks, setTasks] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("Today");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const email = localStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://todoserver-0wug.onrender.com/api/todo/getToDos",
        {
          params: { email },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("There was an error fetching the tasks!", error);
    }
  };
  const handleLogout = () => {
    enqueueSnackbar("Logout Successfully 🎉");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  const addTask = async (task) => {
    try {
      await axios.post(
        "https://todoserver-0wug.onrender.com/api/todo/createToDos",
        {
          ...task,
          email,
        }
      );
      enqueueSnackbar("New task added 🎉");
      fetchTasks();
      setFormVisible(false);
    } catch (error) {
      console.error("There was an error creating the task!", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `https://todoserver-0wug.onrender.com/api/todo/deleteToDo`,
        {
          data: { email, todoId: id },
        }
      );
      enqueueSnackbar("Task deleted 🎉");
      fetchTasks();
    } catch (error) {
      console.error("There was an error deleting the task!", error);
    }
  };

  const toggleCompleteTask = async (id, isCompleted) => {
    console.log(id);
    try {
      await axios.put(
        `https://todoserver-0wug.onrender.com/api/todo/updateToDo`,
        {
          email,
          todoId: id,
          isCompleted,
        }
      );
      isCompleted
        ? enqueueSnackbar("Task completed 🎉")
        : enqueueSnackbar("Task restored 🎉");
      fetchTasks();
    } catch (error) {
      console.error("There was an error updating the task status!", error);
    }
  };

  const editTask = async (id, description, time, date) => {
    try {
      await axios.put(
        `https://todoserver-0wug.onrender.com/api/todo/editToDo`,
        {
          email,
          todoId: id,
          description,
          time,
          date,
        }
      );
      enqueueSnackbar("Task updated 🎉");
      fetchTasks();
    } catch (error) {
      console.error("There was an error updating the task!", error);
    }
  };

  const categories = [
    "Today",
    "This Week",
    "This Month",
    "All",
    "Work",
    "Home",
    "Completed",
  ];

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    const today = new Date();
    const firstDayOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  };

  const isThisMonth = (date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const filterTasksByDate = (category) => {
    return tasks?.filter((task) => {
      const taskDate = new Date(task.date);
      const isNotCompleted = !task.isCompleted;

      switch (category) {
        case "All":
          return isNotCompleted;
        case "Today":
          return isToday(taskDate) && isNotCompleted;
        case "Completed":
          return task.isCompleted;
        case "This Week":
          return (isThisWeek(taskDate) || isToday(taskDate)) && isNotCompleted;
        case "This Month":
          return (
            (isThisMonth(taskDate) ||
              isThisWeek(taskDate) ||
              isToday(taskDate)) &&
            isNotCompleted
          );
        default:
          return task.category === category && isNotCompleted;
      }
    });
  };

  return (
    <div className="d-flex">
      <div className={`sidebar ${isSidebarVisible ? "visible" : "hidden"}`}>
        <Navbar className="flex-column">
          <Navbar.Brand className="category" href="#">
            INBOX
          </Navbar.Brand>
          <Nav className="flex-column mt-2">
            {categories.map((category) => (
              <Nav.Link
                key={category}
                className={`nav-link ${
                  currentCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentCategory(category);
                  setFormVisible(false);
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{category}</span>
                  <span className="badge square-box"> </span>
                </div>
                <h1 className="fs-6 text-secondary">
                  {filterTasksByDate(category)?.length} items
                </h1>
              </Nav.Link>
            ))}
            <Nav.Link
              className="logoutIcon"
              title="logout"
              onClick={handleLogout}
            >
              {" "}
              <i class="bi bi-box-arrow-left fs-2"></i>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <div
        className={`main-content ${
          isSidebarVisible ? "expanded" : "collapsed"
        }`}
      >
        {!formVisible ? (
          <TaskList
            setForm={() => setFormVisible(true)}
            current={currentCategory}
            tasks={filterTasksByDate(currentCategory)}
            deleteTask={deleteTask}
            toggleCompleteTask={toggleCompleteTask}
            editTask={editTask}
          />
        ) : (
          <NewTaskForm addTask={addTask} />
        )}
      </div>
      <Button
        className="sidebar-toggle"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? (
          <i class="fa-solid fa-bars fs-2"></i>
        ) : (
          <i className="fa-solid fa-bars fs-2"></i>
        )}
      </Button>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={2000}
        variant="success"
      />
    </div>
  );
}

export default Main;
