import { useState } from "react";
import "./TaskFilterBar.css";

const TaskFilterBar = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("date");

  const handleChange = (newSearch, newStatus, newSort) => {
    onFilterChange({
      search: newSearch,
      status: newStatus,
      sort: newSort,
    });
  };

  return (
    <div className="filter-bar">
      
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          handleChange(e.target.value, status, sort);
        }}
      />

    
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          handleChange(search, e.target.value, sort);
        }}
      >
        <option value="all">Tous</option>
        <option value="À faire">À faire</option>
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
      </select>

      
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          handleChange(search, status, e.target.value);
        }}
      >
        <option value="date">Date limite</option>
        <option value="title">Titre (A-Z)</option>
      </select>
    </div>
  );
};

export default TaskFilterBar;