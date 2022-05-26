import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
  '@@todos/getTodos',
  async () => {
    const res = await fetch('http://localhost:3001/todos')
    const data = await res.json()
    return data;
  }
)

export const addTodo = createAsyncThunk(
  '@@todos/addTodo',
  async (title) => {
    const res = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        completed: false,
      })
    })
    const data = await res.json();
    return data;
  }
)

export const removeTodo = createAsyncThunk(
  '@@todos/removeTodo',
  async (id) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    await res.json();
    return id;  
  }
)

export const toggleTodo = createAsyncThunk(
  '@@todos/toggleTodo',
  async (id, {getState}) => {
    const todo = getState().todos.todos.find(item => item.id === id);

    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({completed: !todo.completed})
    })

    const data = await res.json();
    return data;
  }
)

export const clearCompleted = createAsyncThunk(
  '@@todos/clearCompleted',
  async (_, {getState}) => {
    const completedTodos = getState().todos.todos.filter(item => item.completed === true);
    const completedTodoIds = completedTodos.map(todo => todo.id)

    if(completedTodoIds.length > 0) {
      const res = Promise.all(
        completedTodos.map(async (i) => ( await
          fetch(`http://localhost:3001/todos/${i.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
              },
                body: JSON.stringify({completed: false})
              })
            ))
      )
      const data = await res;
      if (data[0].status === 200) {
        return completedTodoIds;
      }
    } return completedTodoIds;
  }
)

const todoSlice = createSlice({
    name: '@@todos',
    initialState: {
      status: 'idle',
      error: null,
      todos: [],
  },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getTodos.rejected, (state) => {
          state.status = 'idle'
          state.error = 'something went wrong'
        })
        .addCase(getTodos.pending, (state) => {
          state.status = 'loading'
          state.error = null
        })
        .addCase(getTodos.fulfilled, (state, action) => {
          state.status = 'idle'
          state.error = null
          state.todos = action.payload
        })
        .addCase(addTodo.fulfilled, (state, action) => {
          state.todos.push(action.payload)
        })
        .addCase(removeTodo.fulfilled, (state, action) => {
          state.todos = state.todos.filter(todo => todo.id !== action.payload);
        })
        .addCase(toggleTodo.fulfilled, (state, action) => {
          const index = state.todos.findIndex(todo => todo.id === action.payload.id)
          state.todos[index] = action.payload;
        })
        .addCase(clearCompleted.fulfilled, (state, action) => {
          const ids = action.payload
          state.todos = state.todos.map((todo) => {
          let match = ids.find(item => item === todo['id'])
          if(match) {
            todo.completed = false
          }
          return todo;
        })
    })
  }  
})

export const todoReducer = todoSlice.reducer;


export const selectVisibleTodos = (state, filter) => {
    switch (filter) {
      case 'all': {
         return state.todos.todos;
      }
      case 'active': {
        return state.todos.todos.filter(todo => !todo.completed);
      }
      case 'completed': {
        return state.todos.todos.filter(todo => todo.completed);
      }
      default: {
        return state.todos;
      }
    }
  }