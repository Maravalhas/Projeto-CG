//Canvas Indentity
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

let X = 0
let Y = 0


export default class Model {

    constructor(){

        this.movingLeftImages = []
        
        this.movingRightImages = []

        this.attackLeftImages = []

        this.attackRightImages = []

        this.idleImages = []

        this.setImages()

        this.background = new Image()
        this.background.src= "../background.jpg"

        this.activeImages = []
    }

    setImages(){

        //idle

            this.idleImages[1] = new Image()
            this.idleImages[1].src = `../sprites/idle/idle-left.png`

            this.idleImages[2] = new Image()
            this.idleImages[2].src = `../sprites/idle/idle-right.png`

        //moving

        for (let i = 1; i != 5; i++)
        {
            this.movingLeftImages[i] = new Image()
            this.movingLeftImages[i].src = `../sprites/moveleft/move-left-${i}.png`

            this.movingRightImages[i] = new Image()
            this.movingRightImages[i].src= `../sprites/moveright/move-right-${i}.png`
        }

        //attack

        for (let i = 1; i != 8; i++)
        {
            this.attackLeftImages[i] = new Image()
            this.attackLeftImages[i].src = `../sprites/attackleft/attack-left-${i}.png`

            this.attackRightImages[i] = new Image()
            this.attackRightImages[i].src= `../sprites/attackright/attack-right-${i}.png`
        }

        //hurt

        for (let i = 1; i != 20; i++)
        {
            
        }
    }

} 
const model = new Model()



class Balls {
    constructor(x, y, r, c, v) {

        this.x = x;
        this.y = y;
        this.id = b.length

        this.vY = v; //velocity
        this.c = c; // color
        this.R = r; // circle radius
        this.a = 0.9
        this.stop=false;
    }
    
    update(){
        if (this.y < H - this.R) {

            this.vY += this.a // increase circle velocity in Y
        }

        else{
            this.vY = -this.vY
        }

        this.y += this.vY
    }

    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.fill();
    }
   
    
}

//Ball Creation
let b = new Array()
let ballId = 1
createBalls();

function createBalls(){

    for (let i = 0; i < 2; i++) {

        // random position
        let xInit = 20 + Math.random() * (W - 2 * 20);
        
        // random velocity
        let velocity = 1 + Math.random() * 3;

        b.push(new Balls(xInit, 30, 20, 'Red', velocity))

        ballId++
    }
}



//Movement 

let left = false
let right = false
let playerSpeed = 15

let direction = "right"
let state = "idle"
let frame = 1
let attack = false

let projectileId = 1

//Set Movement Frames/States
function getFrame(){

    if(right == false && left == false){

        state = "idle"
    }

    else if(right == true && left == true){

        state = "idle"
    }

    else{

        state = "moving"
    }

    if(attack){
        
        state = "attacking"
    }

    switch(state){

        case "idle":{

            if(direction == "right"){

                frame = 2
                model.activeImages = model.idleImages
            }

            else{

                frame = 1
                model.activeImages = model.idleImages
            }

            break;
        }

        case "moving":{

            switch(direction){

                case "right": {

                    if(frame < 4){
                        frame++
                    }
        
                    else
                    {
                        frame = 1
                    }
    
                    model.activeImages = model.movingRightImages

                    break;
                }

                case "left": {

                    if(frame < 4){
                        frame++
                    }
        
                    else
                    {
                        frame = 1
                    }
    
                    model.activeImages = model.movingLeftImages

                    break;
                }

                default: break;
            }

            break;
        }

        case "attacking":{

            switch(direction){

                case "right": {

                    if(frame < 7){
                        frame++
                    }
        
                    else{

                        attack = false
                    }
    
                    model.activeImages = model.attackRightImages

                    break;
                }

                case "left": {

                    if(frame < 7){

                        frame++
                    }
        
                    else{

                        attack = false
                    }
    
                    model.activeImages = model.attackLeftImages

                    break;
                }

                default: break;
            } 

            if(frame == 4){
                        
                p.push(new Projectile(X,H-60))
                projectileId ++
            }
        }
    }
}

//Action Detection
window.addEventListener('keydown',keyPressed)
window.addEventListener('keyup',keyLeft)
window.addEventListener('click',event=>{attack = true; frame = 1})


function keyPressed(e){

    switch(e.key){
        case 'a': {left = true; direction="left"; break;}
        case 'd': {right = true; direction="right"; break;}
        default: break;
    }
}

function keyLeft(e){

    switch(e.key){
        case 'a': left = false; break;
        case 'd': right = false; break;
        default: break;
    }
}



//Set Animation
window.onload = function(){

    setInterval(render,1000/20)
}


//create Projectiles

let p = new Array()

class Projectile{

    constructor(x,y){
        this.x = x
        this.y = y
        this.id = projectileId

        this.vY = 5 //velocity
        this.c = 'red' // color
        this.R = 5 // circle radius
        this.stop = false
    }

    update(){

        if (this.y > 5) {

            this.y -= this.vY
        }

        else
        {
            p = p.filter(element=>element.id != this.id)
        }
    }

    draw(){

        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.fill();
    }
}


//render
function render(){

    ctx.clearRect(0,0,W,H)

    ctx.drawImage(model.background,0,0)

    getFrame()

        if(right == true  && attack == false){

            if(X < W-60)
            {
                X+= playerSpeed
            }   
        }

        if(left == true && attack == false){
            
            if (X > 10)
            {
                X-= playerSpeed
            }
        }

        ctx.drawImage(model.activeImages[frame],X,H-50,40,50)

        b.forEach(function (ball) {
            ball.draw();
        })

        b.forEach(ball=> {
            ball.update();
        })

        if(p.length != 0){

            p.forEach(function (projectile) {
                projectile.draw();
            })

            p.forEach(projectile=>{
                projectile.update()
            })
        }

}

