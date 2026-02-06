import * as THREE from "three";
import { DigitDisplay } from "./digit-display";

export class SecondsClock extends THREE.Group {
  private readonly displays: DigitDisplay[];

  constructor() {
    super();

    const left = new DigitDisplay();
    left.position.x = -4;
    const right = new DigitDisplay();
    right.position.x = 4;

    this.displays = [right, left];

    this.add(left, right);
  }

  update() {
    const seconds = Date.now() / 1000;
    this.setSeconds(seconds);
  }

  setSeconds(seconds: number) {
    // score needs to be truncated to a whole number
    const floored = Math.floor(seconds);

    // score needs to be split into individual digits
    const scoreString = floored.toString().split("").reverse();

    // each digit passed to the appropriate display, from right to left
    this.displays.forEach((display, index) => {
      const digit = Number(scoreString[index]);
      display.setState(digit);
    });
  }
}
