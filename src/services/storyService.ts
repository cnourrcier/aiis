import { generateStoryText } from "./openaiService";

// Initial story prompt
export const startStoryPrompt = `
  Begin an engaging and immersive story. Identify the most dominant mood of the generated text from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited. 
  The story should be dynamic, with choices that have clear consequences, leading to either positive or negative outcomes based on the user's decisions. 
  Respond in the following format: '<Mood>. <Story continuation...>' End the story segment with a prompt for the user to make an open-ended choice.`;



// Create a decision prompt based on user input and segment count
export const createDecisionPrompt = (userInput: string, segmentCount: number) => {
    console.log(segmentCount);
    if (segmentCount >= 2) {
        // Climax prompt for the final segment
        return `
          This is the climax of the story. The character has made numerous choices, each with its consequences. Based on the previous decisions, generate a climactic segment that ties together the themes and decisions, leading to a significant and impactful conclusion. 
          ${userInput}.
          Identify the most dominant mood from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited. 
          Respond in the following format: '<Mood>. <Climactic story continuation...>'`;
    } else {
        // Regular prompt with consequences
        return `
          Continue the story based on the following input: "${userInput}". 
          Create a situation where the character's previous choices lead to clear consequences, either positive or negative, depending on the nature of the decision. The story should build tension and anticipation as it moves toward the climax.
          Identify the most dominant mood from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited. 
          Respond in the following format: '<Mood>. <Story continuation...>' Lead the story to a clear decision point with two or more options.`;
    }
};

// Function to start the story
export const startStory = async () => {
    return await generateStoryText(startStoryPrompt);
};

// Function to continue the story based on user input and segment count
export const continueStoryWithDecision = async (userInput: string, segmentCount: number) => {
    console.log(segmentCount);
    const prompt = createDecisionPrompt(userInput, segmentCount);
    return await generateStoryText(prompt);
};