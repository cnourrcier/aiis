import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoryState {
    story: string;
    mood: string;
    segmentCount: number;
    karma: number;
}

const initialState: StoryState = {
    story: '',
    mood: '',
    segmentCount: 0,
    karma: 0,
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
        adjustKarma(state, action: PayloadAction<number>) {
            state.karma += action.payload;
        },
        resetStory(state) {
            state.story = '';
            state.mood = '';
            state.segmentCount = 0;
            state.karma = 0;
        }
    },
});

export const { setStoryText, adjustKarma, resetStory } = storySlice.actions;
export default storySlice.reducer;