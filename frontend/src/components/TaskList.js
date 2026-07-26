import TaskCard from "./TaskCard";
import "./TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate }) => {
  return (
    <div className="task-list">
      <h2>Mes tâches</h2>

      {tasks.length === 0 ? (
        <p>Aucune tâche disponible.</p>
      ) : (
        <div className="task-list-items">
          {tasks.map((task) => (
            // <TaskCard key={task._id} task={task} />
               <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;