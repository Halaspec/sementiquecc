window.onload = function() {
    var canvas = document.getElementById('snake-canvas');
    var ctx = canvas.getContext('2d');
    var delay = 75;
    var blocksize = 30;
    var score = 0;
    var snake;
    var ball;
    var animationFrame;

    function init() {
        canvas.style.border = "5px solid black";
        canvas.style.background = "WHITE";
        ctx.font = "bold 200px sans-serif";
        ctx.textBaseline = "middle";
        resetSnake();
        ball = new Eat(Math.floor(Math.random() * 30) * 30, Math.floor(Math.random() * 20) * 30);
        refreshCanvas();
    }

    function refreshCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawScore();
        snake.draw();
        ball.draw();
        if (ball.x == snake.body[snake.body.length - 1][0] && ball.y == snake.body[snake.body.length - 1][1]) {
            score++;
            ball.replace();
            snake.body.unshift([snake.body[0][0] - 30, snake.body[0][1]]);
        }
        snake.colision();
        if (animationFrame !== null) {
            animationFrame = setTimeout(refreshCanvas, delay);
        }
    }

    function drawScore() {
        ctx.save();
        ctx.fillText(score.toString(), canvas.width / 2 - 80, canvas.height / 2);
        ctx.restore();
    }

    function Snake(body, x, y) {
        this.body = body;
        this.x = x;
        this.y = y;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                ctx.fillRect(this.body[i][0], this.body[i][1], blocksize, blocksize);
            }
            ctx.restore();
        };

        this.moveX = function (push) {
            this.body.shift();
            this.body.push([this.body[this.body.length - 1][0] + push, this.body[this.body.length - 1][1]]);
        };

        this.moveY = function (push) {
            this.body.shift();
            this.body.push([this.body[this.body.length - 1][0], this.body[this.body.length - 1][1] + push]);
        };

        this.setdirection = function (vx, vy) {
            this.x = vx;
            this.y = vy;
            if (vx == 0 && vy != 0) {
                this.moveY(this.y);
            }
            if (vx != 0 && vy == 0) {
                this.moveX(this.x);
            }
        }

        this.colision = function () {
            if (this.body[this.body.length - 1][0] < 0 || this.body[this.body.length - 1][0] > 870
                || this.body[this.body.length - 1][1] < 0 || this.body[this.body.length - 1][1] > 570) {
                this.lose();
            } else {
                for (var i = 0; i < this.body.length - 1; i++) {
                    if (this.body[this.body.length - 1][1] == this.body[i][1] && this.body[this.body.length - 1][0] == this.body[i][0]) this.lose();
                }
            }
            if (this.x != 0) this.moveX(this.x);
            if (this.y != 0) this.moveY(this.y);
        }

        this.lose = function () {
            alert(`Your final score is: ${score}`);
            clearTimeout(animationFrame);
            animationFrame = null;
            window.location.reload(); // Reload the page
        }
    }

    function Eat(x, y) {
        this.x = x;
        this.y = y;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(this.x, this.y, blocksize, blocksize);
            ctx.restore();
        };

        this.replace = function () {
            this.x = Math.floor(Math.random() * 30) * 30;
            this.y = Math.floor(Math.random() * 20) * 30;
        }
    }

    document.addEventListener('keydown', function(e) {
        if (animationFrame !== null) {
            var pushX = 0;
            var pushY = 0;
            switch (e.keyCode) {
                case 37:
                    pushX = -30; pushY = 0;
                    break;
                case 38:
                    pushX = 0; pushY = -30;
                    break;
                case 39:
                    pushX = 30; pushY = 0;
                    break;
                case 40:
                    pushX = 0; pushY = 30;
                    break;
            }
            snake.setdirection(pushX, pushY);
        }
        if (e.code === 'Space' && !animationFrame) {
            init();
            document.getElementById('snake-instructions').style.display = 'none';
        }
    });

    document.getElementById('snake-instructions').addEventListener('click', function() {
        init();
        document.getElementById('snake-instructions').style.display = 'none';
    });

    function resetSnake() {
        var body = [[360, 270], [390, 270], [420, 270], [450, 270]];
        snake = new Snake(body, 30, 0);
    }

    window.initGame = init; // Make initGame function globally accessible




    initRoadmap();  // Initialize the roadmap after everything is loaded
    setInterval(refreshGrids, 5000);  // Rafraîchir la grille toutes les 5 secondes
};

window.addEventListener('resize', function() {
    // Refresh Muuri grid on window resize to ensure layout updates
    boardGrid.refreshItems().layout();
    columnGrids.forEach(function(grid) {
        grid.refreshItems().layout();
    });
});

function initRoadmap() {
    var dragContainer = document.querySelector('.drag-container');
    var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
    var columnGrids = [];
    var boardGrid;

    itemContainers.forEach(function (container) {
        var grid = new Muuri(container, {
            items: '.board-item',
            dragEnabled: true,
            dragSort: function () {
                return columnGrids;
            },
            dragContainer: dragContainer,
            dragAutoScroll: {
                targets: (item) => {
                    return [
                        { element: window, priority: 0 },
                        { element: item.getGrid().getElement().parentNode, priority: 1 },
                    ];
                }
            }
        })
        .on('dragStart', function (item) {
            item.getElement().style.width = item.getWidth() + 'px';
            item.getElement().style.height = item.getHeight() + 'px';
        })
        .on('dragReleaseEnd', function (item) {
            item.getElement().style.width = '';
            item.getElement().style.height = '';
            item.getGrid().refreshItems([item]);
        })
        .on('layoutStart', function () {
            boardGrid.refreshItems().layout();
        });

        columnGrids.push(grid);
    });

    boardGrid = new Muuri('.board', {
        dragEnabled: true,
        dragHandle: '.board-column-header',
        layoutOnInit: true
    });

    // Refresh the layout after initialization to ensure everything is correctly positioned
    setTimeout(function() {
        boardGrid.refreshItems().layout();
        columnGrids.forEach(function(grid) {
            grid.refreshItems().layout();
        });
    }, 500); // Delay can be adjusted based on your specific needs
}


document.addEventListener('DOMContentLoaded', function () {
    initRoadmap();  // Make sure to initialize the roadmap first
    const roadmapButton = document.getElementById('roadmapButton');
    roadmapButton.addEventListener('click', function() {
        // This function will trigger the recalculation of the grid layout
        refreshGrids();
    });
});

function initRoadmap() {
    var dragContainer = document.querySelector('.drag-container');
    var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
    var columnGrids = [];
    window.boardGrid = new Muuri('.board', {
        dragEnabled: true,
        dragHandle: '.board-column-header',
        layoutOnInit: true
    });

    itemContainers.forEach(function (container) {
        var grid = new Muuri(container, {
            items: '.board-item',
            dragEnabled: true,
            dragSort: function () {
                return columnGrids;
            },
            dragContainer: dragContainer
        });
        columnGrids.push(grid);
    });
    window.columnGrids = columnGrids; // Make sure grids are accessible globally or via a broader scope
}

function refreshGrids() {
    boardGrid.refreshItems().layout();
    columnGrids.forEach(grid => {
        grid.refreshItems().layout();
    });
}
