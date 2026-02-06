import * as THREE from "three";
import { TemperatureDisplay } from "./temperature-display";
import { ScoreCounter } from "./score-counter";
import { SecondsClock } from "./seconds-clock";

// 7 segment display
// 7 bits which represent which segment is active
// 0x0000000
// if ((0x1010000 >> 5) & 1) === true
// toggle emissive value of material dep. on state

class ClockScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();

  private secondsClock: SecondsClock;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.camera.position.set(0, 0, 15);

    this.secondsClock = new SecondsClock();
    this.scene.add(this.secondsClock);
  }

  start() {
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onCanvasResize);
    this.onCanvasResize();
    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);

    this.secondsClock.update();

    this.renderer.render(this.scene, this.camera);
  };

  private onCanvasResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };
}

export const clockScene = new ClockScene();
