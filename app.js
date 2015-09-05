function Player(name, letter) {
  this.name = 'player '+name,
  this.letter = letter
}

var markTile = function(letter, tile) {
  tile.textContent = letter;
}

var nextPlayersTurn = function() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

var checkMarks = function(section) {
  console.log('bitch');
}

var isXWinner = function(element) {
  return element === 'X';
}

var isOWinner = function(element) {
  return element === 'O';
}

var clearBoard = function() {
  var cells = document.querySelectorAll('td');
  for (i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

var gameOver = function(winner) {
  alert(currentPlayer.name+' wins!!!!');
  clearBoard();
}

var checkForWinner = function() {

  for (var i = 1; i <= 3; i++) {
    var row = getSection('row', i);
    var column = getSection('column', i);

    if (column.every(isXWinner) || column.every(isOWinner)) {
      gameOver();
    } else if (row.every(isXWinner) || row.every(isOWinner)) {
      gameOver();
    }
  }

}





var getSection = function(section, index) {
  var currentSection = [];
  var tableSection = document.getElementsByClassName(section+'-'+index);

  for (var i = 0; i < tableSection.length; i++) {
    currentSection.push(tableSection[i].textContent);
  }

  return currentSection;
}


var tiles = document.querySelectorAll('td');
var player1 = new Player('one', 'X');
var player2 = new Player('two', 'O');
var currentPlayer = player1;


for (var i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener('click', function() {
    markTile(currentPlayer.letter, event.target);
    checkForWinner();
    nextPlayersTurn();
  });
}