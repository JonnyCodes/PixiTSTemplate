namespace app {

    export class Stage extends PIXI.Application {

        public get width(): number { return this.renderer.width; }
        public get height(): number { return this.renderer.height; }

        constructor(options: PIXI.ApplicationOptions) {
            super(options);
        }

        public addChild<T extends PIXI.DisplayObject>(child: T): T {

            return this.stage.addChild<T>(child);
        }

        public removeChild(child: PIXI.DisplayObject): PIXI.DisplayObject {

            return this.stage.removeChild(child);
        }
    }
}