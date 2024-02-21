function player(name,symbol){
    this.name=name;
    this.symbol=symbol;
}
const gameBoard = (function(){
    const board = [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ];
    function displayBoard(){
        rowOne = board[0].toString() + " " + board[1].toString() + " " + board[2].toString();
        rowTwo= board[3].toString() + " " + board[4].toString() + " " + board[5].toString();
        rowThree = board[6].toString() + " " + board[7].toString() + " " + board[8].toString();
        console.log(rowOne);
        console.log(rowTwo);
        console.log(rowThree);
    }
    function opponentTurn(){
        index=(Math.floor(Math.random() * board.length));
        while(board[index]==playerSymbol || board[index]==opSymbol && board.includes(0)){
            index=(Math.floor(Math.random() * board.length));
        }
        placeSymbol(opSymbol,index);
    }
    function placeSymbol(symbol, spot){
        if(board[spot]==0){
            board[spot]=symbol;
        };
    }
    function checkWin(symbol){
        if(!0 in board){
            return false;
        }
        //check rows
        if(board[0] == symbol && board[1] == symbol && board[2] == symbol){ return true}
        else if (board[3] == symbol && board[4] == symbol && board[5] == symbol){ return true}
        else if(board[6] == symbol && board[7] == symbol && board[8] == symbol){ return true}
        //check columns
        else if(board[0] == symbol && board[3] == symbol && board[6] == symbol){ return true}
        else if(board[1] == symbol && board[4] == symbol && board[7] == symbol){ return true}
        else if(board[2] == symbol && board[5] == symbol && board[8] == symbol){ return true}
        //check diagonals
        else if(board[0] == symbol && board[4] == symbol && board[8] == symbol){ return true}
        else if(board[2] == symbol && board[4] == symbol && board[6] == symbol){ return true}
        else {return false};
    }
    function draw(){
        if (!board.includes(0)) {return true}
        else {return false};
    }
    let playerName="Default"
    let playerSymbol="X"
    let opSymbol="O"
    function createPlayer(name, symbol){
        playerName=name;
        playerSymbol=symbol;
        if (playerSymbol=='X'){opSymbol='O'}
        else (opSymbol = 'X');
    }
    function playGame(){
        while(!checkWin(playerSymbol) && !checkWin(opSymbol) && !draw()){
            let spot=prompt("pick a spot");
            placeSymbol('X',spot);
            console.log("Okay, now this is the board");
            displayBoard();
            opponentTurn();
            console.log("The opponent has finished their turn, now this is the board");
            displayBoard();
        }
    }
    return{
        createPlayer,
        placeSymbol,
        displayBoard,
        checkWin,
        opponentTurn,
        playGame
    };
})();

gameBoard.playGame();