import React, { useState, useEffect, useRef } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Item({ item, todos, setTodos }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDescription, setEditDescription] = useState(item.description);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: editTitle, description: editDescription } : todo
      )
    );
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    localStorage.setItem("todos", JSON.stringify(todos.filter((todo) => todo.id !== item.id)));
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? {
              ...todo,
              is_doing: newStatus === "Doing",
              is_completed: newStatus === "Done",
            }
          : todo
      )
    );
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id
        ? {
            ...todo,
            is_doing: newStatus === "Doing",
            is_completed: newStatus === "Done",
          }
        : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <li id={item?.id} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              value={editTitle}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="edit-description">
            <textarea
              name="edit-description"
              id="edit-description"
              value={editDescription}
              onChange={handleDescriptionChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <div className="todo_items_left">
            <p
              style={
                item.is_doing
                  ? { textDecoration: "underline", color: "#FFD700" }
                  : item.is_completed
                  ? { textDecoration: "line-through" }
                  : {}
              }
            >
              {item?.title}
            </p>
          </div>
          <div className="todo_description">
            {item?.description}
          </div>
          <div className="todo_items_right">
            <select
              value={
                item.is_completed
                  ? "Done"
                  : item.is_doing
                  ? "Doing"
                  : "To-Do"
              }
              onChange={handleStatusChange}
            >
              <option value="To-Do">To-Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            <button onClick={() => setEditing(true)}>
              <FaEdit />
            </button>
            <button onClick={handleDelete}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Item;
