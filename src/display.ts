import * as THREE from "three";

function convertDigitToDisplayBits(digit: number) {
  switch (digit) {
    case 0:
      return 0b1110111;
    case 1:
      return 0b0010010;
    case 2:
      return 0b1011101;
    case 3:
      return 0b1011011;
    case 4:
      return 0b0111010;
    case 5:
      return 0b1101011;
    case 6:
      return 0b1101111;
    case 7:
      return 0b1010010;
    case 8:
      return 0b1111111;
    case 9:
      return 0b1111010;
    default:
      throw new Error("Not a single digit");
  }
}

export class Display extends THREE.Group {
  // top, topLeft, topRight, middle, botLeft, botRight, bot
  private displayState = 0b0000000;

  declare children: THREE.Mesh[];

  constructor() {
    super();

    const width = 1;

    const length = 2;
    const taper = width * 0.5;

    const gap = 0.2;

    const top = this.makeSegment(length, width, taper);
    top.position.set(0, width + length * 2 + gap + gap, 0);
    top.name = "top";

    const topLeft = this.makeSegment(length, width, taper);
    topLeft.position.set(-length - taper - gap, length + taper + gap, 0);
    topLeft.rotation.set(0, 0, Math.PI * 0.5);
    topLeft.name = "top-left";

    const topRight = this.makeSegment(length, width, taper);
    topRight.position.set(length + taper + gap, length + taper + gap, 0);
    topRight.rotation.set(0, 0, -Math.PI * 0.5);
    topRight.name = "top-right";

    const middle = this.makeSegment(length, width, taper);
    middle.name = "middle";

    const botLeft = this.makeSegment(length, width, taper);
    botLeft.position.set(-length - taper - gap, -length - taper - gap, 0);
    botLeft.rotation.set(0, 0, Math.PI * 0.5);
    botLeft.name = "bot-left";

    const botRight = this.makeSegment(length, width, taper);
    botRight.position.set(length + taper + gap, -length - taper - gap, 0);
    botRight.rotation.set(0, 0, -Math.PI * 0.5);
    botRight.name = "bot-right";

    const bot = this.makeSegment(length, width, taper);
    bot.name = "bot";
    bot.position.set(0, -width - length * 2 - gap - gap, 0);

    this.add(top, topLeft, topRight, middle, botLeft, botRight, bot);
    this.children.reverse();

    this.displayState = convertDigitToDisplayBits(1);

    this.children.forEach((child, i) => {
      const isActive = ((this.displayState >>> i) & 1) === 1;

      const intensity = isActive ? 1 : 0.1;

      (child.material as THREE.MeshStandardMaterial).emissiveIntensity =
        intensity;
    });
  }

  private makeSegment(length: number, width: number, taper: number) {
    // prettier-ignore
    const vertices = [  
          -length - taper, 0, 0, // far left taper point
          -length, -width * 0.5, 0, // bottom left point
          -length, width * 0.5, 0, // top left point
          //
          -length, width * 0.5, 0, // top left
          -length, -width * 0.5, 0, // bot left
          length, width * 0.5, 0, // top right
          //
          length, width * 0.5, 0, // top right
          -length, -width * 0.5, 0,  // bot left
          length, -width * 0.5, 0, // bot right
          //
          length, width * 0.5, 0, // top right
          length, -width * 0.5, 0, // bot right,
          length + taper, 0, 0, // far right taper point
        ];

    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(vertices);
    const positionAttrib = new THREE.BufferAttribute(positionArray, 3);
    geometry.setAttribute("position", positionAttrib);

    const segment = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({
        emissiveIntensity: 0.1,
        emissive: "white",
      }),
    );

    return segment;
  }
}
