namespace app {

    export interface IAsset {
        name: string;
        url: string;
    }

    export class AssetBundle {

        public static SPRITE: IAsset = {name: "sprite", url: "./assets/sprite.jpg"};

        public static getBundle(): IAsset[] {
            return [
                AssetBundle.SPRITE
            ];
        }

    }
}