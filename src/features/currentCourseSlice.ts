import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CurrentCourseState, Course, Module, Lesson } from '../interfaces/interfaces'

const initialState: CurrentCourseState = {
    currentCourse: null,
    currentModule: null,
    currentLesson: null,
  };


export const currentCourseSlice = createSlice({
    name: 'currentCourse',
    initialState,
    reducers: {
        setCurrentCourse: (state: CurrentCourseState, action: PayloadAction<Course | null>) => {
            state.currentCourse = action.payload
        },
        setCurrentModule: (state: CurrentCourseState, action: PayloadAction<Module | null>) => {
            state.currentModule = action.payload
        },
        setCurrentLesson: (state: CurrentCourseState, action: PayloadAction<Lesson | null>) => {
            state.currentLesson = action.payload
        }
    },
})


export default currentCourseSlice.reducer
export const { setCurrentCourse, setCurrentModule, setCurrentLesson } = currentCourseSlice.actions;
