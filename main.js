//scene for intro

class BootScene extends Phaser.Scene {
    constructor ( )
{
    super({key: 'BootScene'});

    this.introVideo = null;

}

preload( )
{
    //loading the video

    this.load.video('intro' , 'assets/video/welcome.mp4', 'loadeddata' , false , true );

}

create( ){ 

    this.introVideo = this.add.video(this.scale.width /2, this.scale.height/2 , 'intro')
     // size the video
    .setScale(this.scale.width/1950, this.scale.height / 1120)
    //.setScale(0.7)
     //video will kept at center
    .setOrigin(0.5, 0.5) 
    .setVisible(false);


    //playing the video

    //this.introVideo.play(true);

    this.startVideo();


      //auto start the game after the end of video

    this.introVideo.on('complete', ( ) => {
        this.startGame( );
    });



    


   

   this.input.on('pointerdown', () => this.startGame(), this );
   this.input.keyboard.on('keydown-SPACE', () => this.startGame(),this);

     }


startVideo()
{
    if(this.introVideo){
        this.introVideo.setVisible(true);
        this.introVideo.play(false);
    }
    else
    {
        console.error('...............')
    }
}


startGame()
{
    //will stop the video

    if(this.introVideo)
{
    this.introVideo.stop();
}  
this.scene.start('Example');  



}


}

//main game scenes
class Example extends Phaser.Scene
{

    constructor(){
    super({key:'Example'});

    this.scoreText = null;
    this.gameOver = false;
    this.score = 0;
    this.cursors=  null;
    this.platforms = null;
    this.bombs= null;
    //this.startButton = null;
    //this.startGame = null;
    this.combs = null;
    //player;
    this.bee = null;
    this.gameOverButton = null;
    this.restartButton = null;

    //constructor(){
        //super({key:'Example'});
    }

    preload ()
    {
        
        this.load.image('back', 'assets/photo/back.jpg');
        //this.load.image('index' , 'assets/photo/index.png');

        this.load.image('ground','assets/photo/bg.png');
        this.load.image('comb', 'assets/photo/home.png');
        this.load.image('bomb', 'assets/photo/ball.png');
        //this.load.spritesheet('players','assets/photo/player.png', { frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('bee','assets/photo/beee.png', { frameWidth: 500, frameHeight: 500});

        this.load.image('restartButton', 'assets/photo/restart.png');
        this.load.image('gameOverButton','assets/photo/over.png');

        //for buttons of index
        // Load the sprite sheet for the buttons
        /*this.load.spritesheet('buttons', 'assets/photo/buttons.png',
     {
        frameWidth: 500, 
        frameHeight: 500
     });*/
    }

    create ()


    {


          //  im adding bg to the game
        this.add.image(this.scale.width/2,this.scale.height/2, 'back').setDisplaySize(this.scale.width,this.scale.height);
    ////////////////////////////////////////////////////////////////////////////////////////////
        

        //create the start button
       // this.startButton = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'buttons', 0).setInteractive();

        //size control for start buttons
        //this.startButton.setScale(0.6);



        //this.startGame = this.startGame.bind(this);///bind method...


        // Handle Start button click
        //this.startButton.on('pointerdown', () => {
           // console.log('start button clicked');
            //this.startGame();  // Function to start the game
       /* this.startButton.on('pointerdown',() => {
        console.log('start button clicked');
        this.startGame();
            });


        }


    

      //define of startgame function
startGame()  {
        console.log('starting game');
        this.startButton.setVisible(false);*/


    //  adding platform at the ground...
        this.platforms = this.physics.add.staticGroup();

        //background
        this.platforms.create(this.scale.width/2,this.scale.height-20, 'ground').setScale(this.scale.width/400,0.3).refreshBody();

        //  Now let's create some ledges
        this.platforms.create(this.scale.width*0.51,this.scale.height*0.58, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(this.scale.width*0.12,this.scale.height*0.40, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(this.scale.width*0.88,this.scale.height*0.37, 'ground').setScale(0.5).refreshBody();

        // load bee
        this.bee = this.physics.add.sprite(200, 350, 'bee');

        // size of player
        this.bee.setScale(0.3);

        // bounce of bee
        this.bee.setBounce(0.4);
        this.bee.setCollideWorldBounds(true);



        //debug of bee
        console.log(this.bee);

        //  anime for bee walk
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('bee', {start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'bee', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 0}),
            frameRate: 10,
            repeat: 0
        });

        //  Input
        this.cursors = this.input.keyboard.createCursorKeys();

        //load comb
        this.comb = this.physics.add.group({
            key: 'comb',
            repeat:16,
            setXY: { x: 120, y: 0, stepX: 80 }
        });



        this.comb.children.iterate(child =>
        {
            child.setScale(0.08);

            // bounce the comb
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.8));

        });
       

        this.bombs = this.physics.add.group();


         // width and height for score background
        const scoreBgWidth = 200;  
        const scoreBgHeight = 50;  
        const scoreBgX = 16;  
        const scoreBgY = 16;


       //graphics of score bg
        const scoreBackground = this.add.graphics();
        scoreBackground.fillStyle(0x8CC692, 0.7);  // Black color with 70% opacity
        scoreBackground.fillRect(scoreBgX, scoreBgY, scoreBgWidth, scoreBgHeight);  // Draw the rectangle

        //score text
        this.scoreText = this.add.text(scoreBgX + 10, scoreBgY + 10, 'score: 0', { 
            fontSize: '32px', 
            fill: 'green',
           // align: 'center',
            fontStyle : 'bold',
            fontFamily: 'Arial'
        });    



        this.scoreText.setDepth(1); // will set above the background
        //  Collide the player and the scomb with the platforms
        this.physics.add.collider(this.bee, this.platforms);
        this.physics.add.collider(this.comb, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        

        //  Checks to see if the bee overlaps with any of the combs, if he does call the collectComb function
        this.physics.add.overlap(this.bee, this.comb, this.collectComb, null, this);

        this.physics.add.collider(this.bee, this.bombs, this.hitBomb, null, this);

     
        



        //setting gameover image

        this.gameOverButton =this.add.image(this.scale.width/2,this.scale.height/2.5,'gameOverButton')

        .setScale(0.8)
        //.setInteractive()
        //.setOrigin(0.5)
        .setVisible(false);


        //restart button loading
       this.restartButton = this.add.image(this.scale.width/1.9 ,this.scale.height/1.5 +100, 'restartButton')

    .setScale(0.5)  
    .setOrigin(0.6)
    .setVisible(false)
    .setInteractive();
    
        
    
// Event listener for the restart button
    this.restartButton.on('pointerdown', () => {
        this.scene.restart();
        this.gameOver = false;
        this.score = 0;
    });
    //this.restartText.setVisible(false);



    //click
     //this.restartText.on('pointerdown',() => this.scene.restart());
   

    //this.startGame = this.startGame.bind(this);///bind method...
   

    }









     

update ()
    {
        if (this.gameOver)
        {
            if(this.bee)
            {

            this.bee.setVelocityX(0);
            this.bee.anims.play('turn');
            }
            return;
        }

        //cursors declare
        if(this.cursors && this.bee)
        {

        if (this.cursors.left.isDown)
        {
            this.bee.setVelocityX(-360);

            this.bee.flipX=true;

            this.bee.anims.play('right', true);}

        else if (this.cursors.right.isDown)
        {
            this.bee.setVelocityX(360);

            this.bee.flipX = false;

            this.bee.anims.play('right', true);
        }

        else
        {
            this.bee.setVelocityX(0);

            this.bee.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.bee.body.touching.down)
        {
            this.bee.setVelocityY(-450);
        }

    }else {
        console.log('Bee is not defined in update');
    }
}


    
    
    
    collectComb (bee, comb)
    {
        comb.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText(`scored: ${this.score}`);

        if (this.comb.countActive(true) === 0)
        {
            //  A new batch of comb to collect
            this.comb.children.iterate(child =>
            {

                child.enableBody(true, child.x, 0, true, true);

            });

            const x = (bee.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setScale(0.04);
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 1);

        
    }
}

    hitBomb (bee, bomb)
    {
        this.physics.pause();

        bee.setTint(0xff0000);

        bee.anims.play('turn');

        this.gameOver = true;

       //background for the text if game over

        /*const bgWidth = 800;
        const bgHeight = 120;
        const bgX = this.scale.width /2 - bgWidth/2;  //centering
        const bgY = this.scale.height /2 - bgHeight/2;


        const textBackground = this.add.graphics();
        textBackground.fillStyle(0x8CC692, 0.7); //black colour
        textBackground.fillRect(bgX, bgY,bgWidth,bgHeight);*/


        //set the game over image

        this.gameOverButton.setVisible(true);//will show game over image
        this.gameOverButton.setDepth(2);


        //background for restart button

       /* const rbgWidth =340;
        const rbgHeight = 50;
        const rbgX = this.scale.width/2 - rbgWidth /1.9;
        const rbgY =this.scale.height/2 + 100 - rbgHeight /2;


        const rb = this.add.graphics( );
        rb.fillStyle(0x8CC692, 0.7);
        rb.fillRect(rbgX ,rbgY, rbgWidth, rbgHeight);*/

        //diplay of restart  button
        this.restartButton.setVisible(true);
        this.restartButton.setDepth(1);
    }

}





const config = {
    type: Phaser.AUTO,
    parent:'game-container',
    width:window.innerWidth,
    height:window.innerHeight,
   // width: 800,
    //height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [ BootScene , Example],
    scale:{
        mode:Phaser.Scale.RESIZE,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }

};

const game = new Phaser.Game(config);


window.addEventListener('resize',()=>{
    game.scale.resize(window.innerWidth,window.innerHeight);
});



