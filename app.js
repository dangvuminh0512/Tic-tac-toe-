const startGame = document.querySelector(".start-game");
        const twoPlayerButton = document.querySelector(".two-player");
        const singlePlayerButton = document.querySelector(".single-player");
        const returnButton = document.querySelector("#go-back");
        const restartButton = document.querySelector("#restart");
        const statusText = document.querySelector("#status-text");
        const cells = document.querySelectorAll(".cell");
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let currentPlayer = "X";
        let running = false;
        let singlePlayerMode = false;
        let options = ["", "", "", "", "", "", "", "", ""];

        startGame.addEventListener("click", showMenu2);
        twoPlayerButton.addEventListener("click", startGameTwoPlayer);
        singlePlayerButton.addEventListener("click", startGameSinglePlayer);
        returnButton.addEventListener("click", returnToMenu);
        restartButton.addEventListener("click", restartGame);
        cells.forEach(cell => cell.addEventListener("click", cellClicked));

        function showMenu2() {
            const menu = document.querySelector(".menu");
            const menu2 = document.querySelector(".menu2");

            menu.style.display = "none";
            menu2.style.display = "block";
        }

        function startGameTwoPlayer() {
            startGameMode(false); // Pass false for two-player mode
        }

        function startGameSinglePlayer() {
            singlePlayerMode = true;
            startGameMode(true); // Pass true for single-player mode
        }

        function startGameMode(isSinglePlayer) {
            const menu2 = document.querySelector(".menu2");
            const game = document.querySelector(".game");

            menu2.style.display = "none";
            game.style.display = "block";

            singlePlayerMode = isSinglePlayer;
            initializeGame();
        }

        function returnToMenu() {
            const menu = document.querySelector(".menu");
            const game = document.querySelector(".game");

            game.style.display = "none";
            menu.style.display = "block";
            resetGame();
        }

        function initializeGame() {
            currentPlayer = "X";
            running = true;
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer}'s turn`;
            cells.forEach(cell => cell.textContent = "");
        }

        function cellClicked() {
            const cellIndex = parseInt(this.getAttribute("cellIndex"));
            if (options[cellIndex] !== "" || !running) {
                return;
            }
            updateCell(this, cellIndex);
            checkWinner();
        }

        function updateCell(cell, index) {
            options[index] = currentPlayer;
            cell.textContent = currentPlayer;
        }

        function changePlayer() {
            currentPlayer = (currentPlayer === "X") ? "O" : "X";
            statusText.textContent = `${currentPlayer}'s turn`;
        }

        function checkWinner() {
            let roundWon = false;

            for (const condition of winConditions) {
                const [a, b, c] = condition;
                if (options[a] !== "" && options[a] === options[b] && options[b] === options[c]) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                statusText.textContent = `${currentPlayer} wins!`;
                running = false;
            } else if (!options.includes("")) {
                statusText.textContent = "Draw!";
                running = false;
            } else {
                changePlayer();
                if (singlePlayerMode && currentPlayer === "O") {
                    // Bot's turn in single-player mode
                    setTimeout(makeBotMove, 1000); // Delay bot move for 1 second (adjust as needed)
                }
            }
        }

        function makeBotMove() {
            if (!running) {
                return;
            }

            const emptyCells = options.reduce((acc, val, index) => {
                if (val === "") {
                    acc.push(index);
                }
                return acc;
            }, []);

            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const botCellIndex = emptyCells[randomIndex];
                const botCell = cells[botCellIndex];

                updateCell(botCell, botCellIndex);
                checkWinner();
            }
        }

        function restartGame() {
            initializeGame();
        }

        function resetGame() {
            currentPlayer = "X";
            running = false;
            singlePlayerMode = false;
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = "";
            cells.forEach(cell => cell.textContent = "");
        }