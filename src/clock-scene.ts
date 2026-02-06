import * as THREE from "three";
import { Display } from "./display";

// 7 segment display
// 7 bits which represent which segment is active
// 0x0000000
// if ((0x1010000 >> 5) & 1) === true
// toggle emissive value of material dep. on state

class ClockScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();

  private display: Display;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera.position.set(0, 0, 15);

    this.display = new Display();
    this.scene.add(this.display);
  }

  start() {
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onCanvasResize);
    this.onCanvasResize();
    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);

    this.renderer.render(this.scene, this.camera);
  };

  private onCanvasResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };
}

export const clockScene = new ClockScene();
