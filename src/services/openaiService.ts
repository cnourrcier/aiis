export interface StoryResponse {
    mood: string;
    characters: string[];
    story: string;
    options: string[];
}

export const generateStoryText = async (prompt: string): Promise<StoryResponse> => {
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

        const data: StoryResponse = await response.json();
        console.log('data object:', data);

        // Ensure mood and story are correctly extracted
        if (!data.mood || !data.story || data.options.length === 0) {
            throw new Error('Unexpected response format from backend');
        }

        return data;
    } catch (error) {
        console.error('Error fetching story from backend:', error);
        throw error;
    }
};


// This module handles all interactions with the OpenAI API, 
// including generating story text and handling the prompt structure.