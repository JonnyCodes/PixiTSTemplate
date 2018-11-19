/// <reference path="./State.ts" />
/// <reference path="../preloader/PreloaderState.ts" />
/// <reference path="../menu/MenuState.ts" />

namespace app {

    export interface IStateMap {
        name: string,
        state: IState
    }

    export class States {

        public static PRELOADER_STATE: IStateMap = {
            name: "PreloaderState",
            state: new PreloaderState()
        }

        public static MENU_STATE = {
            name: "MenuState",
            state: new MenuState()
        }
    }
}