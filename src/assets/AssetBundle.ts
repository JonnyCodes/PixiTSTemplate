namespace app {

    export interface IAsset {
        name: string;
        url: string;
    }

    export class Asset implements IAsset {
        public get name(): string { return this._name; };
        public get url(): string { return this._url; };
        public get texture(): PIXI.Texture { return PIXI.loader.resources[this._name].texture; };

        private _name: string;
        private _url: string;

        constructor(name: string, url: string) {
            this._name = name;
            this._url = url;
        }
    }

    export class AssetBundle {

        public static SPRITE: Asset = new Asset("sprite", "./assets/sprite.jpg");

        public static getBundle(): IAsset[] {
            return [
                AssetBundle.SPRITE
            ];
        }

    }
}