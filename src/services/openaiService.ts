export const generateStoryText = async (prompt: string): Promise<{ mood: string; story: string }> => {
    try {
        const response = await fetch('http://localhost:3000/generate-story', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error:', error);
            throw new Error('Failed to generate story text.');
        }

        const data = await response.json();
        console.log(data);
        // Safely split the story string to extract mood and story
        const [mood, ...storyParts] = data.story.split(/\.\s+/);

        // Ensure mood and story are correctly extracted
        if (!mood || storyParts.length === 0) {
            throw new Error('Unexpected response format from backend');
        }

        const story = storyParts.join('. ').trim();

        return { mood, story };
    } catch (error) {
        console.error('Error fetching story from backend:', error);
        throw error;
    }
};


// This module handles all interactions with the OpenAI API, 
// including generating story text and handling the prompt structure.