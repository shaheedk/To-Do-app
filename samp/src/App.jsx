import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { MdTaskAlt } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(0);
  
useEffect(()=>{
  inputRef.current.focus(); 
})
  const inputRef=useRef()
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTask = () => {
    if (task !== "") {
      setTasks([...tasks, { list: task, id: Date.now(), completed: false }]);
      setTask("");
    }
    if (editId) {
      const editTask = tasks.find((todo) => todo.id === editId);
      const updateTask = tasks.map((to) =>
        to.id === editTask.id
          ? (to = { id: to.id, list: task })
          : (to = { id: to.id, list:to.list })
          
      );
      setTasks(updateTask)
      setEditId(0)
    }
  };
  const handleDelete = (id) => {
    setTasks(tasks.filter((list) => list.id !== id));
  };
  const onCompleate = () => {
    let complete = tasks.map((list) => {
      if (list.id) {
        return { ...list, completed: !list.completed };
      }
      return list;
    });
    setTasks(complete);
  };
  const onEdit = (id) => {
    const editTask = tasks.find((todo) => todo.id === id);
    setTask(editTask.list);

    setEditId(editTask.id);
  };
  return (
    <div className="app-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <input
        ref={inputRef}
          className="task-input"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>{editId? 'Edit':'add'}</button>
      </form>
      <div>
        <ul>
          {tasks.map((todo) => (
            <li className="list-items" key={todo.id}>
              <div
                className="list-item-list"
                id={todo.completed ? "list-items" : null}
              >
                {todo.list}
              </div>
              <span>
                <MdTaskAlt
                  className="list-item-icons"
                  id="complete"
                  onClick={() => onCompleate(todo.id)}
                />

                <FaEdit
                  className="list-item-icons"
                  id="edit"
                  onClick={() => onEdit(todo.id)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  onClick={() => handleDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
