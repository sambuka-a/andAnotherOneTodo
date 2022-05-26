//import axios from 'axios'
import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './features/theme/theme-slice'
import { todoReducer } from './features/todos/todos-slice'
import { controlReducer } from './features/controls/controls-slice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        todos: todoReducer,
        controls: controlReducer,
    }
})