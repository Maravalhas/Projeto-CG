export default class Model {

    constructor(){

        this.movingLeftImages = []
        
        this.movingRightImages = []

        this.attackLeftImages = []

        this.attackRightImages = []

        this.idleImages = []

        this.setImages()

        this.background = new Image()
        this.background.src= ""

        this.activeImages = []
    }

    setImages(){

        //idle

            this.idleImages[1] = new Image()
            this.idleImages[1].src = `../sprites/idle-left.png`

            this.idleImages[2] = new Image()
            this.idleImages[2].src = `../sprites/idle-right.png`

        //moving

        for (let i = 1; i != 5; i++)
        {
            this.movingLeftImages[i] = new Image()
            this.movingLeftImages[i].src = `../sprites/move-left-${i}.png`

            this.movingRightImages[i] = new Image()
            this.movingRightImages[i].src= `../sprites/move-right-${i}.png`
        }

        //attack

        for (let i = 1; i != 6; i++)
        {
            this.attackLeftImages[i] = new Image()
            this.attackLeftImages[i].src = `../sprites/attack-left-${i}.png`

            this.attackRightImages[i] = new Image()
            this.attackRightImages[i].src= `../sprites/attack-right-${i}.png`
        }

        //hurt

        for (let i = 1; i != 20; i++)
        {
            
        }
    }

}

const model = new Model()

let left = false
let right = false
let speed = 20

let balls = new Array();

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

let X = 0
let Y = 0

let direction = "right"
let state = "idle"

let frame = 1

function getFrame(){

    if(right == false && left == false){

        state = "idle"
    }

    else{

        state = "moving"
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

            if(direction == "left")
            {
                frame++
                model.activeImages = model.attackLeftImages[frame]
            }
            else
            {
                frame++
                model.activeImages = model.attackRightImages[frame]
            }
        }
    }
}

window.addEventListener('keydown',keyPressed)
window.addEventListener('keyup',keyLeft)
window.addEventListener('click',event=>{state="attacking"})

window.onload = function(){

    setInterval(render,1000/10)
}

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

//render
function render(){

    ctx.clearRect(0,0,W,H)

    getFrame()

        if(right == true){

            if(X < W-60)
            {
                X+= speed
            }   
        }

        if(left == true){
            
            if (X > 10)
            {
                X-= speed
            }
        }

        ctx.drawImage(model.activeImages[frame],X,300,60,80)

        
}

function createBalls(){

     // setup as many balls as wanted
        for (let i = 0; i < 10; i++) {
            let R = Math.floor(Math.random() * 256);
            let G = Math.floor(Math.random() * 256);
            let B = Math.floor(Math.random() * 256);
            let color = `rgb(${R},${G},${B})`; // random color

            // random position (inside Canvas)
            let xInit = 20 + Math.random() * (W - 2 * 20);
            
            // random direction
            let direction = Math.random() * 2 * Math.PI;

            balls.push(new Ball(xInit, 30, 10, direction, color))
        }

}

function renderBalls(){
    
    balls[0].draw
}