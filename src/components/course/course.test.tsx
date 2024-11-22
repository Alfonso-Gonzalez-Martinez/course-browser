import { renderWithMockStore } from '../mockStore';
import { screen, fireEvent } from '@testing-library/react';
import CourseComponent from './Course';
import { setCurrentModule, setCurrentCourse } from '../../features/currentCourseSlice';
import { setShowCurrentModule, showCourses } from '../../features/uiSlice';
import type { CoursesState, uiState, CurrentCourseState, Course } from '../../interfaces/interfaces';

describe('Course Component', () => {
    const initialState = {
        courseCatalog: {
            loading: false,
            error: null,
            searchTerm: '',
            courses: [
                {
                    id: 1,
                    title: 'Course 1',
                    description: 'Description for Course 1',
                    modules: [
                        {
                            title: 'Module 1',
                            lessons: [
                                {
                                    title: 'Lesson 1',
                                    description: 'Description for Lesson 1',
                                    topics: ['Topic A', 'Topic B'],
                                    content: [{ type: 'text', data: 'Content for Lesson 1' }],
                                },
                                {
                                    title: 'Lesson 2',
                                    description: 'Description for Lesson 2',
                                    topics: ['Topic C', 'Topic D'],
                                    content: [{ type: 'video', data: 'Video link for Lesson 2' }],
                                },
                            ],
                        },
                    ],
                },
            ],
        } as CoursesState,
        currentCourse: {
            currentCourse: {
                id: 1,
                title: 'Course 1',
                description: 'Description for Course 1',
                modules: [
                    {
                        title: 'Module 1',
                        lessons: [
                            {
                                title: 'Lesson 1',
                                description: 'Description for Lesson 1',
                                topics: ['Topic A', 'Topic B'],
                                content: [{ type: 'text', data: 'Content for Lesson 1' }],
                            },
                            {
                                title: 'Lesson 2',
                                description: 'Description for Lesson 2',
                                topics: ['Topic C', 'Topic D'],
                                content: [{ type: 'video', data: 'Video link for Lesson 2' }],
                            },
                        ],
                    },
                ],
            } as Course,
            currentModule: null,
            currentLesson: null,
        },
        ui: {
            showCourseList: false,
            showCurrentCourse: true,
            showCurrentModule: false,
            showCurrentLesson: false,
        },
    } as { courseCatalog: CoursesState; currentCourse: CurrentCourseState; ui: uiState };


    test('renders nothing when there are no courses', () => {
        const emptyState = { ...initialState, courseCatalog: { ...initialState.courseCatalog, courses: [] } };

        renderWithMockStore(<CourseComponent />, emptyState);
        expect(screen.queryByText(/course 1/i)).toBeNull();
    });

    test('does not render course details when currentCourse is null', () => {
        const emptyCurrentCourseState = { ...initialState, currentCourse: { currentCourse: null, currentModule: null, currentLesson: null } };

        renderWithMockStore(<CourseComponent />, emptyCurrentCourseState);
        expect(screen.queryByText(/course 1/i)).toBeNull();
    });

    test('renders loading state', async () => {
        const loadingState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, loading: true },
        };

        renderWithMockStore(<CourseComponent />, loadingState);

            const loadingText = await screen.findByText("Loading course details...");
            expect(loadingText).toBeInTheDocument()
    });

    test('renders error message', async () => {
        const errorState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, error: 'Failed to load' },
        };

        renderWithMockStore(<CourseComponent />, errorState);
            const errorMessage = await screen.findByText('Error: Failed to load');
            expect(errorMessage).toBeInTheDocument();
    });

    test('renders course details when showCurrentCourse is true', () => {
        renderWithMockStore(<CourseComponent />, initialState);
        expect(screen.getByText("Course 1")).toBeInTheDocument();
        expect(screen.getByText(/description for course 1/i)).toBeInTheDocument();
        expect(screen.getByText(/modules/i)).toBeInTheDocument();
        expect(screen.getByText(/module 1/i)).toBeInTheDocument();
        expect(screen.getByText(/lesson 1/i)).toBeInTheDocument();
        expect(screen.getByText(/lesson 2/i)).toBeInTheDocument();
    });

    test('does not render modules if modules array is empty', () => {
        const noModulesState = { ...initialState, courseCatalog: { ...initialState.courseCatalog, courses: [{ ...initialState.courseCatalog.courses[0], modules: [] }] } };

        renderWithMockStore(<CourseComponent />, noModulesState);
        const modulesList = screen.queryByTestId('modules-list');

        expect(modulesList).toBeInTheDocument();
        expect(modulesList).toBeEmptyDOMElement();
    });

    test('dispatches setCurrentModule on module click', () => {
        const { store } = renderWithMockStore(<CourseComponent />, initialState);
        const module1 = screen.getByText(/module 1/i);

        fireEvent.click(module1);

        const actions = store.getActions();
        expect(actions).toContainEqual(setCurrentModule(expect.objectContaining({ title: 'Module 1' })));
        expect(actions).toContainEqual(setShowCurrentModule());
    });

    test('dispatches setCurrentCourse and showCourses on back button click', () => {
        const { store } = renderWithMockStore(<CourseComponent />, initialState);
        const backButton = screen.getByText(/back/i);
        fireEvent.click(backButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(setCurrentCourse(null));
        expect(actions).toContainEqual(showCourses());
    });
});
