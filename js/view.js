import Controller from '../js/controller.js'

export default class View{

    constructor(){

        this.left
        this.right

        this.canvas = document.querySelector('#canvas');
        this.ctx = canvas.getContext("2d");

        
        this.W = this.canvas.width
        this.H = this.canvas.height

        this.X = this.W/2 
        this.Y = this.H/2


        this.keyListener()

        this.spawnBall()
    }

    keyListener(){

        window.addEventListener('keydown',this.keyPressed)
        window.addEventListener('keyup',this.keyLeft)
    }

    keyPressed(e){

        switch(e.key){
            case 'a': this.left = true; break;
            case 'd': this.right = true; break;
            default: break;
        }
        console.log(this.left,this.right)
    }

    keyLeft(e){

        switch(e.key){
            case 'a': this.left = false; break;
            case 'd': this.right = false; break;
            default: break;
        }
        console.log(this.left,this.right)
    }

    spawnBall(){

        this.ctx.beginPath()
        this.ctx.arc(this.X,this.Y,30,0,2*Math.PI)
        this.ctx.fill()

    }

    render(){


    }
}

new View()