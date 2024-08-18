import { generateStoryText, StoryResponse } from "./openaiService";

interface StoryStage {
    description: string;
    stage: string;
    promptTemplate: (characters: string[], previousStory: string) => string;
}

const storyStructure: StoryStage[] = [
    {
        stage: "Exposition",
        description: "Introduction of Characters, Setting, and Initial Situation.",
        promptTemplate: (characters, previousStory) => `
            Introduce the main characters: ${characters.join(', ')}.
            Establish the setting and the initial situation.
            Pretend to be a bestselling fiction author. Begin the story by describing the normal world or status quo before the inciting incident.
            Respond with a JSON object in the following format: 
            {
                "mood": "{Mood}", 
                "characters": ["{Character1}", "{Character2}"], 
                "story": "{Story}", 
                "options": ["{Option1}", "{Option2}", "{Option3}"]
            }
        `
    },
    {
        stage: "Inciting Incident",
        description: "Trigger Event that disrupts the normal world and sets the story in motion.",
        promptTemplate: (characters, previousStory) => `
            ${previousStory}
            Something unexpected happens that disrupts the normal world of ${characters.join(', ')}.
            This event introduces the central conflict or problem that the protagonist must face.
            Pretend to be a bestselling fiction author. Describe the inciting incident and how it affects the characters.
            Respond with a JSON object in the following format: 
            {
                "mood": "{Mood}", 
                "characters": ["{Character1}", "{Character2}"], 
                "story": "{Story}", 
                "options": ["{Option1}", "{Option2}", "{Option3}"]
            }
        `
    },
    {
        stage: "Rising Action",
        description: "Development of Conflict and Subplots.",
        promptTemplate: (characters, previousStory) => `
            ${previousStory}
            The protagonist begins to face challenges or obstacles.
            Develop the main conflict and introduce any subplots.
            The stakes get higher, and tension builds as ${characters.join(', ')} work towards their goal.
            Pretend to be a bestselling fiction author. 
            Respond with a JSON object in the following format: 
            {
                "mood": "{Mood}", 
                "characters": ["{Character1}", "{Character2}"], 
                "story": "{Story}", 
                "options": ["{Option1}", "{Option2}", "{Option3}"]
            }
        `
    },
    {
        stage: "Climax",
        description: "Turning Point where the main conflict reaches its peak.",
        promptTemplate: (characters, previousStory) => `
            ${previousStory}
            The main conflict reaches its peak, and the protagonist faces the greatest challenge.
            Describe the turning point where ${characters.join(', ')} must make a critical decision.
            This decision will determine the direction of the story and the outcome of the conflict.
            Pretend to be a bestselling fiction author.
            Respond with a JSON object in the following format: 
            {
                "mood": "{Mood}", 
                "characters": ["{Character1}", "{Character2}"], 
                "story": "{Story}", 
                "options": ["{Option1}", "{Option2}", "{Option3}"]
            }
        `
    },
    {
        stage: "Falling Action and Resolution",
        description: "Aftermath of the Climax, Conflict Resolution, and Conclusion.",
        promptTemplate: (characters, previousStory) => `
            ${previousStory}
            The story begins to wind down, showing the consequences of the climax.
            Describe how the main conflict is resolved and how it affects ${characters.join(', ')}.
            Conclude the story, establishing a new status quo or normalcy.
            Reflect on the events of the story and their impact on ${characters.join(', ')}.
            Pretend to be a bestselling fiction author.
            Respond with a JSON object in the following format: 
            {
                "mood": "{Mood}", 
                "characters": ["{Character1}", "{Character2}"], 
                "story": "{Story}"
            }
        `
    }
];



const getCurrentStage = (segmentCount: number): StoryStage => {
    const stageIndex = Math.min(segmentCount, storyStructure.length - 1);
    return storyStructure[stageIndex];
};


const generateStoryPrompt = (segmentCount: number, characters: string[], previousStory: string) => {
    const currentStage = getCurrentStage(segmentCount);
    return currentStage.promptTemplate(characters, previousStory);
};

export const generateStory = async (segmentCount: number, characters: string[], previousStory: string): Promise<StoryResponse> => {
    const prompt = generateStoryPrompt(segmentCount, characters, previousStory);
    const response = await generateStoryText(prompt);
    return response;
};
















// import { generateStoryText } from "./openaiService";


// export const generateStoryPrompt = (userInput: string, segmentCount: number) => {
//     if (segmentCount === 0) {
//         return `
//             Begin an engaging and immersive story. Identify the most dominant mood of the generated text from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited.
//             As the story unfolds, provide three distinct options for the next steps, each with a different consequence. Each option should be implied through the narrative and no longer than one sentence.
//             Respond in the following format:
//             '<Mood>. <Story continuation...> 1. <Option 1>. 2. <Option 2>. 3. <Option 3>.'
//             Lead the story to a clear decision point with these options.`;
//     } else if (segmentCount >= 2) {
//         return `
//             This is the climax of the story. The character has made numerous choices, each with its consequences. Based on the previous decisions and the accumulated karma score, generate a climactic segment that ties together the themes and decisions, leading to a conclusion directly influenced by the story's karma.
//             The karma level should determine the positivity of the outcome, where a higher karma leads to a more positive ending.
//             ${userInput}.
//             Identify the most dominant mood from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited. 
//             Respond in the following format: '<Mood>. <Climactic story continuation...>'`;
//     } else {
//         return `
//             Continue the story based on the following input: "${userInput}". 
//             Identify the most dominant mood of the generated text from the following list: Calm, Tense, Joyful, Mysterious, Sad, Excited.
//             As the story unfolds, provide three distinct options for the next steps, each with a different consequence. Each option should be implied through the narrative and no longer than one sentence.
//             Respond in the following format:
//             '<Mood>. <Story continuation...> 1. <Option 1>. 2. <Option 2>. 3. <Option 3>.'
//             Lead the story to a clear decision point with these options.`;
//     }
// };

// export const generateStory = async (userInput: string, segmentCount: number) => {
//     const prompt = generateStoryPrompt(userInput, segmentCount);
//     return await generateStoryText(prompt);
// };
