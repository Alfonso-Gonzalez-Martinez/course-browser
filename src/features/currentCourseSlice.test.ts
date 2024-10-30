import currentCourseReducer, { setCurrentCourse, setCurrentModule, setCurrentLesson } from './currentCourseSlice';
import type { CurrentCourseState } from '../interfaces/interfaces';

describe('currentCourseSlice', () => {
    const initialState: CurrentCourseState = {
        currentCourse: null,
        currentModule: null,
        currentLesson: null,
    };

    test('return initial state when passed an empty action', () => {
        const result = currentCourseReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    test('handle setCurrentCourse action', () => {
        const course = { id: '1', title: 'Course 1' };
        const result = currentCourseReducer(initialState, setCurrentCourse(course));
        expect(result).toEqual({
            currentCourse: course,
            currentModule: null,
            currentLesson: null,
        });
    });

    test('handle setCurrentModule action', () => {
        const module = { title: 'Module 1' };
        const result = currentCourseReducer(initialState, setCurrentModule(module));
        expect(result).toEqual({
            currentCourse: null,
            currentModule: module,
            currentLesson: null,
        });
    });

    test('handle setCurrentLesson action', () => {
        const lesson = { title: 'Lesson 1' };
        const result = currentCourseReducer(initialState, setCurrentLesson(lesson));
        expect(result).toEqual({
            currentCourse: null,
            currentModule: null,
            currentLesson: lesson,
        });
    });
});
