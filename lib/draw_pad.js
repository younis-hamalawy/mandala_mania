
class DrawPad {
  constructor(canvas) {
    this.canvas = canvas;
    // this.context = canvas.getContext('2d');
    this.canvas_width = canvas.width;
    this.canvas_height = canvas.height;
    this.stroke = 3;
    this.colors = [
      '#ff3311',
      '#69d025',
      '#ccbb33',
      '#ff4422',
      '#12bdb9',
      '#ff6644',
      '#442299',
      '#ff9933',
      '#feae2d',
      '#d0c310',
      '#aacc22',
      '#22ccaa',
      '#11aabb',
      '#4444dd',
      '#3311bb',
    ];
    this.MouseDown = this.MouseDown.bind(this);
    this.MouseUp = this.MouseUp.bind(this);
    this.MouseMove = this.MouseMove.bind(this);
    this.init = this.init.bind(this);
    this.getPos = this.getPos.bind(this);
    this.reset = this.reset.bind(this);
    this.change = this.change.bind(this);
    document.getElementById('reset').onclick = this.reset;
    document.getElementById('pointer-size').oninput = this.change('stroke');
    document.getElementById('axes').oninput = this.change('axes');
  }

  init() {
    this.stage = new createjs.Stage('canvas');
    // Create a Shape DisplayObject.
    this.index = 0;
    this.axes = 12;
    createjs.Touch.enable(this.stage);
    // enable touch on Shape
    this.stage.setTransform(this.canvas.width / 2, this.canvas.height / 2);
    this.stage.scaleY = -1;
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
    // this.title = new createjs.Text('Click and Drag to draw', '36px Arial', '#777777');
    // this.title.x = -180;
    // this.title.y = 0;
    // this.stage.addChild(this.title);
    this.stage.addChild(this.drawArea);
    // Update stage will render next frame
    this.stage.update();
  }

  reset() {
    this.stage.clear();
    this.stage.removeChildAt(this.stage.children.length - 1);
    this.drawArea = new createjs.Shape();
    this.stage.addChild(this.drawArea);
    this.stage.update();
  }

  change(value) {
    return (event) => {
      this[value] = event.currentTarget.value;
      if (value === 'stroke') {
        document.getElementById('pointer-size').innerHTML = this.stroke;
      } else if (value === 'axes') {
        document.getElementById('axes').value = this.axes;
      }
      } else if (value === 'axes') {
        document.getElementById('axes').value = this.axes;
      }
    };
  }


  getPos(e) {
    const rectangle = this.canvas.getBoundingClientRect();
    return {
      x: this.stage.mouseX - this.canvas_width / 2,
      y: -this.stage.mouseY + this.canvas_height / 2,
    };
  }

  MouseDown(event) {
    if (!event.primary) {
      return;
    }
    if (this.stage.contains(this.title)) {
      this.stage.clear();
      this.stage.removeChild(this.title);
    }
    const { x: mouseX, y: mouseY } = this.getPos(event);
    this.color = this.colors[this.index++ % this.colors.length];

    this.oldPt = new createjs.Point(mouseX, mouseY);
    this.oldMidPt = this.oldPt.clone();

    for (let i = 1; i < this.axes + 1; i++) {
      const { x: x1, y: y1 } = this.rotate(mouseX, mouseY, i, this.axes);
      this.drawArea.graphics
        .setStrokeStyle(this.stroke, 'round', 'round')
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
    const createjs = window.createjs;
    const { x: mouseX, y: mouseY } = this.getPos(event);
    this.midPt = new createjs.Point((this.oldPt.x + mouseX) >> 1, (this.oldPt.y + mouseY) >> 1);

    this.drawArea.graphics;
    // .clear();
    for (let i = 1; i < this.axes + 1; i++) {
      const { x: x1, y: y1 } = this.rotate(this.midPt.x, this.midPt.y, i, this.axes);
      const { x: x2, y: y2 } = this.rotate(this.oldPt.x, this.oldPt.y, i, this.axes);
      const { x: x3, y: y3 } = this.rotate(this.oldMidPt.x, this.oldMidPt.y, i, this.axes);
      this.drawArea.graphics
        .setStrokeStyle(this.stroke, 'round', 'round')
        .beginStroke(this.color)
        .moveTo(x1, y1)
        .curveTo(x2, y2, x3, y3);
    }

    this.oldPt.x = mouseX;
    this.oldPt.y = mouseY;

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

  rotate(x, y, i, axes) {
    return {
      x: x * Math.cos(2 * i * Math.PI / axes) - y * Math.sin(2 * i * Math.PI / axes),
      y: x * Math.sin(2 * i * Math.PI / axes) + y * Math.cos(2 * i * Math.PI / axes),
    };
  }
}
export default DrawPad;
