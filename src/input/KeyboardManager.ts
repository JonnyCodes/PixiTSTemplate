/// <reference path="./IKeyEvent.ts" />
/// <reference path="./Key.ts" />

namespace app {

    // TODO: Is there a more descriptive name for this class?!
    export class KeyboardManager {

        private _keys: Key[];
        private _onDownListnerFunc: any;
        private _onUpListnerFunc: any;

        constructor() {

            this._keys = [];

            this._onDownListnerFunc = this._onKeyDown.bind(this);
            this._onUpListnerFunc = this._onKeyUp.bind(this);
            window.addEventListener('keydown', this._onDownListnerFunc, true);
            window.addEventListener('keyup', this._onUpListnerFunc, true);
        }

        public listen(keyCode: number, replace: boolean = false): Key {
            let key: Key = new Key(keyCode);

            // If the key is already being listened to then either replace it or return it
            for (let i = this._keys.length - 1; i >= 0; i--) {
                const _key = this._keys[i];
                if (_key.keyCode === keyCode) {
                    if (replace) {
                        _key.destroy();
                        this._keys.splice(i, 1);
                    } else {
                        key = _key;
                    }
                    break;
                }
            }

            this._keys.push(key);

            return key;
        }

        public update(delta: number): void {
            for (let i = this._keys.length - 1; i >= 0; i--) {
                this._keys[i].update(delta);
            }
        }

        public destroy(): void {
            window.removeEventListener('keydown', this._onDownListnerFunc, true);
            window.removeEventListener('keyup', this._onUpListnerFunc, true);

            for (let i = this._keys.length - 1; i >= 0; i--) {
                this._keys[i].destroy();
            }

            this._keys = null;
            this._onDownListnerFunc = null;
            this._onUpListnerFunc = null;
        }

        private _onKeyDown(event: IKeyEvent): void {
            event.preventDefault();

            for (let i = this._keys.length - 1; i >= 0; i--) {
                const key = this._keys[i];
                if (key.keyCode == event.keyCode) {
                    key.onKeyDown(event);
                }
            }
        }
        
        private _onKeyUp(event: any): void {
            event.preventDefault();
            
            for (let i = this._keys.length - 1; i >= 0; i--) {
                const key = this._keys[i];
                if (key.keyCode == event.keyCode) {
                    key.onKeyUp(event);
                }
            }
        }
    }
}