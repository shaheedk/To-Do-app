import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { MdTaskAlt } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(0);
  
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }); 

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTask = () => {
    if (task !== '') {
      if (editId) {
        const updateTask = tasks.map((to) =>
          to.id === editId ? { id: to.id, list: task, completed: false } : to
        );
        setTasks(updateTask);
        setEditId(0);
      } else {
        setTasks([...tasks, { list: task, id: Date.now(), completed: false }]);
      }
      setTask('');
    }
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((list) => list.id !== id));
  };

  const handleComplete = (id) => {
    const complete = tasks.map((list) =>
      list.id === id ? { ...list, completed: !list.completed } : list
    );
    setTasks(complete);
  };

  const handleEdit = (id) => {
    const editTask = tasks.find((todo) => todo.id === id);
    setTask(editTask.list);
    setEditId(editTask.id);
  };

  return (
    <div className="container">
      <h2 style={{color:"white"}}>ToDo App</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          ref={inputRef}
          placeholder="Enter New Task"
          className="form-control"
          onChange={(event) => setTask(event.target.value)}
        />
        <button className="add" type="button" onClick={addTask}>
          {editId ? 'edit' : 'add'}
        </button>
      </form>
      <div>
        <ul>
          {tasks.map((todo) => (
            <li className="list-items" key={todo.id}>
              <div className="list-item-list" id={todo.completed ? 'list-items' : null}>
                {todo.list}
              </div>
              <span>
                <MdTaskAlt
                  className="list-item-icons"
                  id="complete"
                  onClick={() => handleComplete(todo.id)}
                />
                <FaEdit
                  className="list-item-icons"
                  id="edit"
                  onClick={() => handleEdit(todo.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
      
          ))}
        </ul>
      </div>
    </div>
  );
}



export default App; // Export the component without calling it
