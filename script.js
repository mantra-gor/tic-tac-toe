if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered")
        console.log(registration)
    }).catch(error => {
        console.log("SW Registration Failed!")
        console.log(error)
    })
}


const boxes = document.querySelectorAll('.box')
const gameInfo = document.querySelector('.game-info')
const newGameBtn = document.querySelector('.btn')

const X = document.querySelector('.X-score')
const O = document.querySelector('.O-score')
const Draw = document.querySelector('.Draw-score')

let scoreOf_X = 0;
let scoreOf_O = 0;
let scoreOf_Draw = 0;


let currentPlayer
let gameGrid

let winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

initGame()

// Function to initial the Game
function initGame(){
    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""]
    // Empty Boxes on UI
    boxes.forEach((box) => {
        box.innerText = ""
        box.classList.remove('win')
        box.style.pointerEvents = "all"
    })
    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index)
    })
})

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = `${currentPlayer}`
        gameGrid[index] = currentPlayer

         // Swap the turn
         swapTurn()

        // Check koi jeet to nai gaya
        checkGameOver()
    }
}

function checkGameOver(){
    let answer = ""

    winningPositions.forEach(position => {
        // all three boxes should be non empty and with equal symbols
        if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]) )
        {
            // if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X"
                scoreOf_X++
                X.innerText = `${scoreOf_X}`
            }
            else{
                answer = "O"
                scoreOf_O++
                O.innerText = `${scoreOf_O}`
            }

            // Disable Pointer Event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            })

            // Now we know who is winner
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }
        
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner is - ${answer}`
        newGameBtn.classList.add('active')
        return
    }

    // When game is Tie
    let fillCount = 0
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++
    })
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied!"
        newGameBtn.classList.add('active')
        scoreOf_Draw++
        Draw.innerText = `${scoreOf_Draw}`
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        gameInfo.innerText = `Current Player - O`
        currentPlayer = "O"
    }
    else{
        gameInfo.innerText = `Current Player - X`
        currentPlayer = "X"
    }
}

newGameBtn.addEventListener("click",initGame)