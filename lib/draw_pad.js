import { rotation } from './math';

class DrawPad {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;

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
    this.MouseDown = this.MouseDown.bind(this);
    this.MouseUp = this.MouseUp.bind(this);
    this.MouseMove = this.MouseMove.bind(this);
  }

  init() {
    this.stage = new createjs.Stage('canvas');
    // Create a Shape DisplayObject.
    this.index = 0;
    this.axes = 6;
    createjs.Touch.enable(this.stage);
    // enable touch on Shape
    // this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
    this.stage.enableDOMEvents(true);
    // enable dom event handlers for the stage
    // this.stage.Ticker.setFPS(24);
    this.drawArea = new createjs.Shape();
    // this.circle.graphics.beginFill('black').drawCircle(255, 255, 255);
    // Set position of Shape instance.
    // this.circle.x = this.circle.y = 70;
    // Add Shape instance to stage display list.
    this.stage.addEventListener('stagemousedown', this.MouseDown);
    // Add event listener for the stage
    this.stage.addEventListener('stagemouseup', this.MouseUp);
    // Remove event listener for the stage
    this.title = new createjs.Text('Click and Drag to draw', '36px Arial', '#777777');
    this.title.x = 300;
    this.title.y = 200;
    this.stage.addChild(this.title);
    this.stage.addChild(this.drawArea);
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
    this.color = this.colors[this.index++ % this.colors.length];
    this.stroke = 5;
    this.oldPt = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
    this.oldMidPt = this.oldPt.clone();

    for (let i = 1; i < this.axes + 1; i++) {
      const { x: x1, y: y1 } = rotation(this.stage.mouseX, this.stage.mouseY, i, this.axes);
      this.drawArea.graphics
        .setStrokeStyle(1)
        .beginStroke(this.color)
        .beginFill(this.color)
        .drawCircle(x1, y1, this.stroke >> 1);
    }
    this.stage.addEventListener('stagemousemove', this.MouseMove);
    this.stage.update();
  }

  MouseMove(event) {
    if (!event.primary) {
      return;
    }
    this.midPt = new createjs.Point((this.oldPt.x + this.stage.mouseX) >> 1, (this.oldPt.y + this.stage.mouseY) >> 1);

    this.drawArea.graphics
      // .clear()
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
    this.stage.removeEventListener('stagemousemove', this.MouseMove);
  }
}
export default DrawPad;
