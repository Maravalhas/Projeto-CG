export default class Model {

    constructor(){

        this.movingImages = []
        
        this.atackImages = []

        this.idleImages = []

        this.hurtImages = []

        this.setImages()
    }

    setImages(){

        //attack

        for (let i = 1; i != 20; i++)
        {
            if(i < 10)
            {
            this.movingImages[i] = new Image()
            this.movingImages[i].src = `../sprites/archer/3_animation_attack_00${i}.png`
            }
            else
            {
                this.movingImages[i] = new Image()
                this.movingImages[i].src = `../sprites/archer/3_animation_attack_0${i}.png`
            }
        }

        //hurt

        for (let i = 1; i != 20; i++)
        {
            if(i < 10)
            {
            this.movingImages[i] = new Image()
            this.movingImages[i].src = `../sprites/archer/3_animation_hurt_00${i}.png`
            }
            else
            {
                this.movingImages[i] = new Image()
                this.movingImages[i].src = `../sprites/archer/3_animation_hurt_0${i}.png`
            }
        }

        //idle

        for (let i = 1; i != 20; i++)
        {
            if(i < 10)
            {
            this.movingImages[i] = new Image()
            this.movingImages[i].src = `../sprites/archer/3_animation_idle_00${i}.png`
            }
            else
            {
                this.movingImages[i] = new Image()
                this.movingImages[i].src = `../sprites/archer/3_animation_idle_0${i}.png`
            }
        }

        //walk

        for (let i = 1; i != 20; i++)
        {
            if(i < 10)
            {
            this.movingImages[i] = new Image()
            this.movingImages[i].src = `../sprites/archer/3_animation_walk_00${i}.png`
            }
            else
            {
                this.movingImages[i] = new Image()
                this.movingImages[i].src = `../sprites/archer/3_animation_walk_0${i}.png`
            }
        }
    }
    

}

new Model()