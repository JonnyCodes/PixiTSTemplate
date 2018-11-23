/// <reference path="./State.ts" />
/// <reference path="../preloader/PreloaderState.ts" />
/// <reference path="../menu/MenuState.ts" />

namespace app {

    export interface IStateMap {
        name: string,
        state: State
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

        public static getStates(): IStateMap[] {
            return [
                States.PRELOADER_STATE,
                States.MENU_STATE
            ]
        }
    }
}