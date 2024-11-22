import { EnhancedStore } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface MockStore extends EnhancedStore<RootState> {
    getActions: () => any[];
}