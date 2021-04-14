import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { store, todoType } from '../../store/storeTodoList';

interface Props {}
interface PropTodoView {
  todo: todoType;
  handleRemove: () => void;
}
interface PropTodoListView {
  todoList: {
    todos: todoType[];
    unfinishedTodoCount: number;
    addTodoList: (title: string) => void;
    remove: (id: number) => void;
  };
}

const Dashboard = ({}: Props) => {
  return (
    <>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/game'>Game</Link>
        </li>
      </ul>

      <TodoListView todoList={store} />
    </>
  );
};

const TodoListView = observer(({ todoList }: PropTodoListView) => {
  const [value, setValue] = useState('');

  const handleAddTodo = () => {
    todoList.addTodoList(value);
    setValue('');
  };

  return (
    <div>
      {todoList.todos.length > 0 ? (
        <ul>
          {todoList.todos.map((todo) => (
            <TodoView
              todo={todo}
              key={todo.id}
              handleRemove={() => todoList.remove(todo.id)}
            />
          ))}
        </ul>
      ) : (
        'no todos'
      )}
      <p>Tasks left: {todoList.unfinishedTodoCount}</p>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && handleAddTodo()}
      />
      <button onClick={handleAddTodo}>add Todo</button>
    </div>
  );
});

const TodoView = observer(({ todo, handleRemove }: PropTodoView) => (
  <li>
    <input
      type='checkbox'
      checked={todo.finished}
      onClick={() => todo.toggle()}
    />
    {todo.title}
    <button
      onClick={() => {
        handleRemove();
      }}
    >
      X
    </button>
  </li>
));

export default Dashboard;
