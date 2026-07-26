
import { useState } from "react";
import "./TaskForm.css";

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // Mise à jour des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Le titre est obligatoire.");
      return;
    }
    console.log(task);

    onAddTask(task);

    // Réinitialisation du formulaire
    setTask({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  return (
    <div className="task-form-container">
      <h2>Nouvelle tâche</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Entrer le titre"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Description de la tâche"
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Date limite</label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Ajouter la tâche</button>
      </form>
    </div>
  );
};

export default TaskForm;