import DrawPad from './draw_pad';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');

  new DrawPad(canvas).init();
  const audio = document.getElementById('meditative-tune');
  audio.play();
});

