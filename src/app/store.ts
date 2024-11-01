import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from '../features/coursesSlice';
import currentCourseReducer from '../features/currentCourseSlice'
import uiReducer from '../features/uiSlice'

export const store = configureStore({
    reducer: {
        courses: coursesReducer,
        currentCourse: currentCourseReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Redux store, manage all the reducers. 