import { renderWithMockStore } from '../mockStore';
import { screen, fireEvent } from '@testing-library/react';
import CoursesList from '../coursesList/CoursesList';
import type { Course } from '../../interfaces/interfaces';
import type { CoursesState, CurrentCourseState, uiState } from '../../interfaces/interfaces';
import { setCurrentCourse } from '../../features/currentCourseSlice';
import { setShowCurrentCourse } from '../../features/uiSlice';

describe('CoursesList Component', () => {
    const initialState = {
        courseCatalog: {
            loading: false,
            error: null,
            courses: [
                {
                    id: 1,
                    title: 'Course 1',
                    description: 'Description for Course 1',
                },
                {
                    id: 2,
                    title: 'Course 2',
                    description: 'Description for Course 2',
                },
            ] as Course[],
        } as CoursesState,
        currentCourse: {
            currentCourse: null,
            currentModule: null,
            currentLesson: null,
        } as CurrentCourseState,
        ui: {
            showCourseList: true,
        } as uiState,
    };

    test('renders loading state', () => {
        const loadingState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, loading: true },
        };

        renderWithMockStore(<CoursesList />, loadingState);
        expect(screen.getByText(/loading courses.../i)).toBeInTheDocument();
    });

    test('renders error message', async () => {
        const errorState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, error: "Trigger" },
        };
        renderWithMockStore(<CoursesList />, errorState);

        const errorMessage = await screen.findByText('Error: Failed to fetch the courses')
        expect(errorMessage).toBeInTheDocument();
    });

    test('renders the list of courses', () => {
        renderWithMockStore(<CoursesList />, initialState);

        expect(screen.getByText("Course 1")).toBeInTheDocument();
        expect(screen.getByText(/description for course 1/i)).toBeInTheDocument();
        expect(screen.getByText("Course 2")).toBeInTheDocument();
        expect(screen.getByText(/description for course 2/i)).toBeInTheDocument();
    });

    test('does not render courses if no courses are available', () => {
        const emptyCoursesState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, courses: [] },
            ui: { ...initialState.ui, showCourseList: true },  // Ensure showCourseList is true
        };

        renderWithMockStore(<CoursesList />, emptyCoursesState);
        const courseItems = screen.queryAllByRole('listitem');
        expect(courseItems).toHaveLength(0);
    });


    test('dispatches setCurrentCourse and setShowCurrentCourse on course click', () => {
        const { store } = renderWithMockStore(<CoursesList />, initialState);

        const course1 = screen.getByText('Course 1');
        fireEvent.click(course1);

        const actions = store.getActions();
        expect(actions).toContainEqual(setCurrentCourse(expect.objectContaining({ title: 'Course 1' })));
        expect(actions).toContainEqual(setShowCurrentCourse());
    });

    test('renders filtered courses if filter is applied', () => {
        const filteredCoursesState = {
            ...initialState,
            courseCatalog: {
                ...initialState.courseCatalog,
                courses: [
                    {
                        id: 1,
                        title: 'Course 1',
                        description: 'Description for Course 1',
                        modules: []
                    },
                ],
            },
            ui: {
                ...initialState.ui,
                showCourseList: true,
            },
        };

        renderWithMockStore(<CoursesList />, filteredCoursesState);
        expect(screen.getByText('Course 1')).toBeInTheDocument();
        expect(screen.queryByText('Course 2')).toBeNull();
    });

    test('does not render courses list when showCourseList is false', () => {
        const noCourseListState = {
            ...initialState,
            ui: {
                ...initialState.ui,
                showCourseList: false,
            },
        };

        renderWithMockStore(<CoursesList />, noCourseListState);
        expect(screen.queryByTestId('courses-list')).toBeNull();
    });
});
