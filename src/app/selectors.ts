import { createSelector } from 'reselect';
import type { RootState } from '../app/store';

const selectCourses = (state: RootState) => state.courses.courses;
const selectSearchTerm = (state: RootState) => state.courses.searchTerm;

export const selectFilteredCourses = createSelector(
    [selectCourses, selectSearchTerm],
    (courses, searchTerm) => {
        if (!searchTerm) return courses;
        console.log("Selector recalculated");
        return courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
);
