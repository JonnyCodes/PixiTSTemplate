/// <reference path="../states/StateShepard.ts" />

namespace app {

    export class Stage extends PIXI.Container {

        public get width(): number { return this._renderer.width; };
        public get height(): number { return this._renderer.height; };

        public get stateShepard(): StateShepard { return this._stateShepard; };
        private _stateShepard: StateShepard;

        private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

        constructor(renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer, startingState: string) {
            super();

            this._renderer = renderer;

            this._stateShepard = new StateShepard(this, States.getStates());
            this._stateShepard.changeToState(startingState);
        }

        public update(delta: number): void {
            if (this._stateShepard) {
                this._stateShepard.update(delta);
            }
        }
    }
}