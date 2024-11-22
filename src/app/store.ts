import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from '../features/coursesSlice';
import currentCourseReducer from '../features/currentCourseSlice'
import uiReducer from '../features/uiSlice'

export const store = configureStore({
    reducer: {
        courseCatalog: coursesReducer,
        currentCourse: currentCourseReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store;