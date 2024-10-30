// src/types/store.ts
import { EnhancedStore } from '@reduxjs/toolkit';
import { RootState } from '../app/store'; // Adjust the path as necessary

export interface MockStore extends EnhancedStore<RootState> {
    getActions: () => any[]; // Adjust the return type if necessary
}
