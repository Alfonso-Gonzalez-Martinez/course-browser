import { configureStore, Middleware } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import type { RootState } from '../app/store'; // Adjust the path as necessary
import coursesReducer from '../features/coursesSlice';
import currentCourseReducer from '../features/currentCourseSlice';
import uiReducer from '../features/uiSlice';
import { MockStore } from './storeTypes'; // Adjust the path to your types

export const createMockStore = (initialState?: RootState): MockStore => {
    const actions: any[] = []; // Array to track actions

    // Custom middleware to capture dispatched actions
    const actionTracker: Middleware<{}, RootState> = (store) => (next) => (action) => {
        actions.push(action); // Capture the action
        return next(action);
    };

    // Configure the store with the custom middleware
    const store = configureStore({
        reducer: {
            courses: coursesReducer,
            currentCourse: currentCourseReducer,
            ui: uiReducer,
        },
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionTracker),
    });

    // Add a method to get dispatched actions
    (store as MockStore).getActions = () => actions;

    return store as MockStore; // Cast the store to MockStore
};

export const renderWithMockStore = (
    component: React.ReactElement,
    initialState?: RootState
): { store: MockStore } & RenderResult => {
    const store = createMockStore(initialState);
    const rendered = render(<Provider store={store}>{component}</Provider>);
    return { ...rendered, store };
};
