import React from 'react';
import { renderWithMockStore } from '../mockStore'; // Adjust the path as necessary
import { screen, fireEvent } from '@testing-library/react';
import ModuleComponent from '../module/Module'; // Adjust the path as necessary
import { setCurrentLesson, setCurrentModule } from '../../features/currentCourseSlice';
import { setShowCurrentLesson, setShowCurrentCourse } from '../../features/uiSlice';
import type { CoursesState, uiState, CurrentCourseState, Module, Course } from '../../interfaces/interfaces';

describe('Course Component', () => {
    const initialState = {
        courses: {
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
        } as CoursesState, // Type assertion here
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
            } as Course, // Type assertion here
            currentModule: { title: 'Module 1' } as Module, // Type assertion here
            currentLesson: null,
        },
        ui: {
            showCourseList: false,
            showCurrentCourse: false,
            showCurrentModule: true,
            showCurrentLesson: false,
        },
    } as { courses: CoursesState; currentCourse: CurrentCourseState; ui: uiState };

    test('renders loading state', () => {
        const loadingState = {
            ...initialState,
            courses: { ...initialState.courses, loading: true },
        };
        
        renderWithMockStore(<ModuleComponent />, loadingState);
        expect(screen.getByText(/loading module details.../i)).toBeInTheDocument();
    });

    test('renders error message', () => {
        const errorState = {
            ...initialState,
            courses: { ...initialState.courses, error: 'Failed to load' },
        };

        renderWithMockStore(<ModuleComponent />, errorState);
        expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
    });

    test('renders module details when showCurrentModule is true', () => {
        renderWithMockStore(<ModuleComponent />, initialState);
        expect(screen.getByText(/module 1/i)).toBeInTheDocument();
        expect(screen.getByText(/lessons/i)).toBeInTheDocument();
        expect(screen.getByText(/lesson 1/i)).toBeInTheDocument();
        expect(screen.getByText(/lesson 2/i)).toBeInTheDocument();
    });

    test('dispatches setCurrentLesson on lesson click', () => {
        const { store } = renderWithMockStore(<ModuleComponent />, initialState);
        const lesson1 = screen.getByText(/lesson 1/i);
        fireEvent.click(lesson1);

        const actions = store.getActions();
        expect(actions).toContainEqual(setCurrentLesson(expect.objectContaining({ title: 'Lesson 1' })));
        expect(actions).toContainEqual(setShowCurrentLesson());
    });

    test('dispatches setCurrentModule and setShowCurrentCourse on back button click', () => {
        const { store } = renderWithMockStore(<ModuleComponent />, initialState);
        const backButton = screen.getByText(/back/i);
        fireEvent.click(backButton);

        const actions = store.getActions();
        expect(actions).toContainEqual(setCurrentModule(null));
        expect(actions).toContainEqual(setShowCurrentCourse());
    });
});
