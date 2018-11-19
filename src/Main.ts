/// <reference path="assets/AssetBundle.ts" />
/// <reference path="states/StateShepard.ts" />
/// <reference path="preloader/PreloaderState.ts" />
/// <reference path="menu/MenuState.ts" />

namespace app {

    export class Main {

        private _app: PIXI.Application;
        private _stateShepard: StateShepard;

        constructor(document: Document) {

            // TODO: need to expose the actual canvas size for easy sprite positioning. (this._app.renderer.width & height)

            this._app = new PIXI.Application({
                width: 960,
                height: 540,
                backgroundColor: 0xBADA55
            });

            document.body.appendChild(this._app.view);

            this._stateShepard = StateShepard.getInstance();
            this._stateShepard.init(this._app.stage, [
                States.PRELOADER_STATE,
                States.MENU_STATE
            ]);
            this._stateShepard.changeToState(States.PRELOADER_STATE.name);

            PIXI.ticker.shared.add(this.update, this);
        }

        private update(delta: number): void {
            if(this._stateShepard) {
                this._stateShepard.update(delta);
            }

            //Render the stage
            this._app.render();
        }
    }

}