/// <reference path="./display/Stage.ts" />

namespace app {

    export class Main {

        private _app: PIXI.Application;
        private _stage: Stage;

        constructor(document: Document) {

            this._app = new PIXI.Application({
                width: 960,
                height: 540,
                backgroundColor: 0xBADA55
            });

            this._stage = new Stage(this._app.renderer, States.PRELOADER_STATE.name);
            this._app.stage.addChild(this._stage);

            document.body.appendChild(this._app.view);

            PIXI.ticker.shared.add(this.update, this);
        }

        private update(delta: number): void {
            this._app.render();
            this._stage.update(delta);
        }
    }

}