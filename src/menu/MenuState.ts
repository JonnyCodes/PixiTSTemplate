/// <reference path="../utils/MathUtil.ts" />
/// <reference path="../assets/AssetBundle.ts" />

namespace app {

    export class MenuState extends State {

        private _sprite: PIXI.Sprite;

        constructor() {
            super();
        }

        public onEnter(): void {
            super.onEnter();

            console.log("ENTER MENU STATE");

            this._sprite = new PIXI.Sprite(AssetBundle.SPRITE.texture);
            this._sprite.pivot = new PIXI.Point(this._sprite.width / 2, this._sprite.height /2);
            this._sprite.x = this.container.width / 2;
            this._sprite.y = this.container.height / 2;
            this.container.addChild(this._sprite);
        }

        public onExit(): void {
            super.onExit();

            console.log("EXIT MENU STATE");
        }

        public update(delta: number): void {
            super.update(delta);

            this._sprite.rotation += MathUtil.degs2Rads(5 * delta);
        }
    }
}