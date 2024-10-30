import { createSlice } from "@reduxjs/toolkit";
import type { CurrentCourseState } from '../interfaces/interfaces'

const initialState: CurrentCourseState = {
    currentCourse: null,
    currentModule: null,
    currentLesson: null,
  };


export const currentCourseSlice = createSlice({
    name: 'currentCourse',
    initialState,
    reducers: {
        setCurrentCourse: (state, action) => {
            state.currentCourse = action.payload
        },
        setCurrentModule: (state, action) => {
            state.currentModule = action.payload
        },
        setCurrentLesson: (state, action) => {
            state.currentLesson = action.payload
        }
    },
})


export default currentCourseSlice.reducer
export const { setCurrentCourse, setCurrentModule, setCurrentLesson } = currentCourseSlice.actions;
