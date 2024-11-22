import currentCourseReducer, { setCurrentCourse, setCurrentModule, setCurrentLesson } from './currentCourseSlice';
import type { CurrentCourseState, Course, Module, Lesson } from '../interfaces/interfaces';

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
        const course: Course = {
            id: 1,
            title: 'Course Title',
            description: 'A short description of the course.',
            modules: [],
          };
        const result = currentCourseReducer(initialState, setCurrentCourse(course));
        expect(result).toEqual({
            currentCourse: course,
            currentModule: null,
            currentLesson: null,
        });
    });

    test('handle setCurrentModule action', () => {
        const module: Module = { title: 'Module 1', lessons: [] };
        const result = currentCourseReducer(initialState, setCurrentModule(module));
        expect(result).toEqual({
            currentCourse: null,
            currentModule: module,
            currentLesson: null,
        });
    });

    test('handle setCurrentLesson action', () => {
        const lesson: Lesson = {
            title: 'Lesson 1',
            description: 'Description for lesson 1',
            topics: ['Topic 1'],
            content: [{ type: 'text', data: 'Some content' }]
        };
        const result = currentCourseReducer(initialState, setCurrentLesson(lesson));
        expect(result).toEqual({
            currentCourse: null,
            currentModule: null,
            currentLesson: lesson,
        });
    });
});
