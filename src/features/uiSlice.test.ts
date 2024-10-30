import uiReducer, { showCourses, setShowCurrentCourse, setShowCurrentModule, setShowCurrentLesson } from './uiSlice';
import type { uiState } from '../interfaces/interfaces';

describe('uiSlice', () => {
    const initialState: uiState = {
        showCourseList: true,
        showCurrentCourse: false,
        showCurrentModule: false,
        showCurrentLesson: false,
    };

    test('should return the initial state when passed an empty action', () => {
        const result = uiReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    test('handle showCourses action', () => {
        const modifiedState: uiState = {
            showCourseList: false,
            showCurrentCourse: true,
            showCurrentModule: false,
            showCurrentLesson: false,
        };

        const result = uiReducer(modifiedState, showCourses());
        expect(result).toEqual({
            showCourseList: true,
            showCurrentCourse: false,
            showCurrentModule: false,
            showCurrentLesson: false,
        });
    });

    test('handle setShowCurrentCourse action', () => {
        const result = uiReducer(initialState, setShowCurrentCourse());
        expect(result).toEqual({
            showCourseList: false,
            showCurrentCourse: true,
            showCurrentModule: false,
            showCurrentLesson: false,
        });
    });

    test('handle setShowCurrentModule action', () => {
        const result = uiReducer(initialState, setShowCurrentModule());
        expect(result).toEqual({
            showCourseList: false,
            showCurrentCourse: false,
            showCurrentModule: true,
            showCurrentLesson: false,
        });
    });

    test('handle setShowCurrentLesson action', () => {
        const result = uiReducer(initialState, setShowCurrentLesson());
        expect(result).toEqual({
            showCourseList: false,
            showCurrentCourse: false,
            showCurrentModule: false,
            showCurrentLesson: true,
        });
    });
});

export {};
