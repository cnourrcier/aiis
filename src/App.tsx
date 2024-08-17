import NarrativeController from './components/NarrativeController/NarrativeController';
import StoryDisplay from './components/StoryDisplay/StoryDisplay';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';

const App: React.FC = () => {

  return (
    <div>
      <h1>Interactive StoryTelling</h1>
      <ErrorDisplay />
      <NarrativeController />
      <StoryDisplay />
    </div>
  )
}

export default App
