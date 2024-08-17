import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoryState {
    story: string;
    mood: string;
    segmentCount: number;
}

const initialState: StoryState = {
    story: '',
    mood: '',
    segmentCount: 0,
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStoryText(state, action: PayloadAction<{ story: string; mood: string }>) {
            state.story = action.payload.story;
            state.mood = action.payload.mood;
            state.segmentCount += 1;
            console.log(state.segmentCount);
        },
        resetStory(state) {
            state.story = '';
            state.mood = '';
            state.segmentCount = 0;
        }
    },
});

export const { setStoryText, resetStory } = storySlice.actions;
export default storySlice.reducer;