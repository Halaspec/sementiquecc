document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('dino-canvas');
    const ctx = canvas.getContext('2d');

    let dino = { x: 50, y: 150, width: 20, height: 20, dy: 0, jump: false };
    let obstacles = [];
    let gameSpeed = 3;
    let score = 0;
    let animationId;

    function drawDino() {
        ctx.fillStyle = 'green';
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    }

    function drawObstacles() {
        ctx.fillStyle = 'red';
        obstacles.forEach(obs => {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });
    }

    function updateDino() {
        if (dino.jump) {
            dino.dy = -8;
            dino.jump = false;
        }
        dino.y += dino.dy;
        dino.dy += 0.5;

        if (dino.y > 150) {
            dino.y = 150;
            dino.dy = 0;
        }
    }

    function updateObstacles() {
        if (animationId % 100 === 0) {
            let height = Math.random() * (100 - 20) + 20;
            obstacles.push({ x: 600, y: 200 - height, width: 20, height: height });
        }

        obstacles.forEach(obs => {
            obs.x -= gameSpeed;
        });

        obstacles = obstacles.filter(obs => obs.x > -20);
    }

    function checkCollision() {
        for (let obs of obstacles) {
            if (dino.x < obs.x + obs.width &&
                dino.x + dino.width > obs.x &&
                dino.y < obs.y + obs.height &&
                dino.height + dino.y > obs.y) {
                cancelAnimationFrame(animationId);
                alert(`Game Over! Your score: ${score}`);
                document.location.reload();
            }
        }
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updateDino();
        updateObstacles();
        checkCollision();

        drawDino();
        drawObstacles();

        score++;
        document.getElementById('dino-instructions').textContent = `Score: ${score}`;
        
        animationId = requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && dino.y === 150) {
            dino.jump = true;
        }
    });

    document.getElementById('dino-instructions').addEventListener('click', function() {
        requestAnimationFrame(gameLoop);
        document.getElementById('dino-instructions').style.display = 'none';
    });
});
