import React from "react";
import Items from "./Items"
// import FaEdit from "./react-icons"
function TODOList({ todos, setTodos }) {
  const handleDoing = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, is_doing: true, is_completed: false } : todo
      )
    );
  };

  const handleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: true, is_doing: false } : todo
      )
    );
  };

  return (
    <div className="todo_lists_container">
      <ol className="todo_list">
        <h2>To-Do</h2>
        {todos && todos.length > 0 ? (
          todos
            .filter((item) => !item.is_doing && !item.is_completed)
            .map((item, index) => (
              <Item
                key={index}
                item={item}
                setTodos={setTodos}
                onDoing={handleDoing}
                onComplete={handleComplete}
              />
            ))
        ) : (
          <p> what are you up to?</p>
        )}
      </ol>
      <ol className="todo_list">
        <h2>Doing</h2>
        {todos
          .filter((item) => item.is_doing && !item.is_completed)
          .map((item, index) => (
            <Item
              key={index}
              item={item}
              setTodos={setTodos}
              onComplete={handleComplete}
            />
          )
          )}
           <p>keep going!</p>
      </ol>
      <ol className="todo_list">
        <h2>Done</h2>
        {todos
          .filter((item) => item.is_completed)
          .map((item, index) => (
            <Item key={index} item={item} setTodos={setTodos} />
          ))}
           <p>good-work!</p>
      </ol>
    </div>
  );
}

function Item({ item, setTodos, onDoing, onComplete }) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();

      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
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
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          {!item.is_completed && (
            <button
              className="todo_items_left"
              onClick={() =>
                item.is_doing ? onComplete(item.id) : onDoing(item.id)
              }
            >
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={34}
                height={34}
                stroke="#22C55E"
                fill={item.is_doing ? "#FFD700" : "#0d0d0d"}
              >
                <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
              </svg>
              <p
                style={
                  item.is_doing
                    ? { textDecoration: "underline", color: "#FFD700" }
                    : {}
                }
              >
                {item?.title}
              </p>
            </button>
          )}
          {item.is_completed && (
            <p style={{ textDecoration: "line-through" }}>{item?.title}</p>
          )}
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
}

export default TODOList;

