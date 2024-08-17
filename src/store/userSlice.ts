import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userInput: string,
    choices: string[];
}

const initialState: UserState = {
    userInput: '',
    choices: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInput(state, action: PayloadAction<string>) {
            state.userInput = action.payload;
        },
        addUserChoice(state, action: PayloadAction<string>) {
            state.choices.push(action.payload);
        },
        resetUserChoices(state) {
            state.choices = [];
        },
    },
});

export const { setUserInput, addUserChoice, resetUserChoices } = userSlice.actions;
export default userSlice.reducer;


// This slice will manage user input and the decisions they make during the story.