let playing = false;

class Heart extends mojs.CustomShape {
  getShape () {
      return '<path d="M79.8226133,31.1716767 C71.2668462,22.7128894 57.4418472,22.7128894 48.8860801,31.1716767 L45.1254217,34.910784 C43.9939916,36.0098876 42.1837033,36.0206631 41.0522732,34.889233 L41.0522732,34.889233 L37.3023903,31.1716767 C28.7789498,22.7128894 14.9323997,22.7128894 6.40895921,31.1716767 C-2.13603238,39.6520152 -2.13603238,53.3800345 6.40895921,61.8280463 L25.686374,80.9653793 C25.686374,80.9761548 25.6971496,80.9761548 25.6971496,80.9869304 L37.2916148,92.4844159 C40.4919458,95.6739714 45.6857491,95.6739714 48.8860801,92.4844159 L60.4913209,80.9869304 C60.4913209,80.9869304 60.4913209,80.9761548 60.5020964,80.9761548 L79.8226133,61.8280463 C88.3352783,53.3800345 88.3352783,39.6520152 79.8226133,31.1716767 L79.8226133,31.1716767 Z"></path>';
  }
  getLength () { return 200; }
}
mojs.addShape( 'heart', Heart );

const burst = new mojs.Burst({
  count:    30,
  radius:   { 50: 250 },
  left: 0,
  top: 0,
  children: {
    delay: 1000,
    opacity: 0.7,
    fill:   'white',
    shape:  'heart',
    stroke: [ 'pink', 'red' ],
    strokeWidth: 12, 
    radius: 'rand(10, 25)',
    scale: { 1: 0 },
    pathScale: 'rand(.5, 1)',
    isForce3d: true,
    degreeShift: 'rand(-360, 360)',
    duration: 1000
  }
});

const burstAfter = new mojs.Burst({
  count: 15,
  radius: { 0: 100 },
  left: 0,
  top: 0,
  children: {
    delay:      1300,
    shape:      'polygon',
    fill:       { '#ff0080' : 'cyan' },
    radius:     10,
    angle:      { 360: 0 },
    duration:   2000
  },
  onStart (isForward, isYoyo) {
    $('img').addClass('white-out');
  },
  onComplete (isForward, isYoyo) {
    playing = false;
  },
});

const pop = new mojs.Shape({
  fill:     'pink',
  scale:    { .2: 1 },
  opacity: { 1: 0 },
  isForce3d: true,
  isShowEnd: false,
  shape: 'heart',
  radius: 'rand(120,240)',
  easing: 'cubic.out',
  angle: 'rand(-40, 40)',
  x: 20,
  left: 0,
  top: 0,
  delay: 900,
  duration: 1500
});

const firework = new mojs.Shape({
  isShowEnd: false,
  fill: 'white',
  left: 0,
  top: 0,
  radius: 10,
  scale: { 1: 0.2 },
  x: { 0: 100 },
  y: { 0: 100 },
  duration: 1000,
  easing: 'cubic.out'
});

document.addEventListener( 'click', function (e) {
  if (playing) {
    return;
  }
  
  playing = true;
  
  $('.ins').fadeOut();
  $('.mes').delay(700).fadeIn();
  $('.people').delay(700).fadeIn();
  
  const rotation = () => Math.floor(Math.random() * 20);
  const degreeShift = () => {
    let temp = Math.floor(Math.random() * 360) + 1;
    return temp *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
  }
  
  firework
    .tune({
      x: { [window.innerWidth/2] : e.pageX },
      y: { [window.innerHeight] : e.pageY }
    })
    .replay();
  
  burst
    .tune({
      x: e.pageX,
      y: e.pageY,
      children: { degreeShift: degreeShift() }
    })
    .replay();
  
  pop
    .tune({ x: e.pageX, y: e.pageY, angle: rotation()  })
    .replay();
  
  burstAfter
    .tune({ x: e.pageX, y: e.pageY  })
    .replay();
  
});


// sky
const c = document.getElementById('star-sky');
const ctx = c.getContext('2d');
const x = c.width = window.innerWidth;
const y = c.height = window.innerHeight;
const nStar = Math.round((x + y)/5);
const randomSize = Math.floor((Math.random()*2)+1);

const stars = [];
function createStars() {
    'use strict';
    stars = [];
    for(var i=0; i<=nStar; i++) {
        stars.push({
            x: Math.random() * x,
            y: Math.random() * y,
            o: Math.random(),
            r: Math.random(),
            s: 0.02,
        })
        if(randomSize>.1) {
            ctx.shadowBlur = Math.floor((Math.random()*15));
            ctx.shadowColor = "white";
        }
    }
}

function drawing() {
    'use strict';
    requestAnimationFrame(drawing);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(var i=0; i<=nStar; i++) {
        var e = stars[i];
        if (e.o > 1 || e.o < 0) {
            e.s = -e.s;
        } 
        e.o += e.s;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI*2, false);
        ctx.strokeStyle = 'rgba(255, 255, 255, '+e.o+')';
        ctx.stroke();
    }
}
window.onload = function () {
    createStars();
    drawing();
};
