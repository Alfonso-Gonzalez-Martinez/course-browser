import React from 'react';
import { renderWithMockStore } from '../mockStore'; // Adjust the path as necessary
import { screen, fireEvent } from '@testing-library/react';
import CoursesList from '../coursesList/CoursesList'; // Adjust the path as necessary
import { setCurrentCourse } from '../../features/currentCourseSlice';
import { setShowCurrentCourse } from '../../features/uiSlice';
import type { Course } from '../../interfaces/interfaces'; // Import the Course type
import type { CoursesState, CurrentCourseState, uiState } from '../../interfaces/interfaces'; // Import your state types

describe('CoursesList Component', () => {
    const initialState = {
        courses: {
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
            ] as Course[], // Ensure courses is typed as an array of Course
        } as CoursesState, // Type the courses state
        currentCourse: {
            currentCourse: null, // Set to null or a valid course if needed
            currentModule: null, // Set to null or a valid module if needed
            currentLesson: null, // Set to null or a valid lesson if needed
        } as CurrentCourseState, // Type the current course state
        ui: {
            showCourseList: true,
        } as uiState, // Type the UI state
    };

    test('renders loading state', () => {
        const loadingState = {
            ...initialState,
            courses: { ...initialState.courses, loading: true },
        };

        renderWithMockStore(<CoursesList />, loadingState);
        expect(screen.getByText(/loading courses.../i)).toBeInTheDocument();
    });

    test('renders the list of courses', () => {
        renderWithMockStore(<CoursesList />, initialState);
        expect(screen.getByText("Course 1")).toBeInTheDocument();
        expect(screen.getByText(/description for course 1/i)).toBeInTheDocument();
        expect(screen.getByText("Course 2")).toBeInTheDocument();
        expect(screen.getByText(/description for course 2/i)).toBeInTheDocument();
    });


});
