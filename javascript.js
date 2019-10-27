 var a;
var frog = new Image();	//create a new image object and attach it to a reference variable
frog.src = "resources/frogger.png"; //creates a pathname to an image to use. must do this once for each image.
var carLeft = new Image();
carLeft.src = "resources/carLeft.png";
var carLeft2 = new Image();
carLeft2.src = "resources/carLeft2.png";
var carRight = new Image();
carRight.src = "resources/carRight.png";
var carRight2 = new Image();
carRight2.src = "resources/carRight2.png";
var carRight3 = new Image();
carRight3.src = "resources/carRight3.png";
var log = new Image();
log.src = "resources/log.png";
var safeZ = new Image();
safeZ.src = "resources/safeZ.png";
var livePic = new Image();
livePic.src = "resources/life.png";
var ExtraLifes = new Image();
ExtraLifes.src = "resources/life.png";
var life = 7;
var liveA = [];
var winZones = [];
var carRights = [];
var carLefts = [];       //array for every possible image TYPE used, makes drawing easier and movement easier
var logRight = [];
var logLeft = [];
var collided= false;
var win = false;
var gameStart = false; //this var is used later to make sure the game isn't accidentally sped up by clicking the space bar repeatedly
var WinZoneHit0=false;
var WinZoneHit1=false;
var WinZoneHit2=false; //this set of variables is used for drawing the frogs at win
var WinZoneHit3=false;
var WinZoneHit00=false;
var WinZoneHit11=false;//this set is for adding score after a win
var WinZoneHit22=false;
var WinZoneHit33=false;
var score=0;
var highscore=0;
var level = 0;
var carLeftSpeed = 1.5;
var carRightSpeed = 1;
var logLeftSpeed = .5;
var logRightSpeed = 2.5;
var extraLifeCaught=false;
var extraLifeGiven=false;
function initialize() {
    frog = createImage("resources/frogger.png", "frog", 550,750);
    ExtraLifes= createImage("resources/life.png", "ExtraLIFE",50,512);
    drawBackground();
    drawStart();
    drawSafeZ();
    drawScoreBoard();
    drawFinish();
    drawWater();
    drawRoad();
    pushExtras();
    pushWinZones();
    pushCarArray();
    pushLogArray();
    drawImage();
    drawLives();
    drawWinZones();
    drawCarsRight();
    drawCarsLeft();
    drawLogsRight();
    drawLogsLeft();
    drawScore();
}
function pushExtras() {
    liveA.push(createImage("resources/lives.png", "life",0,0));
    liveA.push(createImage("resources/lives.png", "life",30,0));
    liveA.push(createImage("resources/lives.png", "life",60,0));//the next four functions push images into the array as soon as the webpage loads-
    liveA.push(createImage("resources/lives.png", "life",90,0));//along with their coords
    liveA.push(createImage("resources/lives.png", "life",120,0));
    liveA.push(createImage("resources/lives.png", "life",150,0));
    liveA.push(createImage("resources/lives.png", "life",180,0));
    liveA.push(createImage("resources/lives.png", "life",210,0));
}
function pushWinZones() {
    winZones.push(createImage("resources/safeZ.png", "safeZ", 50,50));
    winZones.push(createImage("resources/safeZ.png", "safeZ1", 190,50));
    winZones.push(createImage("resources/safeZ.png", "safeZ2", 350,50));
    winZones.push(createImage("resources/safeZ.png", "safeZ3", 500,50));
}
function pushCarArray() {
    carRights.push(createImage("resources/carRight.png", "carRight", -50,700));
    carRights.push(createImage("resources/carRight2.png", "carRight2", -152,700));
    carRights.push(createImage("resources/carRight2.png", "carRight3", 198,600));
    carRights.push(createImage("resources/carRight.png", "carRight5", 300,600));
    carRights.push(createImage("resources/carRight3.png", "carRight100", 0,600));
    carRights.push(createImage("resources/carRight2.png", "carRight6", 198,500));
    carRights.push(createImage("resources/carRight.png", "carRight7", 300,500));
    carRights.push(createImage("resources/carRight3.png", "carRight101", 500,500));
    // carRights.push(createImage("resources/carRight2.png", "carRight8", 198,400));
    // carRights.push(createImage("resources/carRight.png", "carRight9", 300,400));
    // carRights.push(createImage("resources/carRight3.png", "carRight102", 70,400));
    carLefts.push(createImage("resources/carLeft.png", "carLeft", 300,650));
    carLefts.push(createImage("resources/carLeft2.png", "carLeft2", 402,650));
    carLefts.push(createImage("resources/carLeft.png", "carLeft3", 0,550));
    carLefts.push(createImage("resources/carLeft2.png", "carLeft4", 102,550));
    // carLefts.push(createImage("resources/carLeft.png", "carLeft5", 309,450));
    // carLefts.push(createImage("resources/carLeft2.png", "carLeft6", 505,450));
}
function pushLogArray() {
    logRight.push(createImage("resources/log.png", "log", 120,400));
    logRight.push(createImage("resources/log.png", "log2", 100,300));
    logRight.push(createImage("resources/log.png", "log3", 200,200));
    logRight.push(createImage("resources/log.png", "log333", 500,200));
    logRight.push(createImage("resources/log.png", "log3", 182,100));
    logRight.push(createImage("resources/log.png", "log321", 582,100));
    logLeft.push(createImage("resources/log.png", "log4", 500,350));
    logLeft.push(createImage("resources/log.png", "log4", 100,350));
    logLeft.push(createImage("resources/log.png", "log5", 350,250));
    logLeft.push(createImage("resources/log.png", "log6", 50,150));
    logLeft.push(createImage("resources/log.png", "log6", 450,150));
}
var createImage = function(src, title,xcoord,ycoord) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    img.left = xcoord; //function given to us which makes it easier to change coords and create paths for images
    img.top = ycoord;
    return img;
};
    $(document).keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode === 83 && life >0 && frog.top>=49) {
            frog.top=frog.top +50; //if s is clicked, the frog will move down a lane
        }
        if (keycode === 87 && life >0 && frog.top>=49) {
            frog.top=frog.top -50; //if w is clicked, the frog will move up a lane
            score=score+5;
        }
        if (keycode === 65 && life >0 && frog.top>=49) {
            frog.left = frog.left - 50; //if a is clicked, the frog will move left

        }
        if (keycode === 68 && life >0 && frog.top>=49) {
            frog.left = frog.left + 50; //if d is clicked, the frog will move right

        }
        if (keycode === 82) {
            restart() //if r is clicked, the restart function will run

        }
        if (keycode === 32 && life >0 && gameStart===false) {
            gameStart=true;
            startAnimation(); //if the spacebar is clicked, and the player has lives
        }
        if (keycode === 80 && life >0) {
            stopAnimation();
            gameStart = false;   //when "P" is pressed, the animation is stopped, and the boolean
        }                        // that prevents a player from running the animation multiple times is reset
    });                          // this can't happen if there aren't lives availiable though in order to prevent glitches
function startAnimation() {
    if(gameStart===true) {
        animate();
    }
}
function stopAnimation() {
    cancelAnimationFrame(a);
}
function animate() {
    collided = false;
    a = requestAnimationFrame(animate);
    CheckLoss();
    drawBackground();
    drawStart();
    drawSafeZ();
    drawScoreBoard();
    drawFinish();
    drawWater();
    drawWinZones();
    drawRoad();
    drawCarsRight();
    drawCarsLeft();
    drawLogsRight();
    drawLogsLeft();
    drawImage();
    CheckFrog();
    checkCollisionCar();
    LogAndWaterCollision();
    CheckWin();
    addToScore();
    drawLives();
    drawScore();
    Collided();
    levelChanged();
    extraLife();
}
function drawBackground() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#AAAAAA";
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
}
function drawImage() {
    if (life > 0) {
        var ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.drawImage(frog, frog.left, frog.top, 40, 40);
    }
    if(WinZoneHit0===true) {
        ctx.drawImage(frog, winZones[0].left, winZones[0].top, 40, 40);
    }
    if(WinZoneHit1===true) {
        ctx.drawImage(frog, winZones[1].left, winZones[1].top, 40, 40);  //if a player gets a frog into a slot
    }                                                                    // it draws a frog into that slot
    if(WinZoneHit2===true) {
        ctx.drawImage(frog, winZones[2].left, winZones[2].top, 40, 40);
    }
    if(WinZoneHit3===true) {
        ctx.drawImage(frog, winZones[3].left, winZones[3].top, 40, 40);
    }
}
function  drawScoreBoard() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,600,50);
}
function drawStart() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#00680A";
    ctx.fillRect(0,750,600,50);
}
function drawSafeZ() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#00680A";
    ctx.fillRect(0,450,600,50);
}
function drawFinish() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#1ca3fd";
    ctx.fillRect(0,50,600,150);
}
function drawWater() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#1ca3ec";
    ctx.fillRect(0,150,600,300);
}
function drawRoad() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,500,600,250);
}
function checkCollisionCar() {
    for(i=0;i<carRights.length;i++) {
        if (frog.left < carRights[i].left + 80 && frog.left + 40 > carRights[i].left && frog.top < carRights[i].top + 40 && frog.top + 40 > carRights[i].top) {
            collided = true;
        }
    }        //checks the frog with every single car in each array, without the array this would've been if statement per car.
    for(i=0;i<carLefts.length;i++) {
        if (frog.left < carLefts[i].left + 80 && frog.left +40 > carLefts[i].left && frog.top < carLefts[i].top + 40 && frog.top + 40 > carLefts[i].top) {
            collided = true;
        }
    }
}
function drawWinZones() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for (i = 0;i<winZones.length;i++){
        ctx.drawImage(winZones[i],winZones[i].left, winZones[i].top,50,50); //draws each win slot
    }
}
function drawCarsRight() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for (i = 0;i<carRights.length;i++){
        ctx.drawImage(carRights[i],carRights[i].left, carRights[i].top,102,37);
        carRights[i].left = carRights[i].left + carRightSpeed;    //draws each car and moves it, if the cars reach the end--
        if (carRights[i].left > 650) {                // it moves to the other end, this only affects the car--
            carRights[i].left= -100                   // that hit the end, not every car at once
        }                                             //the next few functions do the exact same, they just change a--
    }                                                 //small amount depending on image type and direction moving
}
function drawCarsLeft() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for (i = 0;i<carLefts.length;i++){
        ctx.drawImage(carLefts[i],carLefts[i].left, carLefts[i].top,102,37);
        carLefts[i].left = carLefts[i].left - carLeftSpeed;
        if (carLefts[i].left < -100) {
            carLefts[i].left= 650
        }
    }
}
function drawLogsRight() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for (i = 0;i<logRight.length;i++){
        ctx.drawImage(logRight[i],logRight[i].left, logRight[i].top,150,50);
        logRight[i].left = logRight[i].left + logRightSpeed;
        if (logRight[i].left > 650) {
            logRight[i].left= -100
        }
    }
}
function drawLogsLeft() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for (i = 0;i<logLeft.length;i++){
        ctx.drawImage(logLeft[i],logLeft[i].left, logLeft[i].top,150,50);
        logLeft[i].left = logLeft[i].left - logLeftSpeed;
        if (logLeft[i].left < -100) {
            logLeft[i].left= 650
        }
    }
}
function drawLives() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for (i = 0; i < life; i++) {
        ctx.drawImage(liveA[i], liveA[i].left, liveA[i].top, 30, 50);
    }
}
function CheckFrog() {
    if (frog.top > 800) {
        collided=true
    }
    if (frog.top < -10) {
        collided = true
    }
    if (frog.left>600) {   // if the frog leaves the screen boundaries then it is considered a loss
        collided= true
    }
    if (frog.left<-50) {  //once the frog has completely reached the left it loses a life
        collided=true;
    }
}
function Collided() {
    if(collided===true) { //this is the life losing function
        frog.top = 750;  //when the player messes up the collided variable is set to true
        frog.left = 300; //in this function it removes a life and resets the frog when they mess up
        life--;
    }
}
function LogAndWaterCollision() {
        var waterHit = false;
        var logRights = false;
        var logLefts = false;
        for(i=0;i<logRight.length;i++) {
            if (frog.left < logRight[i].left + 140 && frog.left + 40 > logRight[i].left && frog.top < logRight[i].top + 40 && frog.top + 40 > logRight[i].top) {
                logRights= true;       //if the frog collides with any log moving right this boolean is set to true
            }
        }
        for(i=0;i<logLeft.length;i++) {
            if (frog.left < logLeft[i].left + 140 && frog.left +40 > logLeft[i].left && frog.top < logLeft[i].top + 40 && frog.top + 40 > logLeft[i].top) {
                logLefts= true;  //if the frog collides with any log moving left this boolean is set to true
            }
        }
        if (frog.top < 450 && frog.top >= 100) {
            waterHit = true; // if the frog is in the "blue area" it is in the water
        }
        if (waterHit ===true && logRights === true) {
            frog.left = frog.left + logRightSpeed; // if the frog is in the water and on a log moving right frog moves right
    }
    if (waterHit ===true && logLefts === true) {
        frog.left = frog.left - logLeftSpeed; // if frog in water and on log moving left frog moves left
    }
    if (logRights === false && logLefts === false && waterHit === true) {
            collided = true //if the water isn't on a log but in the water it dies
    }
    }
function CheckWin() {
    WinZoneHit00=false;
    WinZoneHit11=false;      //sets the temp win variables to false
    WinZoneHit22=false;      //if this didn't happen the score would continously add itself as the player got more
    WinZoneHit33=false;      // frogs into slots
    var waterHitForWin = false;
    win = false;
    if (frog.top>=0 && frog.top <100) {
        if (frog.left >= 0 && frog.left < 50) {
            waterHitForWin = true;
            collided=true;
        }
        if (frog.left > 110 && frog.left < 180) {
            waterHitForWin = true;
            collided=true;
        }
        if (frog.left > 250 && frog.left < 340) {
            waterHitForWin = true;
            collided=true;
        }
        if (frog.left > 410 && frog.left < 490) {
            waterHitForWin = true;
            collided=true;
        }
        if (frog.left > 550 && frog.left < 600) {
            waterHitForWin = true;
            collided=true;
        }    //if the frog is in water near the win zones but not completely in the win zones this boolean becomes true.
    }
    for(i=0;i<winZones.length;i++) {
        if (frog.left < winZones[i].left + 25 && frog.left + 25 > winZones[i].left && frog.top < winZones[i].top + 50 && frog.top + 50 > winZones[i].top) {
            win = true; //if the frog is in the win zone this boolean is set to true
            if(i===0) {
                WinZoneHit0 = true;
                WinZoneHit00=true;
            }
            if(i===1) {
                WinZoneHit1 = true;
                WinZoneHit11=true;
            }
            if(i===2) {
                WinZoneHit2 = true;
                WinZoneHit22 = true;
            }
            if(i===3) {    //A repeated collision code for the extra life can be eliminated because
                WinZoneHit3 = true; //the extra life always appears on the 3rd petal
                WinZoneHit33 = true;
                if(level===2) {
                    extraLifeCaught = true;
                    if (extraLifeGiven === false) { //this makes sure a player only gets the extra life
                        life++;              //one time per game
                        extraLifeGiven = true;
                    }
                }
            }
        }
    }
    if (win===true && waterHitForWin===false) {
        frog.top = 760; //if win is true and the waterHitForWin was unchanged then the game is won
        frog.left = 300;

    }
}
function addToScore() {            //these add to the player score when certain critera are met
    if(WinZoneHit00===true) {   //since i thought the first slot was the hardest more points are given for that
        score=score+900
    }
    if(WinZoneHit11===true) {
        score=score+600
    }
    if(WinZoneHit22===true) {
        score=score+600
    }
    if(WinZoneHit33===true) {
        score=score+600
    }                                   //Bonus points are given at the end of each level for not losing lives
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true && life>=7) {
        score=score+20000;
    }
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true&& life===6) {
        score=score+5000
    }
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true===true && life===5) {
        score=score+3000
    }
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true&& life===4) {
        score=score+2000
    }
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true && life===4) {
        score=score+2000
    }
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true&& life<=3) {
        score=score+1000
    }
if (score>highscore) {
        highscore = score;
}
}
function CheckLoss() {
    if (life===0) {
        WinZoneHit0=false;
        WinZoneHit1=false; //sets the permanent Slot variables to false, meaning all frogs dissapear
        WinZoneHit2=false;
        WinZoneHit3=false;
            stopAnimation();
    }
}
function restart() {
    gameStart = false;
    life = 7;
    frog.top = 750;
    score=0;
    level= 0;
    WinZoneHit0=false;
    WinZoneHit1=false;
    WinZoneHit2=false;
    WinZoneHit3=false;
    extraLifeCaught=false;
    extraLifeGiven=false;
        stopAnimation();
    gameStart=true;
    startAnimation();
}
function drawScore() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";  //draws text with score variable
    ctx.fillText("The Score is: " + score,300,20);
    ctx.font = "20px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Your Highest Score: " + highscore,300,45);
}
function levelChanged() {
    if(level===0) {
        carLeftSpeed = 1.5;
        carRightSpeed = 1;
        logLeftSpeed = .5;
        logRightSpeed = 2.5;

    }
    if(WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true && level === 0) {
        level=2;
        WinZoneHit0=false;
        WinZoneHit1=false;
        WinZoneHit2=false;
        WinZoneHit3=false;
    }
    if (level===2) {
        carLeftSpeed = 2.5;
        carRightSpeed = 2.5;
        logLeftSpeed = 1.5;
        logRightSpeed = 2.5;

    }
    if (WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true && level === 2) {
        level = 3;
        WinZoneHit0=false;
        WinZoneHit1=false;
        WinZoneHit2=false; //sets all permanent win variables to false, this "restarts" the game but keeps the score
        WinZoneHit3=false;
        extraLifeCaught = false
    }
    if (level===3) {
        carLeftSpeed = 3.5;
        carRightSpeed = 2.5;
        logLeftSpeed = 1.5;   //increases the speed a little bit as the levels continue
        logRightSpeed = 3;

    }
    if (WinZoneHit0===true && WinZoneHit1 ===true && WinZoneHit2 ===true && WinZoneHit3 ===true && level === 3) {
        WinZoneHit0=false;
        WinZoneHit1=false;
        WinZoneHit2=false;      //this is the end of the game.
        WinZoneHit3=false;
        document.getElementById("controls").innerHTML = "You have attained mastery (not really)";
        stopAnimation()
    }
}
function extraLife() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    if (extraLifeCaught === false && level===2) {     //this draws an extra life at the first lily pad.
            ctx.drawImage(ExtraLifes, ExtraLifes.top, ExtraLifes.left, 30, 30);
        }
}