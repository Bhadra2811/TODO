import React from "react";
import Item from "./Items";

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
                todos={todos}
                setTodos={setTodos}
                onDoing={handleDoing}
                onComplete={handleComplete}
              />
            ))
        ) : (
          <p>What are you up to?</p>
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
              todos={todos}
              setTodos={setTodos}
              onComplete={handleComplete}
            />
          ))}
        <p>Keep going!</p>
      </ol>
      <ol className="todo_list">
        <h2>Done</h2>
        {todos
          .filter((item) => item.is_completed)
          .map((item, index) => (
            <Item key={index} item={item} todos={todos} setTodos={setTodos} />
          ))}
        <p>Good work!</p>
      </ol>
    </div>
  );
}

export default TODOList;


