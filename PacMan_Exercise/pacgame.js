document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const width = 28 // 28 x 28 = 784 squares for our grid
  let score = 0
  const pacArray = [
    ['./images/PacMan1.png', './images/PacMan2.png'],
    ['./images/PacMan3.png', './images/PacMan4.png'],
  ];

var showImage = 2;

function changePac(dir) {
  var img = document.getElementById("pac-man")
  img.src = img[dir];
}

// this is the games map, made of a grid array

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,0,1,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,0,1,0,1,
    1,3,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,3,1,
    1,0,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,0,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  const squares = []
  // How this grid works.
  // 0 = pac-dots
  // 1 = wall
  // 3 = ghost-cave
  // 4 = empty space to move

  // this function draws and renders the grid
  function createBoard() {
    for (let i=0; i < layout.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)

      //add layout to the board by checking the array number and then assigns the div based on the array number

      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if (layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if (layout[i] === 2) {
        squares[i].classList.add('ghost-cave')
      } else if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      }
    }
}

createBoard()

// starting point of pac-man

let pacmanCurrentIndex = 490

squares[pacmanCurrentIndex].classList.add('pac-man')

// this is how pac-man will move with arrow keys, it checks if you can move up

function movePacman(e) {

  squares [pacmanCurrentIndex].classList.remove('pac-man')
  
  switch(e.keyCode) {
    case 37:
      if(pacmanCurrentIndex % width !== 0 
        && !squares[pacmanCurrentIndex -1].classList.contains('wall')) pacmanCurrentIndex -=1
      
      if((pacmanCurrentIndex -1) === 363) {
        pacmanCurrentIndex = 391
      } 
        break

    case 38:
      if(pacmanCurrentIndex - width >= 0 
        && !squares[pacmanCurrentIndex -width].classList.contains('wall'))pacmanCurrentIndex -=width
        break 

    case 39:
        if(pacmanCurrentIndex % width < width -1 
          && !squares[pacmanCurrentIndex +1].classList.contains('wall'))pacmanCurrentIndex +=1


          if((pacmanCurrentIndex +1) === 392) {
            pacmanCurrentIndex = 364

          }
          break
           

    case 40:
          if(pacmanCurrentIndex + width < width * width 
            && !squares[pacmanCurrentIndex +width].classList.contains('wall'))pacmanCurrentIndex +=width
            break
      }

  squares[pacmanCurrentIndex].classList.add('pac-man')
  
  pacDotEaten()
  powerPelletEaten()
  checkForGameOver()
  checkForWin()
  
  }
  

document.addEventListener('keyup', movePacman)

// score bored function
function pacDotEaten(){
  if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    score++
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
  }
}

function powerPelletEeaten(){

}

function checkForGameOver(){

}

function checkForWin(){

}



//creating ghosts

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.timerId = NaN
  }
}

ghosts = [
  new Ghost('red', 348, 250),
  new Ghost('pink', 376, 400),
  new Ghost('purple', 351, 300),
  new Ghost('umby', 379, 500)
]

//draw ghost function

ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})


//this moves them randomly --  we are using for each to control them all
ghosts.forEach(ghost => moveGhost(ghost))

//function for ghosts


function moveGhost(ghost) {
  const directions =  [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(function() {
    //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
    if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
      !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
        //remove the ghosts classes
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        //move into that space
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    //else find a new random direction ot go in
    } else direction = directions[Math.floor(Math.random() * directions.length)]

    //if the ghost is currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }

    //if the ghost is currently scared and pacman is on it
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      score +=100
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }
  checkForGameOver()
  }, ghost.speed)
}

//check for a game over
function checkForGameOver() {
  if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){ alert("Game Over"); }, 500)
  }
}

//check for a win - more is when this score is reached
function checkForWin() {
  if (score === 274) {
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    setTimeout(function(){ alert("You have WON!"); }, 500)
  }
}
})