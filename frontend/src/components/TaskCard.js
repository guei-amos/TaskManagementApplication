import { useState } from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("fr-FR")
    : "Aucune date";

  return (
    <div className="task-card">

    
      {isEditing ? (
        <div className="edit-mode">

          <input
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                title: e.target.value,
              })
            }
          />

          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                description: e.target.value,
              })
            }
          />

          <button
            onClick={() => {
              onUpdate(task._id, editedTask);
              setIsEditing(false);
            }}
          >
            Sauvegarder
          </button>
        </div>
      ) : (
        <div className="view-mode">

          <h3 className="task-title">{task.title}</h3>

          <p className="task-description">
            {task.description || "Aucune description"}
          </p>

          <div className="task-info">
            <p>
              <strong>Statut :</strong>{" "}
              <span
                className={`status ${task.status
                  ?.toLowerCase()
                  .replace(/\s/g, "-")}`}
              >
                {task.status}
              </span>
            </p>

            <p>
              <strong>Date limite :</strong> {formattedDate}
            </p>
          </div>
        </div>
      )}

      
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>
          Modifier
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          Supprimer
        </button>
      </div>

    </div>
  );
};

export default TaskCard;