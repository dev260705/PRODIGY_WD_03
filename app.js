const boardElement = document.getElementById('board');
        const statusElement = document.getElementById('status');
        const restartButton = document.getElementById('restart');

        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let gameActive = true;

        function renderBoard() {
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (cell !== '') {
                    cellElement.classList.add('taken');
                }
                cellElement.textContent = cell;
                cellElement.addEventListener('click', () => handleCellClick(index));
                boardElement.appendChild(cellElement);
            });
        }

        function handleCellClick(index) {
            if (board[index] !== '' || !gameActive) {
                return;
            }

            board[index] = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            renderBoard();
            if (gameActive) {
                statusElement.textContent = `Player ${currentPlayer}'s turn`;
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            winningCombinations.forEach(combination => {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    statusElement.textContent = `Player ${board[a]} wins!`;
                    gameActive = false;
                }
            });

            if (!board.includes('') && gameActive) {
                statusElement.textContent = 'Draw!';
                gameActive = false;
            }
        }

        restartButton.addEventListener('click', () => {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
            renderBoard();
        });

        renderBoard();
        statusElement.textContent = `Player ${currentPlayer}'s turn`;