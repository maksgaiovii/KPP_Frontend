/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ISettingProps {}

export function Setting({}: ISettingProps) {
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
            <div className="menu_block_item">
              <h2 className="menu_block_item_heading">Amount of cash registers</h2>
              <select className="menu_block_item_select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="menu_block_item">
              <h2 className="menu_block_item_heading">Amount of cooks</h2>
              <select className="menu_block_item_select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="menu_block_item">
              <h2 className="menu_block_item_heading">Cooking strategy</h2>
              <select className="menu_block_item_select">
                <option value="1:1">1:1</option>
                <option value="m:m">m:m</option>
              </select>
            </div>
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
