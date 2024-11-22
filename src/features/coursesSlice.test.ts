import { configureStore } from '@reduxjs/toolkit';
import coursesSliceReducer, { setSearchTerm, resetSearchTerm, fetchCourses } from './coursesSlice';
import type { Course } from '../interfaces/interfaces';

describe('coursesSlice', () => {
    const initialState = {
        courses: [],
        loading: false,
        error: null,
        searchTerm: '',
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('return the initial state when passed an empty action', () => {
        const result = coursesSliceReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    test('handle setSearchTerm action', () => {
        const searchTerm = 'React';
        const result = coursesSliceReducer(initialState, setSearchTerm(searchTerm));
        expect(result).toEqual({
            ...initialState,
            searchTerm,
        });
    });

    test('handle resetSearchTerm action', () => {
        const modifiedState = {
            ...initialState,
            searchTerm: 'React',
        };
        const result = coursesSliceReducer(modifiedState, resetSearchTerm());
        expect(result).toEqual(initialState);
    });

    test('handle fetchCourses.pending action', () => {
        const result = coursesSliceReducer(initialState, { type: fetchCourses.pending.type });
        expect(result).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    test('handle fetchCourses.fulfilled action', () => {
        const courses: Course[] = [{ id: 1, title: 'Course 1', description: 'Description for course 1', modules: [] }];
        const result = coursesSliceReducer(initialState, { type: fetchCourses.fulfilled.type, payload: courses });
        expect(result).toEqual({
            loading: false,
            error: null,
            courses,
            searchTerm: '',
        });
    });

    test('handle fetchCourses.rejected action', () => {
        const errorMessage = 'Failed to fetch the courses';
        const result = coursesSliceReducer(initialState, { type: fetchCourses.rejected.type, error: { message: errorMessage } });
        expect(result).toEqual({
            ...initialState,
            loading: false,
            error: errorMessage,
        });
    });

    test('fetch courses successfully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve<Course[]>([{  id: 1, title: 'Course 1', description: 'A course description', modules: [] }]),
            })
        ) as jest.Mock;


        const store = configureStore({
            reducer: { courses: coursesSliceReducer },
        });

        await store.dispatch(fetchCourses());

        const state = store.getState().courses;
        expect(state.courses).toEqual([{  id: 1, title: 'Course 1', description: 'A course description', modules: [] }]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    test('handle fetchCourses error', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Failed to fetch the courses',
            })
        ) as jest.Mock;

        const store = configureStore({
            reducer: { courses: coursesSliceReducer },
        });

        await store.dispatch(fetchCourses());

        const state = store.getState().courses;
        expect(state.courses).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to fetch the courses');
    });
});