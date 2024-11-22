import { renderWithMockStore } from '../mockStore';
import { fireEvent, screen } from '@testing-library/react';
import SearchBar from './SearchBar';


describe('SearchBar Component', () => {
    const initialState = {
        courseCatalog: {
            courses: [],
            loading: false,
            error: null,
            searchTerm: '',
        },
        currentCourse: {
            currentLesson: null,
            currentModule: null,
            currentCourse: null,
        },
        ui: {
            showCourseList: true,
            showCurrentCourse: false,
            showCurrentModule: false,
            showCurrentLesson: false,
        },
    };

    test('renders correctly with initial state', () => {
        renderWithMockStore(<SearchBar />, initialState);

        const searchInput = screen.getByPlaceholderText(/search courses by title or description/i);
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toBeEnabled();
        expect(searchInput).toHaveValue('');

        const clearButton = screen.getByRole('button', { name: /clear search/i });
        expect(clearButton).toBeDisabled();
    });

    test('dispatches setSearchTerm action on input change', () => {
        const { store } = renderWithMockStore(<SearchBar />, initialState);
        const searchInput = screen.getByPlaceholderText(/search courses by title or description/i);

        fireEvent.change(searchInput, { target: { value: 'React' } });

        expect(store.getState().courseCatalog.searchTerm).toBe('React');
        expect(searchInput).toHaveValue('React');
    });

    test('dispatches reset actions when home button is clicked', () => {
        const { store } = renderWithMockStore(<SearchBar />, initialState);
        const homeButton = screen.getByRole('button', { name: /home icon/i });

        fireEvent.click(homeButton);

        const state = store.getState();
        expect(state.currentCourse.currentCourse).toBe(null);
        expect(state.currentCourse.currentModule).toBe(null);
        expect(state.currentCourse.currentLesson).toBe(null);
        expect(state.courseCatalog.searchTerm).toBe('');
        expect(state.ui.showCourseList).toBe(true);
    });

    test('enables and disables input based on showCourseList state', () => {
        const updatedInitialState = {
            ...initialState,
            ui: {
                ...initialState.ui,
                showCourseList: false,
            },
        };

        renderWithMockStore(<SearchBar />, updatedInitialState);
        const searchInput = screen.getByPlaceholderText(/disabled. press home to continue searching/i);
        expect(searchInput).toBeDisabled();
    });

    test('clears search and dispatches home actions when Clear Search is clicked', () => {
        const updatedInitialState = {
            courseCatalog: {
                courses: [],
                loading: false,
                error: null,
                searchTerm: 'React'
            },
            currentCourse: {
                currentCourse: null,
                currentModule: null,
                currentLesson: null
            },
            ui: {
                showCourseList: true,
                showCurrentCourse: false,
                showCurrentModule: false,
                showCurrentLesson: false
            },
        };

        const { store } = renderWithMockStore(<SearchBar />, updatedInitialState);

        const clearButton = screen.getByRole('button', { name: /clear search/i });
        fireEvent.click(clearButton);

        const state = store.getState();
        expect(state.courseCatalog.searchTerm).toBe('');
        expect(state.currentCourse.currentCourse).toBe(null);
        expect(state.currentCourse.currentModule).toBe(null);
        expect(state.currentCourse.currentLesson).toBe(null);
    });
});

export {};