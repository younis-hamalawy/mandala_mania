class DrawPad {
  constructor(canvas) {
    this.canvas = canvas;
    this.index = 0;
    this.colors = [
      '#828b20',
      '#b0ac31',
      '#cbc53d',
      '#fad779',
      '#f9e4ad',
      '#faf2db',
      '#563512',
      '#9b4a0b',
      '#d36600',
      '#fe8a00',
      '#f9a71f',
    ];
    this.oldPt;
    this.oldMidPt;
    this.title;
    this.color;
    this.stroke;
    this. colors;
    this. index;
  }

  init() {
    this.stage = new createjs.Stage('canvas');
    // Create a Shape DisplayObject.
    createjs.Touch.enable(this.stage);
    // enable touch on Shape
    this.stage.enableDOMEvents(true);
    // enable dom event handlers for the stage
    // stage.Ticker.setFPS(24);
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill('black').drawCircle(255, 255, 255);
    // Set position of Shape instance.
    this.circle.x = this.circle.y = 70;
    // Add Shape instance to stage display list.
    this.stage.addEventListener('stagemousedown', this.MouseDown);
    // Add event listener for the stage
    this.stage.addEventListener('stagemouseup', this.MouseUp);
    // Remove event listener for the stage
    this.title = new createjs.Text('Click and Drag to draw', '36px Arial', '#777777');
    this.title.x = 300;
    this.title.y = 200;
    this.stage.addChild(this.title);
    // this.stage.addChild(this.circle);
    // Update stage will render next frame
    this.stage.update();
  }

  MouseDown(event) {
    if (!event.primary) {
      return;
    }
    if (this.stage.contains(this.title)) {
      this.stage.clear();
      this.stage.removeChild(this.title);
    }
    this.color = this.colors[index++ % colors.length];
    this.stroke = (Math.random() * 30 + 10) | 0;
    this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
    this.oldMidPt = oldPt.clone();
    this.stage.addEventListener('stagemousemove', MouseMove);
  }

  MouseMove(event) {
    if (!event.primary) {
      return;
    }
    const midPt = new createjs.Point((oldPt.x + stage.mouseX) >> 1, (oldPt.y + stage.mouseY) >> 1);

    this.drawingCanvas.graphics
      .clear()
      .setStrokeStyle(this.stroke, 'round', 'round')
      .beginStroke(this.color)
      .moveTo(this.midPt.x, this.midPt.y)
      .curveTo(this.oldPt.x, this.oldPt.y, this.oldMidPt.x, this.oldMidPt.y);

    this.oldPt.x = this.stage.mouseX;
    this.oldPt.y = this.stage.mouseY;

    this.oldMidPt.x = this.midPt.x;
    this.oldMidPt.y = this.midPt.y;

    this.stage.update();
  }

  MouseUp(event) {
    if (!event.primary) {
      return;
    }
    this.stage.removeEventListener('stagemousemove', MouseMove);
  }
}
export default DrawPad;
