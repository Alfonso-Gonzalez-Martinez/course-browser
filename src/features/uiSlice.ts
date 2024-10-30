import { createSlice } from "@reduxjs/toolkit";
import type { uiState } from '../interfaces/interfaces'

const initialState: uiState = {
    showCourseList: true,
    showCurrentCourse: false,
    showCurrentModule: false,
    showCurrentLesson: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showCourses: (state) => {
            state.showCourseList = true;
            state.showCurrentCourse = false;
            state.showCurrentModule = false;
            state.showCurrentLesson = false;
        },
        setShowCurrentCourse: (state) => {
            state.showCourseList = false;
            state.showCurrentCourse = true;
            state.showCurrentModule = false;
            state.showCurrentLesson = false;
        },
        setShowCurrentModule: (state) => {
            state.showCourseList = false;
            state.showCurrentCourse = false;
            state.showCurrentModule = true;
            state.showCurrentLesson = false;
        },
        setShowCurrentLesson: (state) => {
            state.showCourseList = false;
            state.showCurrentCourse = false;
            state.showCurrentModule = false;
            state.showCurrentLesson = true;
        }
    },
})

export const {showCourses, setShowCurrentCourse, setShowCurrentModule, setShowCurrentLesson} = uiSlice.actions
export default uiSlice.reducer