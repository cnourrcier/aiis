import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { startStory, continueStoryWithDecision } from '../../services/storyService';
import { playMusic } from '../../services/musicService';
import { setStoryText, resetStory } from '../../store/storySlice';
import { setUserInput, addUserChoice } from '../../store/userSlice';
import { setLoading } from '../../store/loadingSlice';
import { setError, clearError } from '../../store/errorSlice';

const NarrativeController: React.FC = () => {
    const dispatch = useDispatch();
    const userInput = useSelector((state: RootState) => state.user.userInput);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const segmentCount = useSelector((state: RootState) => state.story.segmentCount);
    const [hasStoryStarted, setHasStoryStarted] = useState(false);

    const handleStartStory = async () => {
        dispatch(setLoading(true));
        try {
            const { mood, story } = await startStory();
            dispatch(setStoryText({ story, mood }));
            playMusic(mood);
            setHasStoryStarted(true);
        } catch (error) {
            console.error(error);
            dispatch(setError("Failed to start the story."));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleUserInput = async () => {
        dispatch(setLoading(true));
        try {
            console.log(segmentCount);
            const { mood, story } = await continueStoryWithDecision(userInput, segmentCount);
            dispatch(setStoryText({ story, mood }));
            dispatch(addUserChoice(userInput));  // Save user choice
            // playMusic(mood);
        } catch (error) {
            dispatch(setError("Failed to continue the story."));
        } finally {
            dispatch(setLoading(false));
            dispatch(clearError());
        }
    };

    const handleResetStory = () => {
        dispatch(resetStory());
        setHasStoryStarted(false);
    }

    return (
        <div>
            {!hasStoryStarted && (
                <button onClick={handleStartStory} disabled={isLoading}>
                    {isLoading ? 'Starting...' : 'Start Story'}
                </button>
            )}
            {hasStoryStarted && (
                <>
                    <textarea
                        value={userInput}
                        onChange={(e) => dispatch(setUserInput(e.target.value))}
                        placeholder="Your choice..."
                        disabled={segmentCount >= 2}
                    />
                    <button onClick={handleUserInput} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Submit'}
                    </button>
                </>
            )}
            <button onClick={handleResetStory} disabled={isLoading}>
                Reset Story
            </button>
        </div>
    );
};

export default NarrativeController;
