/// <reference path="assets/AssetBundle.ts" />

namespace app {

    export class Main {

        private _app: PIXI.Application;

        constructor(document: Document) {

            this._app = new PIXI.Application({
                width: 960,
                height: 540,
                backgroundColor: 0xBADA55
            });

            document.body.appendChild(this._app.view);

            const loader = PIXI.loader;
            loader.add(AssetBundle.getBundle());

            loader.load(this.onLoaded.bind(this));
        }

        private onLoaded(): void {
            let sprite = new PIXI.Sprite(PIXI.loader.resources[AssetBundle.SPRITE.name].texture);
            this._app.stage.addChild(sprite);
        }
    }

}