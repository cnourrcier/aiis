import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { generateStory } from '../../services/storyService';
// import { playMusic } from '../../services/musicService';
import { setStoryText, resetStory, adjustKarma } from '../../store/storySlice';
import { setUserInput } from '../../store/userSlice';
import { setLoading } from '../../store/loadingSlice';
import { setError, clearError } from '../../store/errorSlice';

const NarrativeController: React.FC = () => {
    const dispatch = useDispatch();
    const userInput = useSelector((state: RootState) => state.user.userInput);
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const segmentCount = useSelector((state: RootState) => state.story.segmentCount);
    const [options, setOptions] = useState<string[]>([]);
    const [hasStoryStarted, setHasStoryStarted] = useState(false);

    const handleStartStory = async () => {
        handleUserInput();
        setHasStoryStarted(true);
    };

    const handleUserInput = async () => {
        dispatch(setLoading(true));
        try {
            const { mood, story } = await generateStory(userInput, segmentCount);

            // Extract options from the story
            const options = story.match(/\d\.\s[^\d]+/g)?.map(option => option.trim()) || [];

            setOptions(options);
            console.log('Options set:', options)

            dispatch(setStoryText({ story, mood }));
            // playMusic(mood);
        } catch (error) {
            dispatch(setError("Failed to continue the story."));
        } finally {
            dispatch(setLoading(false));
            dispatch(clearError());

            if (segmentCount >= 2) {
                console.log('Story reached its climax.');
            }
        }
    };

    const handleOptionSelection = async (optionIndex: number) => {
        if (optionIndex === 0) {
            dispatch(adjustKarma(-1)); // Negative karma
        } else if (optionIndex === 2) {
            dispatch(adjustKarma(1)); // Positive karma
        }
        dispatch(setUserInput(options[optionIndex]));
        await handleUserInput(); // Continue the story after selection
    }

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
            {hasStoryStarted && options.length > 0 && (
                <>
                    <div>
                        {
                            options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelection(index)}
                                    disabled={isLoading}
                                >
                                    {option}
                                </button>
                            ))
                        }
                    </div>
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
