let score = 0;
let cross = true;

audio = new Audio('bg-sound.mpeg.mp3');
audio.loop = true;
audio.play();
audiogo = new Audio('Game-over.mpeg.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
audioj = new Audio('jump-sound.mpeg.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        jump();
    } else if (event.key === "ArrowRight") {
        moveRight();
    } else if (event.key === "ArrowLeft") {
        moveLeft();
    }
});


let hero = document.querySelector('.hero');
let gameContainer = document.querySelector('.gameContainer');
let gameOverText = document.querySelector('.gameOver');
let isMoving = false;

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight") {  
        hero.style.left = (parseInt(getComputedStyle(hero).left) + 20) + "px";  
        if (!isMoving) {
            gameContainer.classList.add('bgMove'); 
            isMoving = true;
        }
    }

    if (e.key === "ArrowUp") {  
        hero.classList.add("jump");
        setTimeout(() => {
            hero.classList.remove("jump");
        }, 500);
    }
});

// Function to stop background movement when game is over
function gameOver() {
    gameContainer.classList.remove('bgMove');  // Remove background movement class
    gameContainer.classList.add('stopBg');  // Stop background completely
    gameOverText.style.visibility = "visible"; // Show game over text
}

// Jump Variables
let velocity = 0;
let gravity = -2;
let isJumping = false;
let jumpForce = 80; 

function jump() {
    let hero = document.querySelector(".hero");

    // Change image while jumping
    hero.style.backgroundImage = "url('jump.png')";

    // Apply jump force
    velocity = jumpForce;
    isJumping = true;
    audioj.play();
        setTimeout(() => {
            
        }, 1000);
    // Move forward slightly when jumping
    let heroPosition = hero.offsetLeft;
    if (heroPosition < window.innerWidth - 150) {
        hero.style.left = heroPosition + 80 + "px";
    }
}

// Hero position update
function updateHeroPosition() {
    let hero = document.querySelector(".hero");
    let bottom = parseInt(window.getComputedStyle(hero).bottom);
    
    // Apply gravity
    bottom += velocity;
    velocity += gravity;

    // Prevent falling below ground
    if (bottom <= 80) {
        bottom = 80;
        velocity = 0;
        isJumping = false;
        hero.style.backgroundImage = "url('run.png')";
    }

    hero.style.bottom = bottom + "px";
}

// Update position continuously
setInterval(updateHeroPosition, 20);

function moveRight() {
    let hero = document.querySelector(".hero");
    let heroPosition = hero.offsetLeft;
    if (heroPosition < window.innerWidth - 150) {
        hero.style.left = heroPosition + 50 + "px";
        hero.style.transform = "scaleX(1)";
    }
}

function moveLeft() {
    let hero = document.querySelector(".hero");
    let heroPosition = hero.offsetLeft;
    if (heroPosition > 10) {
        hero.style.left = heroPosition - 20 + "px";
        hero.style.transform = "scaleX(-1)";
    }
}

// Collision Detection and Score Update
setInterval(() => {
    let hero = document.querySelector(".hero");
    let gameOver = document.querySelector(".gameOver");
    let obstacle = document.querySelector(".obstacle");
    let scoreCount = document.querySelector("#scoreCount");  // Fixed missing reference

    let heroRect = hero.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    // Check for collision
    if (
        heroRect.right > obstacleRect.left + 50 &&
        heroRect.left < obstacleRect.right - 50 &&
        heroRect.bottom > obstacleRect.top + 50
    ) {
        gameOver.style.visibility = "visible";
        obstacle.style.animation = "none";
        
        audiogo.play();
        setTimeout(() => {
            audio.pause();
        }, 1000);
    } 
    // Increase score only if the hero has completely passed the obstacle
    else if (heroRect.left > obstacleRect.right && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }
}, 100);

// Function to update the score display
function updateScore(score) {
    let scoreCount = document.querySelector("#scoreCount");
    if (scoreCount) {
        scoreCount.innerHTML = "Your Score: " + score;
    }
}