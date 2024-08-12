import { useState } from "react";
import styles from "./styles.module.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState(["eat", "run", "walk"]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  }

  function saveTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className={styles.toDoList}>
      <h1 className={styles.toDoListTitle}>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className={styles.addButton} onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className={styles.editInput}
                />
                <button className={styles.saveButton} onClick={() => saveTask(index)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <span className={styles.text}>{task}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className={styles.moveButton}
                  onClick={() => moveTaskUp(index)}
                >
                  Up
                </button>
                <button
                  className={styles.moveButton}
                  onClick={() => moveTaskDown(index)}
                >
                  Down
                </button>
                <button
                  className={styles.editButton}
                  onClick={() => editTask(index)}
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
