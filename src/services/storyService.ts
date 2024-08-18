import { generateStoryText } from "./openaiService";


export const generateStoryPrompt = (userInput: string, segmentCount: number) => {
    if (segmentCount === 0) {
        return `
            Begin an engaging and immersive story. Identify the most dominant mood of the generated text from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited.
            As the story unfolds, provide three distinct options for the next steps, each with a different consequence. Each option should be implied through the narrative and no longer than one sentence.
            Respond in the following format:
            '<Mood>. <Story continuation...> 1. <Option 1>. 2. <Option 2>. 3. <Option 3>.'
            Lead the story to a clear decision point with these options.`;
    } else if (segmentCount >= 2) {
        return `
            This is the climax of the story. The character has made numerous choices, each with its consequences. Based on the previous decisions and the accumulated karma score, generate a climactic segment that ties together the themes and decisions, leading to a conclusion directly influenced by the story's karma.
            The karma level should determine the positivity of the outcome, where a higher karma leads to a more positive ending.
            ${userInput}.
            Identify the most dominant mood from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited. 
            Respond in the following format: '<Mood>. <Climactic story continuation...>'`;
    } else {
        return `
            Continue the story based on the following input: "${userInput}". 
            Identify the most dominant mood of the generated text from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited.
            As the story unfolds, provide three distinct options for the next steps, each with a different consequence. Each option should be implied through the narrative and no longer than one sentence.
            Respond in the following format:
            '<Mood>. <Story continuation...> 1. <Option 1>. 2. <Option 2>. 3. <Option 3>.'
            Lead the story to a clear decision point with these options.`;
    }
};

export const generateStory = async (userInput: string, segmentCount: number) => {
    const prompt = generateStoryPrompt(userInput, segmentCount);
    return await generateStoryText(prompt);
};
