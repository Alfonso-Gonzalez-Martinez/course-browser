import { renderWithMockStore } from '../mockStore';
import { screen } from '@testing-library/react';
import CoursesList from '../coursesList/CoursesList';
import type { Course } from '../../interfaces/interfaces';
import type { CoursesState, CurrentCourseState, uiState } from '../../interfaces/interfaces';

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
