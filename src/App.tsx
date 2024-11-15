import { Welcome } from './module/welcome';
import { Setting } from './module/setting';
import { useSelector } from 'react-redux';
import { selectMenuState } from './redux/reduser/menu';
import { Game } from './module/game/page';

function App() {
  const appState = useSelector(selectMenuState);
  console.log('appState', appState);

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
