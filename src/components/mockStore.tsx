import React from 'react';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import coursesReducer from '../features/coursesSlice';
import currentCourseReducer from '../features/currentCourseSlice';
import uiReducer from '../features/uiSlice';
import { MockStore } from './storeTypes';
import type { RootState } from '../app/store';


export const createMockStore = (initialState?: RootState): MockStore => {
    const actions: any[] = [];

    const actionTracker: Middleware<{}, RootState> = (store) => (next) => (action) => {
        actions.push(action);
        return next(action);
    };

    const store = configureStore({
        reducer: {
            courseCatalog: coursesReducer,
            currentCourse: currentCourseReducer,
            ui: uiReducer,
        },
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionTracker),
    });

    (store as MockStore).getActions = () => actions;
    return store as MockStore;
};

export const renderWithMockStore = (
    component: React.ReactElement,
    initialState?: RootState
): { store: MockStore } & RenderResult => {
        const store = createMockStore(initialState);
        const rendered = render(<Provider store={store}>{component}</Provider>);
        return { ...rendered, store };
};
