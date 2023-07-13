const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ram;
var ravan;
var head;
var ravarCry;
var arImg

var ramImg;
var ravanImg;
var headImg;
var jungle;
var cry;
var go;
var tg;
var arrow;
var mount;
var mImg;

var heads = [];
var boats = [];

var score = 0;
var boatAnimation=[];
var boatSpriteData,boatSpriteSheet;
var brokenBoatAnimation=[];
var brokenBoatSpriteData,brokenBoatSpriteSheet;

function preload(){
  ramImg=loadImage("th.jpg");
  ravanImg=loadImage("th(2).jpg");
  headImg=loadImage("th(3).jpg");
  jungleImg=loadImage("th(1).jpg");
  cryImg=loadImage("th(4).jpg");
  goImg=loadImage("th(5).jpg");
  tyImg=loadImage("th(6).jpg");
  arImg=loadImage("th(7).jpg");
  mImg=loadImage("th(7).jpg");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15


  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  mount = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, mount);

  ram = new Ram(180, 110, 130, 100, angle);

  var headFrames=headSpriteData.frames;
  for(var i=0;i<headFrames.length;i++){
   var pos=headFrames[i].position;
   var img=headSpriteSheet.get(pos.x,pos.y,pos.w,pos.h);
   headImage.push(img);
  }

  }


function draw() {
  background(189);
  image(jungleImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
  translate(tower.position.x, tower.position.y);
  rotate(tower.angle);
  imageMode(CENTER);
  image(towerImage, 0, 0, 160, 310);
  pop();

  showBoats();

  for (var i = 0; i < heads.length; i++) {
    showRanHeads(heads[i], i);
    collisionWithhead(i);
  }

  ram.display();


}

function collisionWithHead(index) {
  for (var i = 0; i < heads.length; i++) {
    if (heads[index] !== undefined && heads[i] !== undefined) {
      var collision = Matter.SAT.collides(heads[index].body, heads[i].body);

      if (collision.collided) {
        heads[i].remove(i);

        Matter.World.remove(world, heads[index].body);
        delete heads[index];
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var ramHead = new Head(ram.x, ram.y);
    ramHead.trajectory = [];
    Matter.Body.setAngle(ramHead.body, ram.angle);
    heads.push(RamHead);
  }
}

function showRamHeads(head, index) {
  if (head) {
    head.display();
    if (head.body.position.x >= width || head.body.position.y >= height - 50) {
      head.remove(index);
    }
  }
}

function showHeads() {
  if (heads.length > 0) {
    if (
      heads[heads.length - 1] === undefined ||
      heads[heads.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var head = new Head(width, height - 100, 170, 170, position,headImage);

      heads.push(head);
    }

    for (var i = 0; i < heads.length; i++) {
      if (heads[i]) {
        Matter.Body.setVelocity(heads[i].body, {
          x: -0.9,
          y: 0
        });

        heads[i].display();
        heads[i].animate();
      } else {
        heads[i];
      }
    }
  } else {
    var head = new Head(width, height - 60, 170, 170, -60, headimage);
    heads.push(head);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    arrows[arrows.length - 1].shoot();
  }
}