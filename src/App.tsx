import { useSelector } from 'react-redux';
import { Game } from './module/game/page';
import { Setting } from './module/setting';
import { Welcome } from './module/welcome';
import { selectMenuState } from './redux/reduser/menu';

function App() {
  const appState = useSelector(selectMenuState);

  if (appState === 'playing') {
    return <Game />;
  }

  return (
    <>
      <Welcome />
      <Setting />
    </>
  );
}

export default App;
