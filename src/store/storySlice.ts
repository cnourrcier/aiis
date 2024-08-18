import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StoryState {
    story: string;
    mood: string;
    characters: string[];
    options: string[];
    segmentCount: number;
    karma: number;
}

const initialState: StoryState = {
    story: '',
    mood: '',
    characters: [],
    options: [],
    segmentCount: 0,
    karma: 0,
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStoryText(state, action: PayloadAction<{ story: string; mood: string; characters: string[]; options: string[] }>) {
            state.story = action.payload.story;
            state.mood = action.payload.mood;
            state.characters = action.payload.characters;
            state.options = action.payload.options;
            state.segmentCount += 1;
        },
        adjustKarma(state, action: PayloadAction<number>) {
            state.karma += action.payload;
        },
        resetStory(state) {
            state.story = '';
            state.mood = '';
            state.characters = [];
            state.options = [];
            state.segmentCount = 0;
            state.karma = 0;
        }
    },
});

export const { setStoryText, adjustKarma, resetStory } = storySlice.actions;
export default storySlice.reducer;