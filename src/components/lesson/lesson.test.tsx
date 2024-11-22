import LessonComponent from '../lesson/Lesson';
import { renderWithMockStore } from '../mockStore';
import { screen, fireEvent } from '@testing-library/react';
import { setCurrentLesson } from '../../features/currentCourseSlice';
import { setShowCurrentModule } from '../../features/uiSlice';
import type { CoursesState, uiState, CurrentCourseState } from '../../interfaces/interfaces';

describe('Lesson Component', () => {
    const initialState: {
        courseCatalog: CoursesState;
        currentCourse: CurrentCourseState;
        ui: uiState;
    } = {
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
        },
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
            },
            currentModule: { title: 'Module 1',
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
            currentLesson: {
                title: 'Lesson 1',
                description: 'Description for Lesson 1',
                topics: ['Topic A', 'Topic B'],
                content: [{ type: 'text', data: 'Content for Lesson 1' }]
            },
        },
        ui: {
            showCourseList: false,
            showCurrentCourse: false,
            showCurrentModule: false,
            showCurrentLesson: true,
        },
    };

    test('renders loading state', async () => {
        const loadingState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, loading: true },
        };

        renderWithMockStore(<LessonComponent />, loadingState);
        const loadingMessage = await screen.findByText("Loading lesson details...")
        expect(loadingMessage).toBeInTheDocument();
    });

    test('renders error message', () => {
        const errorState = {
            ...initialState,
            courseCatalog: { ...initialState.courseCatalog, error: 'Failed to load' },
        };

        renderWithMockStore(<LessonComponent />, errorState);
        expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
    });

    test('renders lesson content', async () => {
        renderWithMockStore(<LessonComponent />, initialState);

        const lesson1 = await screen.findByText('Lesson 1')
        const description1 = await screen.findByText('Description for Lesson 1')
        const topicA = await screen.findByText('Topic A')
        const topicB = await screen.findByText('Topic B')
        const content1 = await screen.findByText('Content for Lesson 1')

        expect(lesson1).toBeInTheDocument();
        expect(description1).toBeInTheDocument();
        expect(topicA).toBeInTheDocument();
        expect(topicB).toBeInTheDocument();
        expect(content1).toBeInTheDocument();
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
