src/
├── components/                  # React components
│   ├── NarrativeController.tsx  # Component for handling user input and story progression
│   ├── StoryDisplay.tsx         # Component for displaying the story
│   └── MusicPlayer.tsx          # Component for playing and managing music
├── services/                    # Service modules for API calls and logic
│   ├── openaiService.ts         # Functions for interacting with the OpenAI API
│   ├── musicService.ts          # Functions for managing and triggering music
│   └── storyService.ts          # Functions for generating story prompts and handling decisions
├── hooks/                       # Custom React hooks
│   └── useStory.ts              # Custom hook for managing story state and logic
├── App.tsx                      # Main application component
└── index.tsx                    # Entry point for the application
