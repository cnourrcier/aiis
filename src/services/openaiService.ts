// const mockApiResponse = {
//     id: "chatcmpl-12345", // Unique ID for the completion
//     object: "chat.completion", // Type of response
//     created: 1690456789, // Timestamp of creation
//     model: "gpt-4o-mini", // Model used for generating the response
//     choices: [
//         {
//             index: 0, // Index of the choice (in case there are multiple completions)
//             message: {
//                 role: "assistant",
//                 content: "Excited. \n\nIn the heart of the enchanted forest, there lay a hidden portal that only opened once every century. This was no ordinary portal; it was said to lead to a realm where dreams became reality. As the day of the portal's opening arrived, a young explorer named Elara set out to find it, her heart pounding with excitement and wonder.\n\nElara followed the ancient map she had discovered in an old, dusty book, navigating through the dense trees and overgrown bushes with determination. The air crackled with magic, making her skin tingle with anticipation. Finally, after what felt like a lifetime of searching, she stumbled upon a glimmering archway enveloped in shimmering light.\n\nWith a deep breath, Elara stepped through the portal, feeling a rush of energy coursing through her veins. In an instant, she found herself in a breathtaking realm filled with vibrant colors, whimsical creatures, and endless possibilities. The air was sweet with the scent of blooming flowers, and the sun shone brighter than she had ever seen.\n\nAs Elara gazed around in awe, she realized she had the power to shape this realm with her thoughts and desires. It was a place where imagination reigned supreme, and anything was possible. Overwhelmed with excitement, she wondered what kind of adventures awaited her in this wondrous land.\n\nNow, dear traveler, what path will Elara choose in this fantastical realm of dreams? Will she seek out the wise guardian of the forest for guidance, or will she embark on a daring quest to uncover the secrets hidden within this magical realm? The choice is yours to make..."
//             },
//             finish_reason: "stop" // Indicates why the completion ended
//         }
//     ],
//     usage: {
//         prompt_tokens: 56, // Number of tokens used for the prompt
//         completion_tokens: 250, // Number of tokens in the completion
//         total_tokens: 306 // Total number of tokens used
//     }
// };


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
        // const data = mockApiResponse;

        // Safely split the story string to extract mood and story
        const [mood, ...storyParts] = data.story.split(/\.\s+/);
        // const [mood, ...storyParts] = data.choices[0].message.content.split(/\.\s+/);

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