import { makeObservable, observable, action, computed } from "mobx"

export interface todoType {
  id: number;
  title: string;
  finished: boolean;
  toggle: () => void
}

class Todo {
  id = Math.random()
  title = ""
  finished = false

  constructor(title: string) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action
    })
    this.title = title
  }

  toggle() {
    this.finished = !this.finished
  }
}

class TodoList {
  todos: todoType[] = []

  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length
  }

  constructor(todos: todoType[]) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed,
    })
    this.todos = todos
  }

  addTodoList(title: string) {
    const newTodo = new Todo(title)
    // this.todos.push(newTodo)
    this.todos = [...this.todos, newTodo]

  }
  remove(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }
}
const store = new TodoList([]);

export { store }