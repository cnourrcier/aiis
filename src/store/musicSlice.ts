import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MusicState {
    currentTrack: string;
    volume: number;
}

const initialState: MusicState = {
    currentTrack: '',
    volume: 1.0, // Default volume
};

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        setCurrentTrack(state, action: PayloadAction<string>) {
            state.currentTrack = action.payload;
        },
        setVolume(state, action: PayloadAction<number>) {
            state.volume = action.payload;
        },
    },
});

export const { setCurrentTrack, setVolume } = musicSlice.actions;
export default musicSlice.reducer;