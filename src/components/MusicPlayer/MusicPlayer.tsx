import { useEffect } from "react";
import { playMusic } from '../../services/musicService';

const MusicPlayer: React.FC<{ mood: string }> = ({ mood }) => {
    useEffect(() => {
        playMusic(mood);
    }, [mood]);

    return null; // No UI needed, it's handled by the service
};

export default MusicPlayer;

// If needed, a component to manage music playback, though much of the music logic might already be handled in the service.