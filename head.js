class Head {
    constructor(x, y, width, height, headPos, headAnimation) {
    
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
      this.HeadPosition = headPos;
      this.isBroken=false;
      this.image = loadImage("th(3).jpg");
      this.animation=headAnimation;
      this.speed=0.05;
      World.add(world, this.body);
    }
      animate(){
        this.speed+=0.05;
  
      }
    remove(index) {
      setTimeout(() => {
        Matter.World.remove(world, heads[index].body);
        delete heads[index];
      }, 2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index=floor(this.speed%this.animation.length);
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, this.headPosition, this.width, this.height);
      pop();
    }
  }
  