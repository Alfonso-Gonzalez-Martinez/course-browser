import { createSelector } from 'reselect';
import type { RootState } from '../app/store';
import type { Course } from '../interfaces/interfaces'

const selectCourses = (state: RootState): Course[] => state.courseCatalog.courses;
const selectSearchTerm = (state: RootState): string => state.courseCatalog.searchTerm;

export const selectFilteredCourses =
    createSelector([selectCourses, selectSearchTerm], (courses, searchTerm): Course[] => {

            if (!searchTerm) return courses;
            console.log("Selector recalculated");

            return courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    );