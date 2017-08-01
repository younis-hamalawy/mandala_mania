class DrawPad {

  constructor(canvas) {
    this.canvas = canvas;
  }

  init() {
    this.stage = new createjs.Stage('canvas');
    // Create a Shape DisplayObject.
    createjs.Touch.enable(this.stage);
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill('blue').drawCircle(255, 255, 255);
    // Set position of Shape instance.
    this.circle.x = this.circle.y = 70;
    // Add Shape instance to stage display list.
    this.stage.addChild(this.circle);
    // Update stage will render next frame
    this.stage.update();
  }
}

export default DrawPad;
