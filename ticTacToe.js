function player(name,symbol){
    this.name=name;
    this.symbol=symbol;
}
const gameBoard = (function(){
    let board = [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ];
    let playerName="Default"
    let playerSymbol="X"
    let opSymbol="O"
    let spot=-1;
    let gameEnd=false;
    let gameStart=false;
    let symbolChosen=false;
    let squares=document.getElementsByClassName("square");
    let symbols=document.getElementsByClassName("symbol");
    let restart = document.getElementById("reset");
    symbolChosen=true;
    symbols[0].disabled="disabled";
    symbols[1].disabled=false;
    function reset(){
        board = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ];
        playerName="Default"
        playerSymbol="X"
        opSymbol="O"
        spot=-1;
        gameEnd=false;
        gameStart=false;
        symbolChosen=true;
        symbols[0].disabled="disabled";
        symbols[1].disabled=false;
        for(let i = 0; i<squares.length;i++){
            squares[i].innerHTML="";
            squares[i].disabled=false;
        }
        
    }
    function setResetButton(){
        restart.addEventListener("click",function(){
            reset();
        })
    }
    function setChooseSymbolButtons(){
        symbols[0].addEventListener("click",function(){
            reset();
            playerSymbol="X";
            opSymbol="O";
            symbolChosen=true;
            symbols[0].disabled="disabled";
            symbols[1].disabled=false;
            
        })

        symbols[1].addEventListener("click",function(){
            reset();
            playerSymbol="O";
            opSymbol="X";
            symbolChosen=true;
            symbols[1].disabled="disabled";
            symbols[0].disabled=false;
            
        })
    }
    function setBoardButtons(){
        for(let i = 0; i<squares.length; i++){
            (function(index){
                squares[index].addEventListener("click",function(){
                    if(!gameEnd && !checkTie() &&symbolChosen){
                        gameStart=true;
                        gameBoard[index]=playerSymbol;
                        spot=index;

                        placeSymbol(playerSymbol,spot);
                        squares[index].innerHTML=playerSymbol;
                        gameEnd=checkWin(playerSymbol);
                        if(checkWin(playerSymbol)){setTimeout(()=>alert("YOU WIN!"));return}
                        
                        

                        opIndex=opponentTurn();
                        squares[opIndex].innerHTML=opSymbol;
                        gameEnd=checkWin(opSymbol);
                        if (checkWin(opSymbol)){setTimeout(()=>alert("YOU Lose!"));return}

                        squares[index].disabled="disabled";
                        squares[opIndex].disabled="disabled";
                        checkTie();
                    }
                    
                    
                })
            })(i);
    }
    }
    function checkTie(){
        if(!board.includes(0) && (!gameEnd &&!checkWin(playerSymbol) && !checkWin(opSymbol))){
            alert("It's a tie!");
            gameEnd=true;
            return true;
        }
        else{
            gameEnd=false;
            return false;
        };
    }
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
        return index;
    }
    function placeSymbol(symbol, spot){
        if(board[spot]==0){
            board[spot]=symbol;
        };
    }
    function checkWin(symbol){

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
    
    function createPlayer(name, symbol){
        playerName=name;
        playerSymbol=symbol;
        if (playerSymbol=='X'){opSymbol='O'}
        else (opSymbol = 'X');
    }
    function playGame(){
        
        setResetButton();
        setChooseSymbolButtons();
        setBoardButtons();
        
    }
    return{
        createPlayer,
        placeSymbol,
        displayBoard,
        checkWin,
        opponentTurn,
        playGame,
    };
})();

gameBoard.playGame();