import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setAmountOfCashRegisters, setAmountOfCooks, setCookingStrategy } from '../../redux/reduser/setting';

export function Setting() {
  const dispatch = useDispatch();

  const menu = useCallback((header: string, options: string[], onSelect: (_item: string) => void) => {
    return (
      <div className="menu_block_item" key={header}>
        <h2 className="menu_block_item_heading">{header}</h2>
        <select
          className="menu_block_item_select"
          onChange={(e) => {
            onSelect(e.target.value);
          }}
          defaultValue={options[options.length - 1]}
        >
          {options.map((option) => (
            <option key={option + '' + header} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }, []);

  const menus = useMemo(() => {
    const arr = Array.from({ length: 6 })
      .map((_, i) => i + 1)
      .map(String);

    return [
      menu('Amount of cash registers', arr, (value: string) => {
        dispatch(setAmountOfCashRegisters(value));
      }),
      menu('Amount of cooks', ['1', '2', '3', '4'], (value: string) => {
        dispatch(setAmountOfCooks(value));
      }),
      menu('Cooking strategy', ['1:1', 'm:m'], (value: string) => {
        dispatch(setCookingStrategy(value));
      }),
    ];
  }, [dispatch, menu]);

  return (
    <>
      <div id="settingsWindow" className="settings-container unvisible">
        <div>
          <img className="pizza-bg-image" src="img/bg_pizza_3.png" alt="pizza!" />
          <img className="pizza-bg-image" src="img/bg_pizza_2.svg" alt="pizza!" />
        </div>
        <div className="settings">
          <div className="settings_title shady">
            <h2>Settings</h2>
          </div>
          <div className="settings_decoration">
            <div className="settings-rope shady"></div>
            <div className="settings-rope shady"></div>
          </div>
          <div className="main-settings-menu_block shady">
            {menus}

            <div className="menu_block_items_divider"></div>
            <div className="settings-buttons-panel">
              <button id="cancelSettingsButton" className="button simple-button">
                Cancel
              </button>
              <button id="saveSettingsButton" className="button priority-button">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="mobile-settings-buttons-panel">
          <button id="mobileSaveSettingsButton" className="button priority-button">
            Save
          </button>
          <button id="mobileCancelSettingsButton" className="button simple-button">
            Cancel
          </button>
        </div>
        <div>
          <img className="pizza-bg-image" src="img/bg_pizza_1.svg" alt="pizza!" />
        </div>
      </div>
    </>
  );
}
