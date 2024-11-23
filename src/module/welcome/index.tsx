import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setMenuState } from '../../redux/reduser/menu.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as util from '../../util/js/script.js';

export function Welcome() {
  const dispatch = useDispatch();

  useEffect(() => {
    util.ready();

    document.body.style.background = 'url(img/welcome_page_bg.png)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.height = '100vh';
  }, []);

  return (
    <>
      <div id="welcomeWindow" className="welcome-container">
        <div className="welcome">
          <img className="mobile-pizza-icon" src="img/bg_pizza_3.png" alt="pizza!" />
          <h1 className="welcome_heading">Pizza simulator</h1>
          <div className="title_divider"></div>
          <span className="welcome_description">Plunge into the world of pizza! Cook, experiment, enjoy!</span>
          <div className="buttons-panel">
            <button
              className="button priority-button"
              onClick={() => {
                dispatch(setMenuState('playing'));
              }}
            >
              Start
            </button>
            <div className="button_divider"></div>
            <button id="goToSettingsButton" className="button simple-button">
              Setting
            </button>
          </div>
        </div>
        <div className="pizza-animation">
          <div className="pizza-animation_block">
            <img className="pizza-animation_gif-image" src="img/pizza_gif.gif" alt="There should be pizza here" />
          </div>
        </div>
      </div>
    </>
  );
}
