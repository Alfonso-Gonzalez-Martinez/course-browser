import React from 'react';
import { renderWithMockStore } from '../mockStore'; // Adjust the path as necessary
import { screen, fireEvent } from '@testing-library/react';
import CourseComponent from './Course'; // Adjust the path as necessary
import { setCurrentModule, setCurrentCourse } from '../../features/currentCourseSlice';
import { setShowCurrentModule, showCourses } from '../../features/uiSlice';
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
    } as { courses: CoursesState; currentCourse: CurrentCourseState; ui: uiState };

    test('renders loading state', () => {
        const loadingState = {
            ...initialState,
            courses: { ...initialState.courses, loading: true },
        };
        
        renderWithMockStore(<CourseComponent />, loadingState);
        expect(screen.getByText(/loading course details.../i)).toBeInTheDocument();
    });

    test('renders error message', () => {
        const errorState = {
            ...initialState,
            courses: { ...initialState.courses, error: 'Failed to load' },
        };

        renderWithMockStore(<CourseComponent />, errorState);
        expect(screen.getByText(/error: failed to load/i)).toBeInTheDocument();
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
