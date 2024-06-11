// Event listener for when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    initMenus();
    initModals();
    initForms();
    initLanguageSelector();
    initGameModalControls();
    initRoadmap();
});

// Event listener for when the entire page, including stylesheets and images, is fully loaded
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    document.body.style.overflow = 'auto';
    initSnakeGame();
});

// Initializes menu interactions
function initMenus() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId === 'contact') {
                document.getElementById('contactModal').style.display = 'flex';
            } else {
                showSection(targetId);
            }
        });
    });
}

function showSection(targetId) {
    const contentSections = document.querySelectorAll('.content');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 20);
    }
}

// Initializes modal interactions
function initModals() {
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('contactModal').style.display = 'none';
            document.getElementById('gameModal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('contactModal')) {
            document.getElementById('contactModal').style.display = 'none';
        }
        if (e.target === document.getElementById('gameModal')) {
            document.getElementById('gameModal').style.display = 'none';
        }
    });
}

// Initializes forms
function initForms() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (validateEmail(email) && message.trim() !== "") {
            formMessage.textContent = "Thank you for your message!";
            formMessage.style.color = 'green';
            formMessage.style.display = 'block';
            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = 'none';
                document.getElementById('contactModal').style.display = 'none';
            }, 3000);
        } else {
            formMessage.textContent = "Please enter a valid email and message.";
            formMessage.style.color = 'red';
            formMessage.style.display = 'block';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
}

// Initializes the language selector
function initLanguageSelector() {
    const languageSelect = document.getElementById('languageSelect');
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLanguage;
    setLanguage(savedLanguage);

    languageSelect.addEventListener('change', (e) => {
        const language = e.target.value;
        setLanguage(language);
        localStorage.setItem('language', language);
    });

    function setLanguage(language) {
        document.querySelectorAll('[data-en]').forEach(element => {
            element.textContent = element.getAttribute(`data-${language}`);
        });
    }
}

// Initializes the game modal controls
function initGameModalControls() {
    const openGameButton = document.getElementById('open-game');
    const fullscreenButton = document.getElementById('fullscreen-button');

    openGameButton.addEventListener('click', () => {
        document.getElementById('gameModal').style.display = 'flex';
    });

    fullscreenButton.addEventListener('click', () => {
        const canvas = document.getElementById('snake-canvas');
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }
    });
}

// Initializes the snake game
function initSnakeGame() {
    var canvas = document.getElementById('snake-canvas');
    if (!canvas) {
        return;
    }
    var ctx = canvas.getContext('2d');
    var delay = 75; // ms
    var blocksize = 30; // px
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

        this.setDirection = function (vx, vy) {
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
            if (this.body[this.body.length - 1][0] < 0 || this.body[this.body.length - 1][0] > canvas.width - blocksize
                || this.body[this.body.length - 1][1] < 0 || this.body[this.body.length - 1][1] > canvas.height - blocksize) {
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
                case 37: // Left arrow
                    pushX = -30; pushY = 0;
                    break;
                case 38: // Up arrow
                    pushX = 0; pushY = -30;
                    break;
                case 39: // Right arrow
                    pushX = 30; pushY = 0;
                    break;
                case 40: // Down arrow
                    pushX = 0; pushY = 30;
                    break;
            }
            snake.setDirection(pushX, pushY);
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
        var body = [[360, 270], [390, 270], [420, 270], [450, 270]]; // center the snake
        snake = new Snake(body, 30, 0);
    }

    window.initGame = init; // Make initGame function globally accessible
}

// Initializes the roadmap functionality
function initRoadmap() {
    var dragContainer = document.querySelector('.drag-container');
    var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
    var columnGrids = [];
    var boardGrid;

    itemContainers.forEach(function(container) {
        var grid = new Muuri(container, {
            items: '.board-item',
            dragEnabled: true,
            dragSort: function() {
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
        }).on('dragStart', function(item) {
            item.getElement().style.width = item.getWidth() + 'px';
            item.getElement().style.height = item.getHeight() + 'px';
        }).on('dragReleaseEnd', function(item) {
            item.getElement().style.width = '';
            item.getElement().style.height = '';
            item.getGrid().refreshItems([item]);
        }).on('layoutStart', function() {
            boardGrid.refreshItems().layout();
        });

        columnGrids.push(grid);
    });

    boardGrid = new Muuri('.board', {
        dragEnabled: true,
        dragHandle: '.board-column-header',
        layoutOnInit: true
    });

    window.addEventListener('resize', function() {
        boardGrid.refreshItems().layout();
        columnGrids.forEach(function(grid) {
            grid.refreshItems().layout();
        });
    });

    setTimeout(function() {
        boardGrid.refreshItems().layout();
        columnGrids.forEach(function(grid) {
            grid.refreshItems().layout();
        });
    }, 500);
}

function refreshGrids() {
    boardGrid.refreshItems().layout();
    columnGrids.forEach(grid => {
        grid.refreshItems().layout();
    });
}


// Adding a click listener to the "roadmap" section to refresh grids
document.getElementById('roadmap-section').addEventListener('click', function() {
    refreshGrids();
});

// Adding a key listener for launching the snake game when the spacebar is pressed
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        initSnakeGame();
    }
});
