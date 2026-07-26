import { useEffect, useState, useCallback } from "react"; // 1. Ajout de useCallback
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilterBar from "../components/TaskFilterBar";
import taskService from "../services/taskService";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  // UN SEUL STATE POUR TOUT (search + filter + sort)
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    sort: "date",
  });

  const token = localStorage.getItem("token");

  // USER
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Erreur user :", error);
    localStorage.removeItem("user");
  }

  // FETCH TASKS (Enveloppé avec useCallback)
  const fetchTasks = useCallback(async () => {
    try {
      const res = await taskService.getTasks(token);
      setTasks(res.data || []);
    } catch (err) {
      console.error("Erreur FETCH TASKS =", err.response?.data || err.message);
    }
  }, [token]); // token est la dépendance de fetchTasks

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTasks();
  }, [token, navigate, fetchTasks]); // 2. fetchTasks ajouté ici sans avertissement !

  // CREATE TASK
  const createTask = async (task) => {
    try {
      await taskService.createTask(task, token);
      fetchTasks();
    } catch (err) {
      console.error("Erreur création :", err);
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id, token);
      fetchTasks();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  // UPDATE TASK
  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await taskService.updateTask(id, updatedTask, token);
      fetchTasks();
    } catch (err) {
      console.error("Erreur update :", err);
    }
  };

  // FILTER + SEARCH + SORT
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // SEARCH
    if (filters.search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          task.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // STATUS
    if (filters.status !== "all") {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    // SORT
    if (filters.sort === "date") {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    if (filters.sort === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  // La déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <span className="navbar-title">Task Manager App</span>

        <div className="navbar-right">
          <span className="user-name">{user?.username || "Utilisateur"}</span>

          <button className="btn-logout" onClick={handleLogout}>
            LOG OUT
          </button>
        </div>
      </nav>

      <h1 className="main-title">Dashboard</h1>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 0 ? "active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          MY TASKS
        </button>

        <button
          className={`tab-button ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          PROFILE
        </button>
      </div>

      {activeTab === 0 ? (
        <div className="tasks-card">
          <div className="tasks-header">
            <span className="card-title">Tasks</span>
          </div>

          <TaskForm onAddTask={createTask} />

          <TaskFilterBar onFilterChange={setFilters} />

          <TaskList
            tasks={getFilteredTasks()}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      ) : (
        <div className="profile-card">
          <h3>User Profile</h3>

          <p>
            <strong>Nom :</strong> {user?.username || "-"}
          </p>

          <p>
            <strong>Email :</strong> {user?.email || "-"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;