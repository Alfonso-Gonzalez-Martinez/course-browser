import { configureStore } from '@reduxjs/toolkit';
import coursesReducer, { setSearchTerm, resetSearchTerm, fetchCourses } from './coursesSlice';

describe('coursesSlice', () => {
    const initialState = {
        courses: [],
        loading: false,
        error: null,
        searchTerm: '',
    };

    test('return the initial state when passed an empty action', () => {
        const result = coursesReducer(undefined, { type: '' });
        expect(result).toEqual(initialState);
    });

    test('handle setSearchTerm action', () => {
        const searchTerm = 'React';
        const result = coursesReducer(initialState, setSearchTerm(searchTerm));
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
        const result = coursesReducer(modifiedState, resetSearchTerm());
        expect(result).toEqual(initialState);
    });

    test('handle fetchCourses.pending action', () => {
        const result = coursesReducer(initialState, { type: fetchCourses.pending.type });
        expect(result).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    test('handle fetchCourses.fulfilled action', () => {
        const courses = [{ id: '1', title: 'Course 1' }];
        const result = coursesReducer(initialState, { type: fetchCourses.fulfilled.type, payload: courses });
        expect(result).toEqual({
            loading: false,
            error: null,
            courses,
            searchTerm: '',
        });
    });

    test('handle fetchCourses.rejected action', () => {
        const errorMessage = 'Failed to fetch the courses';
        const result = coursesReducer(initialState, { type: fetchCourses.rejected.type, error: { message: errorMessage } });
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
                json: () => Promise.resolve([{ id: '1', title: 'Course 1' }]),
            })
        ) as jest.Mock;


        const store = configureStore({
            reducer: { courses: coursesReducer },
        });


        await store.dispatch(fetchCourses() as any);

        const state = store.getState().courses;
        expect(state.courses).toEqual([{ id: '1', title: 'Course 1' }]);
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
            reducer: { courses: coursesReducer },
        });

        await store.dispatch(fetchCourses() as any);

        const state = store.getState().courses;
        expect(state.courses).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Failed to fetch the courses');
    });
});