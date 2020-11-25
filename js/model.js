//Images Model

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

        //health

        this.heartImage = new Image()
        this.heartImage.src = "../heart.png"
    }

} 

const model = new Model()

//Canvas Indentity
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext("2d")

const W = canvas.width
const H = canvas.height

let alpha = 1
let date = new Date()
let startTime = [date.getMinutes(),date.getSeconds()]
let endTime

const groundH = H * 0.110

let X = 0
let Y = H - groundH - 50


let healthPoints = 3

let level = 0


//Ball Creation

let b = new Array()

function getBallId(){

    return b.length ? b[b.length -1].id + 1 : 1
}

class Balls {

    constructor(x, y, r, c, v) {

        this.x = x
        this.y = y
        this.id = getBallId()

        this.v = v
        this.dX = 8 * Math.cos(v)
        this.dY = 8 * Math.sin(v)
        this.aY = 1

        this.c = c // color
        this.R = r // circle radius
        this.stop=false
        this.ballHit = true
    }
    
    update(){

        //Check X

        if (this.x <= this.R) {

            this.dX = -this.dX 
        }

        else if (this.x >= W - this.R){

            this.dX = -this.dX 
        }

        this.x += this.dX

        //Check Y

        if (this.y >= H - groundH - this.R){

            this.dY = -this.dY
        }
        else{

            this.dY += this.aY
        }
        
        this.y += this.dY

    }

    draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.stroke()
    }
   
    testDamage(){

        let playerCenterX = X + 20
        let playerCenterY = Y + 25
        let playerRadio = 20

        let xdistance = 0
        let ydistance = 0
        let distance = 0

        xdistance = (this.x < playerCenterX) ? (playerCenterX - this.x) : (this.x - playerCenterX) 
            
        ydistance = (this.y < playerCenterY) ? (playerCenterY - this.y) : (this.y - playerCenterY) 

        distance = Math.sqrt((xdistance * xdistance) + (ydistance * ydistance))


        if(this.ballHit){

            this.ballHit = distance > playerRadio + this.R + 15 ? false : true
        }

        else{

            if(distance <= playerRadio + this.R){
                healthPoints -= 1
                this.ballHit = true
            }
        }
    }    
}

function createBalls(){

    for (let i = 0; i < 1 + level; i++) {

        let xInit
        // random position
        if(b.length == 0){

            xInit = 20 + Math.random() * (W - 20)
        } else{

            b.forEach(ball=>{

                while(!(ball.x < xInit - 40 || ball.x > xInit + 40)){

                    xInit = 20 + Math.random() * (W - 20)
                }

            })
        }
        
        // random velocity
        let velocity = 0.2 * Math.PI

        b.push(new Balls(xInit, 50, 20, 'Red', velocity))
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

            if(frame == 4 && p.length < 1){
                
                p.push(new Projectile(X+20,Y))
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


//create Projectile

let p = new Array()

class Projectile{

    constructor(x,y){

        this.x = x
        this.y = y

        this.vY = 10 //velocity
        this.c = '#0066ff' // color
        this.R = 5 // circle radius
        this.stop = false
    }

    update(){

        if (this.y > 5) {

            this.y -= 25
        }

        else{

            p = p.filter(obj=>obj.id != this.id)
        }
    }

    draw(){

        ctx.fillStyle = this.c;
        ctx.beginPath()
        ctx.moveTo(this.x,Y)
        ctx.lineTo(this.x,this.y)
        ctx.stroke()
    }

    pushNewBalls(ball){

        p = []
        b.push(new Balls(ball.x + 30 > W - ball.R ? W - ball.R : ball.x + 30, ball.y - 40 < ball.R ? ball.R : ball.y - 40, ball.R/2, 'Red', 0.2 * Math.PI))
        b.push(new Balls(ball.x - 30 < ball.R ? ball.R : ball.x + 30, ball.y - 40 < ball.R ? ball.R : ball.y - 40, ball.R/2,'Red', Math.PI - 0.2 * Math.PI))

        b = b.filter(obj=>obj.id != ball.id)
    }

    destroyBall(ball){

        p = []
        b = b.filter(obj=>obj.id != ball.id)
    }

    testColision(){

        b.forEach(ball=>{

            if(ball.x + ball.R < this.x){
                
                if(this.x - ball.x < ball.R && this.y < ball.y && ball.y < Y){

                    if(ball.R > 5){
                        
                        this.pushNewBalls(ball)
                    }
                    else{
                        
                        this.destroyBall(ball)
                    }
                }
            }

            if(ball.x + ball.R > this.x){
                
                if(ball.x - this.x < ball.R && this.y < ball.y && ball.y < Y){

                    if(ball.R > 5){
                        
                        this.pushNewBalls(ball)
                    }
                    else{
                        this.destroyBall(ball)
                    }
                }
            }
        })

    }
}


//Set Animation
window.onload = function(){

    setInterval(render,1000/25)
}

//render
function render(){

    if(healthPoints > 0 && level < 3){

        ctx.clearRect(0,0,W,H)
        ctx.drawImage(model.background,0,0,W,H)
        
        for(let i = 0; i < healthPoints; i++){

            ctx.drawImage(model.heartImage, 10 + i * 40, 10, 35, 30)
        }

        getFrame()

        if(b.length == 0 && level < 3){

            level++
            createBalls()
        }

            //Draw Character Oriented
            if(right == true  && attack == false){

                if(X < W-40)
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

            ctx.drawImage(model.activeImages[frame],X,Y,40,50)

            //Draw Balls
            b.forEach(function (ball) {
                ball.draw()
            })

            //Bounce Balls
            b.forEach(ball=> {
                ball.update()
            })

            //Test Ball-Character Colision
            b.forEach(ball=>{
                ball.testDamage()
            })

            //Attacking Situations 
            if(p.length != 0){

                p.forEach(function (projectile) {
                    projectile.draw()
                })

                p.forEach(projectile=>{
                    projectile.update()
                })

                p.forEach(projectile=>{
                    projectile.testColision()
                })
            }

    }

    //Case Health Ends

    else if(healthPoints == 0){

        if(alpha > 0.2){
            alpha -= 0.01
        }

            ctx.clearRect(0,0,W,H)

            ctx.globalAlpha = alpha
            ctx.drawImage(model.background,0,0,W,H)
            ctx.drawImage(model.activeImages[frame],X,Y,40,50)

            //Draw Balls
            b.forEach(function (ball) {
                ball.draw()
            })

            //Bounce Balls
            b.forEach(ball=> {
                ball.update()
            })

            ctx.globalAlpha = 1 - alpha

            ctx.fillStyle = "red";
            ctx.font = "100px Castoro";
            ctx.fillText("You Lose", W/2 - 200, H/2);

            ctx.fillStyle = "black";
            ctx.font = "25px Castoro";
            ctx.fillText("(Space for Home)", W/2 - 100, H/2 + 200);

            if(alpha < 0.2){
                window.addEventListener('keydown',function(e){

                    if(e.key== " "){
                        location.reload()
                    }
                })
            }

    }else{

        if(!endTime){

            endTime = [date.getMinutes(),date.getSeconds()]
        }

        if(alpha > 0.2){
            alpha -= 0.01
        }

            ctx.clearRect(0,0,W,H)

            ctx.globalAlpha = alpha
            ctx.drawImage(model.background,0,0,W,H)
            ctx.drawImage(model.activeImages[frame],X,Y,40,50)

            ctx.globalAlpha = 1 - alpha

            ctx.fillStyle = "red";
            ctx.font = "100px Castoro";
            ctx.fillText("You Win!", W/2 - 200, H/2);

            ctx.fillStyle = "black";

            ctx.font = "35px Castoro";
            ctx.fillText(`In Just ${startTime[0]-endTime[0]}:${startTime[1]-endTime[1]} Minutes`, W/2 - 150, H/2 + 75);

            ctx.font = "25px Castoro";
            ctx.fillText("(Space for Home)", W/2 - 100, H/2 + 150);

            if(alpha < 0.2){
                window.addEventListener('keydown',function(e){

                    if(e.key== " "){
                        location.reload()
                    }
                })
            }
    }
        
}

function loseGame(){

    alert("haha")
}