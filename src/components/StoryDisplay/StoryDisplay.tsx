import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const StoryDisplay: React.FC = () => {
    const story = useSelector((state: RootState) => state.story.story);
    console.log('story:', story);
    return (
        <div>
            <p>{story}</p>
        </div>
    );
};

export default StoryDisplay;

// This component is responsible for displaying the generated story text to the user.