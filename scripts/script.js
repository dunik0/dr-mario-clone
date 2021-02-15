function init() {
    "use strict";

    //  Definiowanie zmiennych


    const gameArray = [];
    const animationArray = [];
    let falling = 0
    let positionLeft = { x: 3, y: 0, color: 0 };
    let positionRight = { x: 4, y: 0, color: 0 };
    let positionBottom = { x: 0, y: 0, color: 0 };
    let positionTop = { x: 0, y: 0, color: 0 };
    let nextLeft = Math.floor(Math.random() * 3) + 1
    let nextRight = Math.floor(Math.random() * 3) + 1
    let orientation = 0;
    let clearPositions = []
    let blockId = 0
    let lost = false
    let won = false
    let viruses = []
    let hasFallen = false
    let down = null
    let up = true
    let currentScore = 0
    let topScore = 0
    let countViruses = 0
    let started = false
    let dancing = null
    let moving = null
    let action = null
    const colors = ["", "brown", "blue", "yellow", "brown", "blue", "yellow"];
    const imgsLeft = ["", "url(gfx/br_left.png)", "url(gfx/bl_left.png)", "url(gfx/yl_left.png)"];
    const imgsRight = ["", "url(gfx/br_right.png)", "url(gfx/bl_right.png)", "url(gfx/yl_right.png)"];
    const imgsDown = ["", "url(gfx/br_down.png)", "url(gfx/bl_down.png)", "url(gfx/yl_down.png)"];
    const imgsUp = ["", "url(gfx/br_up.png)", "url(gfx/bl_up.png)", "url(gfx/yl_up.png)"];
    const imgsSolo = ["", "url(gfx/br_dot.png)", "url(gfx/bl_dot.png)", "url(gfx/yl_dot.png)", "url(gfx/covid_brown.png)", "url(gfx/covid_blue.png)", "url(gfx/covid_yellow.png)"];


    let howManyViruses = 4

    let borders = false




    //  Tworzenie elementów

    const main = document.createElement(`div`);
    main.id = `main`;
    document.body.appendChild(main);

    const topScoreDiv = document.createElement(`div`);
    topScoreDiv.id = `top`;
    document.body.appendChild(topScoreDiv);

    const scoreDiv = document.createElement(`div`);
    scoreDiv.id = `score`;
    document.body.appendChild(scoreDiv);

    const countVirusesDiv = document.createElement(`div`);
    countVirusesDiv.id = `countViruses`;
    document.body.appendChild(countVirusesDiv);

    const gameContainer = document.createElement(`div`);
    gameContainer.id = `gameContainer`;
    main.appendChild(gameContainer);

    const animationContainer = document.createElement(`div`);
    animationContainer.id = `animationContainer`;
    main.appendChild(animationContainer);

    const gameOver = document.createElement(`div`);
    gameOver.id = "gameOver";
    document.body.appendChild(gameOver);

    const gameOverMario = document.createElement(`div`);
    gameOverMario.id = "gameOverMario";
    document.body.appendChild(gameOverMario);

    const stageCompleted = document.createElement(`div`);
    stageCompleted.id = "stageCompleted";
    document.body.appendChild(stageCompleted);

    const brownVirus = document.createElement('div')
    brownVirus.id = "brown"
    main.appendChild(brownVirus)

    const blueVirus = document.createElement('div')
    blueVirus.id = "blue"
    main.appendChild(blueVirus)

    const yellowVirus = document.createElement('div')
    yellowVirus.id = "yellow"
    main.appendChild(yellowVirus)

    const hand = document.createElement('div')
    hand.id = "hand"
    main.appendChild(hand)

    for (let y = 0; y < 16; y++) {  // Pętla do tworzenia planszy
        /* if (y == -1) {
             for (let x = 3; x <= 4; x++) {
                 gameArray[y].push([0, 0])
                 let boardCell = document.createElement(`div`);
                 boardCell.classList.add(`boardCells`);
                 boardCell.id = `boardCell.${y}.${x}`;
                 boardCell.style.left = `${16 * x}px`;
                 boardCell.style.top = `${16 * y}px`;
                 gameContainer.appendChild(boardCell);
             }
         }
         else { */
        gameArray.push([])
        for (let x = 0; x < 8; x++) {
            gameArray[y].push([0, 0])
            let boardCell = document.createElement(`div`);
            if (borders) {
                boardCell.style.border = "rgb(226, 98, 39) 1px solid"
            }
            boardCell.classList.add(`boardCells`);
            boardCell.id = `boardCell.${y}.${x}`;
            boardCell.style.left = `${16 * x}px`;
            boardCell.style.top = `${16 * y}px`;
            gameContainer.appendChild(boardCell);
        }
        // }

    }
    for (let y = 0; y < 8; y++) {
        animationArray.push([])
        for (let x = 0; x < 12; x++) {
            animationArray[y].push(0)
            let boardCell = document.createElement(`div`);
            if (borders) {
                boardCell.style.border = "rgb(204, 204, 204) 1px solid"
            }
            boardCell.classList.add(`animationCells`);
            boardCell.id = `animationCell.${y}.${x}`;
            boardCell.style.left = `${16 * x}px`;
            boardCell.style.top = `${16 * y}px`;
            animationContainer.appendChild(boardCell);
        }

    }


    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        }
        console.log(action, up)
        if (down == null && up && started) {
            switch (event.key) {
                case "ArrowDown":
                    down = setInterval(() => {
                        game.moveDown()
                    }, 45);
                    up = false
                    break;
                case "s":
                    down = setInterval(() => {
                        game.moveDown()
                    }, 45);
                    up = false
                    break;
                case "ArrowUp":
                    game.rotateLeft();
                    up = false
                    break;
                case "w":
                    game.rotateLeft();
                    up = false
                    break;
                case "ArrowLeft":
                    game.moveLeft();
                    up = false
                    break;
                case "a":
                    game.moveLeft();
                    up = false
                    break;
                case "ArrowRight":
                    game.moveRight();
                    up = false
                    break;
                case "d":
                    game.moveRight();
                    up = false
                    break;
                case "Shift":
                    game.rotateRight();
                    up = false
                    break;

                default:
                    return;
            }
        }
        else if (action == null && down == null && !up && started) {
            move(event)
            action = setInterval(function () { move(event) }, 100);
        }
        event.preventDefault();
    })

    function move(event) {
        switch (event.key) {
            case "ArrowUp":
                game.rotateLeft();
                up = false
                break;
            case "w":
                game.rotateLeft();
                up = false
                break;
            case "ArrowLeft":
                game.moveLeft();
                up = false
                break;
            case "a":
                game.moveLeft();
                up = false
                break;
            case "ArrowRight":
                game.moveRight();
                up = false
                break;
            case "d":
                game.moveRight();
                up = false
                break;
            case "Shift":
                game.rotateRight();
                up = false
                break;

            default:
                return;
        }
    }

    window.addEventListener("keyup", function (event) {
        clearInterval(action)
        action = null
        up = true
        if (event.defaultPrevented) {
            return;
        }
        if (!up) {
            switch (event.key) {
                case "ArrowDown":
                    clearInterval(down)
                    break;
                case "s":
                    clearInterval(down)
                    break;
            }
        }
    })


    const game = {
        startGame: () => {
            score.displayTop()
            score.displayScore()
            blockId++
            orientation = 0;
            for (let x = 3; x <= 4; x++) {

                if (gameArray[0][x][0] == 0) {


                    if (x === 3) {
                        gameArray[0][x] = [nextLeft, blockId];
                        positionLeft = { x: 3, y: 0, color: nextLeft };
                        animationArray[3][10] = nextLeft
                    }
                    if (x === 4) {
                        gameArray[0][x] = [nextRight, blockId];
                        positionRight = { x: 4, y: 0, color: nextRight };
                        animationArray[3][11] = nextRight
                    }
                    game.reloadAnimation()

                }
                else {
                    lost = true
                }
            }
            if (won) {
                stageCompleted.style.zIndex = "3"
                if (currentScore > topScore) {
                    localStorage.setItem(`top`, `${currentScore}`)
                }

            }
            else if (lost) {
                gameOver.style.zIndex = "3"
                gameOverMario.style.zIndex = "3"
                loupe.laughingViruses()
            }
            else if (!won && !lost) {
                game.throw()
                setTimeout(() => {
                    started = true
                    up = true
                    game.reloadBoard()
                    game.startFalling();
                    nextLeft = Math.floor(Math.random() * 3) + 1
                    nextRight = Math.floor(Math.random() * 3) + 1
                    animationArray[3][10] = nextLeft
                    animationArray[3][11] = nextRight

                }, 450);

            }



        },
        reloadBoard: () => {
            if (!won) {
                if (started) {
                    if (orientation == 0) {
                        gameArray[positionLeft.y][positionLeft.x][0] = positionLeft.color;
                        gameArray[positionRight.y][positionRight.x][0] = positionRight.color;

                        gameArray[positionLeft.y][positionLeft.x][1] = blockId;
                        gameArray[positionRight.y][positionRight.x][1] = blockId;


                    }
                    else {
                        gameArray[positionBottom.y][positionBottom.x][0] = positionBottom.color;
                        gameArray[positionTop.y][positionTop.x][0] = positionTop.color;
                        gameArray[positionBottom.y][positionBottom.x][1] = blockId;
                        gameArray[positionTop.y][positionTop.x][1] = blockId;
                    }
                }

            }

            for (let y = 0; y < 16; y++) {
                for (let x = 0; x < 8; x++) {
                    let boardCell = document.getElementById(`boardCell.${y}.${x}`);
                    boardCell.style.backgroundColor = colors[gameArray[y][x][0]];

                    boardCell.style.backgroundImage = imgsSolo[gameArray[y][x][0]];
                    if (x < 7) {
                        if (gameArray[y][x][1] == gameArray[y][x + 1][1] && gameArray[y][x][1] != 0) {
                            boardCell.style.backgroundImage = imgsLeft[gameArray[y][x][0]];
                        }
                    }
                    if (x > 0) {
                        if (gameArray[y][x][1] == gameArray[y][x - 1][1] && gameArray[y][x][1] != 0) {
                            boardCell.style.backgroundImage = imgsRight[gameArray[y][x][0]];
                        }
                    }
                    if (y < 15) {
                        if (gameArray[y][x][1] == gameArray[y + 1][x][1] && gameArray[y][x][1] != 0) {
                            boardCell.style.backgroundImage = imgsUp[gameArray[y][x][0]];
                        }
                    }
                    if (y > 0) {
                        if (gameArray[y][x][1] == gameArray[y - 1][x][1] && gameArray[y][x][1] != 0) {
                            boardCell.style.backgroundImage = imgsDown[gameArray[y][x][0]];
                        }
                    }
                }
            }
        },
        startFalling: () => {
            falling = setInterval(game.moveDown, 400);
        },
        moveLeft: () => {
            if (orientation == 0) {
                if (positionLeft.x > 0) {
                    if (gameArray[positionLeft.y][positionLeft.x - 1][0] === 0) {
                        gameArray[positionRight.y][positionRight.x] = [0, 0];
                        positionLeft.x--;
                        positionRight.x--;
                        game.reloadBoard();
                    }
                }
            }
            else {
                if (positionBottom.x > 0) {
                    if (gameArray[positionBottom.y][positionBottom.x - 1][0] === 0 && gameArray[positionTop.y][positionTop.x - 1][0] === 0) {
                        gameArray[positionBottom.y][positionBottom.x] = [0, 0];
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionBottom.x--;
                        positionTop.x--;
                        game.reloadBoard();
                    }
                }
            }
        },
        moveRight: () => {
            if (orientation == 0) {
                if (positionRight.x < 7) {
                    if (gameArray[positionRight.y][positionRight.x + 1][0] === 0) {
                        gameArray[positionLeft.y][positionLeft.x] = [0, 0];
                        positionLeft.x++;
                        positionRight.x++;
                        game.reloadBoard();
                    }
                }
            }
            else {
                if (positionBottom.x < 7) {
                    if (gameArray[positionBottom.y][positionBottom.x + 1][0] === 0 && gameArray[positionTop.y][positionTop.x + 1][0] === 0) {
                        gameArray[positionBottom.y][positionBottom.x] = [0, 0];
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionBottom.x++;
                        positionTop.x++;
                        game.reloadBoard();
                    }
                }
            }
        },
        moveDown: () => {
            if (orientation == 0) {
                if (positionLeft.y < 15 && positionRight.y < 15) {
                    if (gameArray[positionLeft.y + 1][positionLeft.x][0] === 0 && gameArray[positionRight.y + 1][positionRight.x][0] === 0) {
                        positionLeft.y++;
                        positionRight.y++;
                        gameArray[positionLeft.y - 1][positionLeft.x] = [0, 0];
                        gameArray[positionRight.y - 1][positionRight.x] = [0, 0];
                        game.reloadBoard();
                    }
                    else {
                        game.reloadBoard()
                        clearInterval(falling);
                        clearInterval(down);
                        down = null
                        started = false

                        game.clearHorizontal();
                        game.clearVertical();

                        game.clearAll();


                    }
                }
                else {
                    game.reloadBoard()
                    clearInterval(falling);
                    clearInterval(down);
                    down = null
                    started = false

                    game.clearHorizontal();
                    game.clearVertical();

                    game.clearAll();


                }
            }
            else {
                if (positionBottom.y < 15) {
                    if (gameArray[positionBottom.y + 1][positionBottom.x][0] === 0) {
                        positionBottom.y++;
                        positionTop.y++;
                        gameArray[positionTop.y - 1][positionTop.x] = [0, 0];
                        game.reloadBoard();
                    }
                    else {
                        game.reloadBoard()
                        clearInterval(falling);
                        clearInterval(down);
                        down = null
                        started = false

                        game.clearHorizontal();
                        game.clearVertical();

                        game.clearAll();


                    }
                }
                else {
                    game.reloadBoard()
                    clearInterval(falling);
                    clearInterval(down);
                    down = null
                    started = false

                    game.clearHorizontal();
                    game.clearVertical();

                    game.clearAll();



                }
            }

        },
        rotateLeft: () => {
            if (orientation == 0 && positionLeft.y > 0) {
                if (gameArray[positionLeft.y - 1][positionLeft.x][0] === 0) {
                    orientation = 1;
                    gameArray[positionRight.y][positionRight.x] = [0, 0];
                    positionRight.y--;
                    positionRight.x--;
                    positionBottom = positionLeft;
                    positionTop = positionRight;
                    game.reloadBoard();
                }
            }
            else if (orientation == 1 && positionLeft.y > 0) {
                if (positionBottom.x < 7) {
                    if (gameArray[positionBottom.y][positionBottom.x + 1][0] === 0) {
                        orientation = 0;
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionTop.y++;
                        positionBottom.x++;
                        positionRight = positionBottom;
                        positionLeft = positionTop;
                        game.reloadBoard();
                    }
                    else if (gameArray[positionBottom.y][positionBottom.x - 1][0] === 0) {
                        orientation = 0;
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionTop.y++;
                        positionTop.x--;
                        positionRight = positionBottom;
                        positionLeft = positionTop;
                        game.reloadBoard();
                    }
                }
                else {
                    if (gameArray[positionBottom.y][positionBottom.x - 1][0] === 0) {
                        orientation = 0;
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionTop.y++;
                        positionTop.x--;
                        positionRight = positionBottom;
                        positionLeft = positionTop;
                        game.reloadBoard();
                    }
                }

            }

        },
        rotateRight: () => {
            if (orientation == 0 && positionLeft.y > 0) {
                if (gameArray[positionLeft.y - 1][positionLeft.x][0] === 0) {
                    orientation = 1;
                    gameArray[positionRight.y][positionRight.x] = [0, 0];
                    positionLeft.y--;
                    positionRight.x--;
                    positionBottom = positionRight;
                    positionTop = positionLeft;
                    game.reloadBoard();
                }
            }
            else if (orientation == 1 && positionLeft.y > 0) {
                if (positionBottom.x < 7) {
                    if (gameArray[positionBottom.y][positionBottom.x + 1][0] === 0) {
                        orientation = 0;
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionTop.y++;
                        positionTop.x++;
                        positionLeft = positionBottom;
                        positionRight = positionTop;
                        game.reloadBoard();
                    }
                    else if (gameArray[positionBottom.y][positionBottom.x - 1][0] === 0) {
                        orientation = 0;
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionBottom.x--;
                        positionTop.y++;
                        positionLeft = positionBottom;
                        positionRight = positionTop;
                        game.reloadBoard();
                    }
                }
                else {
                    if (gameArray[positionBottom.y][positionBottom.x - 1][0] === 0) {
                        orientation = 0;
                        gameArray[positionTop.y][positionTop.x] = [0, 0];
                        positionBottom.x--;
                        positionTop.y++;
                        positionLeft = positionBottom;
                        positionRight = positionTop;
                        game.reloadBoard();
                    }
                }
            }

        },
        clearHorizontal: () => {
            for (let y = 0; y < 16; y++) {
                for (let x = 0; x < 5; x++) {
                    if (gameArray[y][x][0] !== 0) {
                        let count = 1
                        let i = 0
                        for (let p = 0; p < 8 - x; p++) {
                            if (document.getElementById(`boardCell.${y}.${x + i}`).style.backgroundColor === document.getElementById(`boardCell.${y}.${x}`).style.backgroundColor) {
                                i++
                                count++
                            }
                            else {
                                break
                            }
                        }
                        if (count > 4) {
                            for (let o = 0; o < i; o++) {
                                clearPositions.push({ y: y, x: x + o })
                            }
                        }
                    }
                }
            }
        },
        clearVertical: () => {
            for (let y = 0; y < 13; y++) {
                for (let x = 0; x < 8; x++) {
                    if (gameArray[y][x][0] !== 0) {
                        let count = 1
                        let i = 0
                        for (let p = 0; p < 16 - y; p++) {
                            if (document.getElementById(`boardCell.${y + i}.${x}`).style.backgroundColor === document.getElementById(`boardCell.${y}.${x}`).style.backgroundColor) {
                                i++
                                count++
                            }
                            else {
                                break
                            }
                        }
                        if (count > 4) {
                            for (let o = 0; o < i; o++) {
                                clearPositions.push({ y: y + o, x: x })
                            }
                        }
                    }
                }
            }
        },
        clearAll: () => {
            game.reloadBoard()
            positionLeft = { x: 3, y: 0, color: 0 };
            positionRight = { x: 4, y: 0, color: 0 };
            positionBottom = { x: 0, y: 0, color: 0 };
            positionTop = { x: 0, y: 0, color: 0 };
            for (let i = 0; i < clearPositions.length; i++) {
                const imgs = ["", "url(gfx/br_o.png)", "url(gfx/bl_o.png)", "url(gfx/yl_o.png)", "url(gfx/br_x.png)", "url(gfx/bl_x.png)", "url(gfx/yl_x.png)"]
                document.getElementById(`boardCell.${clearPositions[i].y}.${clearPositions[i].x}`).style.backgroundImage = imgs[gameArray[clearPositions[i].y][clearPositions[i].x][0]]
                console.log(document.getElementById(`boardCell.${clearPositions[i].y}.${clearPositions[i].x}`).style.backgroundImage)

            }
            for (let o = 0; o < clearPositions.length; o++) {
                gameArray[clearPositions[o].y][clearPositions[o].x] = [0, 0]

            }
            clearPositions = []
            console.log(Date())
            setTimeout(() => {
                console.log(Date())
                game.fall()
                game.reloadBoard()
            }, 50);


        },
        spawnViruses: () => {
            countViruses = 0
            let colors = [0, 0, 0]
            for (let o = 0; o < 3; o++) {
                let color = Math.floor(Math.random() * 3) + 4;
                while (color == colors[0] || color == colors[1] || color == colors[2]) {
                    color = Math.floor(Math.random() * 3) + 4;
                }
                colors[o] = color
            }
            for (let i = 0; i < howManyViruses; i++) {
                countViruses++
                let x = Math.floor(Math.random() * 7);
                let y = Math.floor(Math.random() * 11) + 5;
                while (gameArray[y][x][0] != 0) {
                    x = Math.floor(Math.random() * 7);
                    y = Math.floor(Math.random() * 11) + 5;
                }
                gameArray[y][x] = [colors[i % 3], 0]
                viruses.push({ x: x, y: y })
            }
            game.reloadBoard()
            score.displayVirus()
        },
        fall: () => {
            hasFallen = false
            for (let y = 14; y >= 0; y--) {
                for (let x = 0; x < 8; x++) {
                    if (gameArray[y][x][1] != 0 && gameArray[y][x][0] != 0) {
                        let blocks = 0
                        let offset = 0
                        if (x > 0 && x < 7) {
                            if (gameArray[y][x + 1][1] == gameArray[y][x][1] || gameArray[y][x - 1][1] == gameArray[y][x][1]) {
                                if (gameArray[y][x - 1][1] == gameArray[y][x][1]) {
                                    blocks = 2
                                    offset = -1
                                }
                                else {
                                    blocks = 2
                                    offset = 1
                                }
                            }
                            else {
                                blocks = 1
                            }
                        }
                        else if (x == 0) {
                            if (gameArray[y][x + 1][1] == gameArray[y][x][1]) {
                                blocks = 2
                                offset = 1
                            }
                            else {
                                blocks = 1
                            }
                        }
                        else {
                            if (gameArray[y][x - 1][1] == gameArray[y][x][1]) {
                                blocks = 2
                                offset = -1
                            }
                            else {
                                blocks = 1
                            }
                        }
                        if (blocks == 2) {
                            let y2 = y + 1
                            let falling2 = setInterval(function () {
                                if (gameArray[y2][x][0] == 0 && gameArray[y2][x + offset][0] == 0) {
                                    hasFallen = true
                                    const old1 = gameArray[y2 - 1][x]
                                    const old2 = gameArray[y2 - 1][x + offset]
                                    gameArray[y2][x] = old1
                                    gameArray[y2][x + offset] = old2
                                    gameArray[y2 - 1][x] = [0, 0]
                                    gameArray[y2 - 1][x + offset] = [0, 0]
                                    y2++
                                    game.reloadBoard()
                                    if (y2 == 16) {
                                        clearInterval(falling2)
                                    }
                                } else {
                                    clearInterval(falling2)
                                }
                            }, 45)
                        }
                        else if (blocks == 1) {
                            let y2 = y + 1
                            let falling2 = setInterval(function () {
                                if (gameArray[y2][x][0] == 0) {
                                    hasFallen = true
                                    const old = gameArray[y2 - 1][x]
                                    gameArray[y2][x] = old
                                    gameArray[y2 - 1][x] = [0, 0]
                                    y2++
                                    game.reloadBoard()
                                    if (y2 == 16) {
                                        clearInterval(falling2)
                                    }
                                } else {
                                    clearInterval(falling2)
                                }
                            }, 45)
                        }
                    }
                    if (x == 7 && y == 0) {
                        setTimeout(() => {
                            game.win()
                        }, 50)
                    }
                }
            }

        },
        win: () => {
            for (let i = 0; i < viruses.length; i++) {
                if (gameArray[viruses[i].y][viruses[i].x][0] < 4) {
                    viruses.splice(i, 1)
                    countViruses--
                    score.displayVirus()
                    currentScore += 100
                    score.displayScore()
                }
            }
            if (!won) {
                if (viruses.length == 0) {
                    won = true
                    game.reloadBoard()
                }
            }
            if (!lost) {
                setTimeout(function () {
                    if (!hasFallen) {
                        game.startGame()
                    }
                    else {
                        game.clearHorizontal()
                        game.clearVertical()
                        game.clearAll()
                    }
                }, 500)



            }
        },
        throw: () => {
            const frames = [
                { leftPill: { x: 10, y: 3 }, rightPill: { x: 11, y: 3 }, hand: 0 },
                { leftPill: { x: 10, y: 3 }, rightPill: { x: 10, y: 2 }, hand: 0 },
                { leftPill: { x: 10, y: 2 }, rightPill: { x: 9, y: 2 }, hand: 0 },
                { leftPill: { x: 9, y: 1 }, rightPill: { x: 9, y: 2 }, hand: 0 },
                { leftPill: { x: 8, y: 1 }, rightPill: { x: 9, y: 1 }, hand: 1 },
                { leftPill: { x: 8, y: 1 }, rightPill: { x: 8, y: 0 }, hand: 1 },
                { leftPill: { x: 8, y: 1 }, rightPill: { x: 7, y: 1 }, hand: 1 },
                { leftPill: { x: 7, y: 0 }, rightPill: { x: 7, y: 1 }, hand: 2 },
                { leftPill: { x: 6, y: 1 }, rightPill: { x: 7, y: 1 }, hand: 2 },
                { leftPill: { x: 6, y: 1 }, rightPill: { x: 6, y: 0 }, hand: 2 },
                { leftPill: { x: 6, y: 1 }, rightPill: { x: 5, y: 1 }, hand: 2 },
                { leftPill: { x: 5, y: 0 }, rightPill: { x: 5, y: 1 }, hand: 2 },
                { leftPill: { x: 4, y: 1 }, rightPill: { x: 5, y: 1 }, hand: 2 },
                { leftPill: { x: 4, y: 1 }, rightPill: { x: 4, y: 0 }, hand: 2 },
                { leftPill: { x: 4, y: 1 }, rightPill: { x: 3, y: 1 }, hand: 2 },
                { leftPill: { x: 3, y: 0 }, rightPill: { x: 3, y: 1 }, hand: 2 },
                { leftPill: { x: 2, y: 1 }, rightPill: { x: 3, y: 1 }, hand: 2 },
                { leftPill: { x: 2, y: 1 }, rightPill: { x: 2, y: 0 }, hand: 2 },
                { leftPill: { x: 2, y: 2 }, rightPill: { x: 1, y: 2 }, hand: 2 },
                { leftPill: { x: 1, y: 1 }, rightPill: { x: 1, y: 2 }, hand: 2 },
                { leftPill: { x: 0, y: 2 }, rightPill: { x: 1, y: 2 }, hand: 2 },
                { leftPill: { x: 0, y: 3 }, rightPill: { x: 1, y: 3 }, hand: 2 },
                { leftPill: { x: 0, y: 4 }, rightPill: { x: 1, y: 4 }, hand: 2 },
                { leftPill: { x: 0, y: 5 }, rightPill: { x: 1, y: 5 }, hand: 2 }
            ]
            let frame = 1
            let throwingAnimation = setInterval(function () {
                document.getElementById('hand').style.backgroundImage = `url(gfx/hands/${frames[frame].hand}.png)`

                let colorLeft = animationArray[frames[frame - 1].leftPill.y][frames[frame - 1].leftPill.x]
                let colorRight = animationArray[frames[frame - 1].rightPill.y][frames[frame - 1].rightPill.x]

                animationArray[frames[frame - 1].leftPill.y][frames[frame - 1].leftPill.x] = 0
                animationArray[frames[frame - 1].rightPill.y][frames[frame - 1].rightPill.x] = 0

                animationArray[frames[frame].leftPill.y][frames[frame].leftPill.x] = colorLeft
                animationArray[frames[frame].rightPill.y][frames[frame].rightPill.x] = colorRight


                game.reloadAnimation()
                frame++
                if (frame == 24) {
                    clearInterval(throwingAnimation)
                    document.getElementById('hand').style.backgroundImage = `url(gfx/hands/0.png)`
                    animationArray[frames[frame - 1].leftPill.y][frames[frame - 1].leftPill.x] = 0
                    animationArray[frames[frame - 1].rightPill.y][frames[frame - 1].rightPill.x] = 0
                    setTimeout(() => {
                        game.reloadAnimation()
                    }, 20);
                }
            }, 20);
        },
        reloadAnimation: () => {
            for (let y = 0; y < 8; y++) {
                for (let x = 0; x < 12; x++) {

                    let animationCell = document.getElementById(`animationCell.${y}.${x}`);
                    document.getElementById(`animationCell.${y}.${x}`).style.backgroundColor = colors[animationArray[y][x]]

                    document.getElementById(`animationCell.${y}.${x}`).style.backgroundImage = imgsSolo[animationArray[y][x]]

                    if (x < 11) {
                        if (animationArray[y][x] != 0 && animationArray[y][x + 1] != 0) {
                            animationCell.style.backgroundImage = imgsLeft[animationArray[y][x]];
                        }
                    }
                    if (x > 0) {
                        if (animationArray[y][x] != 0 && animationArray[y][x - 1] != 0) {
                            animationCell.style.backgroundImage = imgsRight[animationArray[y][x]];
                        }
                    }
                    if (y < 7) {
                        if (animationArray[y][x] != 0 && animationArray[y + 1][x] != 0) {
                            animationCell.style.backgroundImage = imgsUp[animationArray[y][x]];
                        }
                    }
                    if (y > 0) {
                        if (animationArray[y][x] != 0 && animationArray[y - 1][x] != 0) {
                            animationCell.style.backgroundImage = imgsDown[animationArray[y][x]];
                        }
                    }
                }
            }
        }
    }


    const score = {
        displayVirus: () => {
            if (countViruses.toString().length < 2) {
                countViruses = "0" + countViruses
            }
            else {
                countViruses = countViruses.toString()
            }
            countVirusesDiv.innerHTML = `
            <img class="digit" src="gfx/digits/${countViruses[0]}.png">
            <img class="digit" src="gfx/digits/${countViruses[1]}.png">
            `
        },
        displayTop: () => {
            if (!localStorage.getItem('top')) {
                localStorage.setItem('top', `${topScore}`)
            }
            topScore = localStorage.getItem('top')
            if (topScore.toString().length < 7) {
                let zeros = 7 - topScore.toString().length
                for (let i = 0; i < zeros; i++) {
                    topScore = "0" + topScore
                }
            }
            topScoreDiv.innerHTML = `
            <img class="digit" src="gfx/digits/${topScore[0]}.png">
            <img class="digit" src="gfx/digits/${topScore[1]}.png">
            <img class="digit" src="gfx/digits/${topScore[2]}.png">
            <img class="digit" src="gfx/digits/${topScore[3]}.png">
            <img class="digit" src="gfx/digits/${topScore[4]}.png">
            <img class="digit" src="gfx/digits/${topScore[5]}.png">
            <img class="digit" src="gfx/digits/${topScore[6]}.png">
            `
        },
        displayScore: () => {
            let oldCurrentScore = currentScore
            if (currentScore.toString().length < 7) {
                let zeros = 7 - currentScore.toString().length
                for (let i = 0; i < zeros; i++) {
                    currentScore = "0" + currentScore
                }
            }
            scoreDiv.innerHTML = `
            <img class="digit" src="gfx/digits/${currentScore[0]}.png">
            <img class="digit" src="gfx/digits/${currentScore[1]}.png">
            <img class="digit" src="gfx/digits/${currentScore[2]}.png">
            <img class="digit" src="gfx/digits/${currentScore[3]}.png">
            <img class="digit" src="gfx/digits/${currentScore[4]}.png">
            <img class="digit" src="gfx/digits/${currentScore[5]}.png">
            <img class="digit" src="gfx/digits/${currentScore[6]}.png">
            `
            currentScore = oldCurrentScore
        }
    }

    const loupe = {
        dancingViruses: () => {

            let interval = 1
            let loop = 0
            dancing = setInterval(() => {
                brownVirus.style.backgroundImage = `url(gfx/loupe/br/${interval}.png)`
                blueVirus.style.backgroundImage = `url(gfx/loupe/bl/${interval}.png)`
                yellowVirus.style.backgroundImage = `url(gfx/loupe/yl/${interval}.png)`
                if (loop % 2 == 0) {
                    interval++
                } else {
                    interval--
                }
                if (interval == 3 || interval == 1) {
                    loop++
                }
            }, 250);
        },
        movingViruses: () => {
            const positions = [
                { top: "261px", left: "37px" },
                { top: "271px", left: "37px" },
                { top: "287px", left: "47px" },
                { top: "301px", left: "50px" },
                { top: "305px", left: "65px" },
                { top: "311px", left: "80px" },

                { top: "311px", left: "103px" },
                { top: "306px", left: "109px" },
                { top: "290px", left: "127px" },
                { top: "274px", left: "131px" },
                { top: "256px", left: "126px" },
                { top: "240px", left: "123px" },

                { top: "227px", left: "115px" },
                { top: "222px", left: "98px" },
                { top: "222px", left: "77px" },
                { top: "225px", left: "65px" },
                { top: "241px", left: "47px" },
                { top: "261px", left: "37px" }
            ]
            let interval = 1
            let offsetBlue = 6
            let offsetYellow = 12
            moving = setInterval(() => {
                brownVirus.style.top = positions[interval].top
                brownVirus.style.left = positions[interval].left
                blueVirus.style.top = positions[interval + offsetBlue].top
                blueVirus.style.left = positions[interval + offsetBlue].left
                yellowVirus.style.top = positions[interval + offsetYellow].top
                yellowVirus.style.left = positions[interval + offsetYellow].left
                interval++
                if (interval == 18) {
                    interval = 0
                    offsetBlue = 6
                    offsetYellow = 12
                }
                if (offsetBlue + interval == 18) {
                    offsetBlue = -12
                }
                if (offsetYellow + interval == 18) {
                    offsetYellow = -6
                }
            }, 1000);
        },
        laughingViruses: () => {
            clearInterval(dancing)
            clearInterval(moving)
            let interval = 2
            setInterval(() => {
                brownVirus.style.backgroundImage = `url(gfx/loupe/br/${interval}.png)`
                blueVirus.style.backgroundImage = `url(gfx/loupe/bl/${interval}.png)`
                yellowVirus.style.backgroundImage = `url(gfx/loupe/yl/${interval}.png)`
                if (interval == 2) {
                    interval = 4
                }
                else {
                    interval = 2
                }
            }, 250);
        }
    }
    loupe.movingViruses()
    loupe.dancingViruses()
    game.spawnViruses();
    game.startGame();

    if (borders) {
        brownVirus.style.border = "rgb(226, 98, 39) 1px solid"
        blueVirus.style.border = "rgb(226, 98, 39) 1px solid"
        yellowVirus.style.border = "rgb(226, 98, 39) 1px solid"
        topScoreDiv.style.border = "rgb(226, 98, 39) 1px solid"
        scoreDiv.style.border = "rgb(226, 98, 39) 1px solid"
        countVirusesDiv.style.border = "rgb(226, 98, 39) 1px solid"
    }
}