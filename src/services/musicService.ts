import { Howl } from 'howler';

const tracks = {
    calm: new Howl({ src: ['calmTrack.mp3'], loop: true }),
    tense: new Howl({ src: ['tenseTrack.mp3'], loop: true }),
    joyful: new Howl({ src: ['joyfulTrack.mp3'], loop: true }),
}
const stopAllTracks = () => {
    Object.values(tracks).forEach(track => track.stop());
};

export const playMusic = (mood: string) => {
    stopAllTracks();

    switch (mood.toLowerCase()) {
        case 'calm':
            tracks.calm.play();
            break;
        case 'tense':
            tracks.tense.play();
            break;
        case 'joyful':
            tracks.joyful.play();
            break;
        default:
            tracks.calm.play();
            break;
    }
};




// This module handles the logic for triggering music based on the detected mood. 
// It might also include functions for managing audio playback and transitions.