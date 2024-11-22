    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import type { PayloadAction } from "@reduxjs/toolkit";
    import type { CoursesState, Course } from '../interfaces/interfaces'

    const initialState: CoursesState = {
        courses: [],
        loading: false,
        error: null,
        searchTerm: '',
    };

    export const fetchCourses = createAsyncThunk<Course[], void, {rejectValue: string}>(
        'courses/fetchCourses',
        async (_, { rejectWithValue }) => {
          try {
            const response = await fetch(`${process.env.PUBLIC_URL}/courses.json`);
            if (!response.ok) {
              throw new Error("Failed to fetch the courses");
            }
            const data = await response.json();
            return data;
          } catch (error) {
            return rejectWithValue('Failed to fetch the courses');
          }
        }
      );

    export const coursesSlice = createSlice({
        name: 'courseCatalog',
        initialState,
        reducers: {
            setSearchTerm: (state: CoursesState, action: PayloadAction<string>) => {
                state.searchTerm = action.payload;
            },
            resetSearchTerm: (state: CoursesState) => {
                state.searchTerm = '';
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchCourses.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                    state.loading = false;
                    state.courses = action.payload;
                })
                .addCase(fetchCourses.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload || action.error.message || 'Failed to fetch the courses';
                })
        }
    })


    export default coursesSlice.reducer
    export const { setSearchTerm, resetSearchTerm } = coursesSlice.actions;
