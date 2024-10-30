import LessonComponent from '../lesson/Lesson';
import { renderWithMockStore } from '../mockStore';
import { screen, fireEvent } from '@testing-library/react';
import { setCurrentLesson } from '../../features/currentCourseSlice';
import { setShowCurrentModule } from '../../features/uiSlice';
import type { CoursesState, uiState, CurrentCourseState, Module, Lesson } from '../../interfaces/interfaces';

describe('Lesson Component', () => {
    const initialState = {
        courses: {
            loading: false,
            error: null,
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
            currentModule: { title: 'Module 1', lessons: [{ title: 'Lesson 1' }, { title: 'Lesson 2' }] } as Module,
            currentLesson: {
                title: 'Lesson 1',
                description: 'Description for Lesson 1',
                topics: ['Topic A', 'Topic B'],
                content: [{ type: 'text', data: 'Content for Lesson 1' }]
            } as Lesson,
        },
        ui: {
            showCourseList: false,
            showCurrentCourse: false,
            showCurrentModule: false,
            showCurrentLesson: true,
        },
    } as { courses: CoursesState; currentCourse: CurrentCourseState; ui: uiState };

    test('renders loading state', () => {
        const loadingState = {
            ...initialState,
            courses: { ...initialState.courses, loading: true },
        };

        renderWithMockStore(<LessonComponent />, loadingState);
        expect(screen.getByText(/loading lesson details.../i)).toBeInTheDocument();
    });

    test('renders error message', () => {
        const errorState = {
            ...initialState,
            courses: { ...initialState.courses, error: 'Failed to load' },
        };

        renderWithMockStore(<LessonComponent />, errorState);
        expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
    });


    test('dispatches setCurrentLesson and setShowCurrentModule on back button click', () => {
        const { store } = renderWithMockStore(<LessonComponent />, initialState);
        const backButton = screen.getByText(/back/i);
        fireEvent.click(backButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(setCurrentLesson(null));
        expect(actions).toContainEqual(setShowCurrentModule());
    });
});
