import * as THREE from "three";

class ClockScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera();

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
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
