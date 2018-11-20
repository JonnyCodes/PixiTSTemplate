namespace app {

    export class AnimatedSpriteExtra extends PIXI.extras.AnimatedSprite {

        private _remainingTime: number;

        // Play the movie clip once and stop at the end
        public playOnce(): void {
            this.onComplete = () => {
                this.onComplete = null;
                this.stop();
            };
            this.play();
        }

        // Plays the movie clip once then destroy it
        public playThenRemove(): void {
            this.onComplete = () => {
                this.onComplete = null;
                this.destroy();
            };
            this.play();
        }

        // Plays the movie clip for an amount of time (miliseconds) and then destroy it
        public playThenRemoveAfter(time: number): void {
            this._remainingTime = time;
            PIXI.ticker.shared.add(this.removeAfterFunc, this);
            this.play();
        }

        // Loop the movie clip X times and then destroy it
        public repeatThenRemove(repeatCount: number): void {
            this.onLoop = () => {
                repeatCount--;
                if(repeatCount <= 0) {
                    this.onLoop = null;
                    this.destroy();
                }
            }
            this.play();
        }

        // Removes movieclip from it's parent and destroys it
        public destroy(options?: PIXI.DestroyOptions | boolean): void {
            this.parent.removeChild(this);
            super.destroy(options);
        }

        private removeAfterFunc(delta: number): void {
            this._remainingTime -= delta;

            if (this._remainingTime <= 0) {
                PIXI.ticker.shared.remove(this.removeAfterFunc, this);
                this.destroy();
                this._remainingTime = 0;
            }
        }
    }
}