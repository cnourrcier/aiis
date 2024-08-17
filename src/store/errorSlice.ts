import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
    errorMessage: string | null;
}

const initialState: ErrorState = {
    errorMessage: null,
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string | null>) {
            state.errorMessage = action.payload;
        },
        clearError(state) {
            state.errorMessage = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;

// This slice will manage error states and messages.