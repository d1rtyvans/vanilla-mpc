function Game() {
  this.rows = this.getSections('row', 3);
  this.columns = this.getSections('column', 3);
  this.diags = this.getSections('diag', 2);
  this.gameOver = false;
}

Game.prototype.getSections = function(section, index) {
  var sections = [];

  for (var i = 1; i <= index; i++) {
    var elSection = document.getElementsByClassName(section+'-'+i);
    sections.push(elSection);
  }

  return sections;
}

Game.prototype.markTile = function() {
  var cells = document.querySelectorAll('td');

  for (var i = 0; i < cells.length; i++) {
    if (!cells[i].textContent.match(/[XO]/)) {
      return cells[i].textContent = 'O';
    }
  }
}

Game.prototype.listenForClicks = function() {
  var tiles = document.querySelectorAll('td');
  var game = this;

  for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', function() {
      event.target.textContent = 'X';
      game.checkForWinner();

      if (!game.gameOver) {
        setTimeout(function() {
          game.markTile();
          game.checkForWinner();
        }, 500);
      }

      game.gameOver = false;
    });
  }
}

Game.prototype.playersTurn = function() {
  alert('player\'s turn!')
}

Game.prototype.runGame = function() {
  var player = new Player('chris', 'X');
  this.listenForClicks();
}

Game.prototype.checkForWinner = function() {
  this.checkSectionForWinner('rows');
  this.checkSectionForWinner('columns');
  this.checkSectionForWinner('diags');
}

Game.prototype.isPlayerWinner = function(element) {
  return element === 'X';
}

Game.prototype.isGameWinner = function(element) {
  return element === 'O';
}

Game.prototype.clearBoard = function() {
  var cells = document.querySelectorAll('td');
  for (i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

Game.prototype.finishGame = function(winner) {
  if (winner === 'win') {
    alert('you win!');
  } else {
    alert('you lose!');
  }

  this.clearBoard();
  this.gameOver = true;
}

Game.prototype.checkSectionForWinner = function(section) {
  var game = this;

  for (var i = 0; i < this[section].length; i++) {
    var sectionMarks = [];
    var currentSection = this[section][i];
  
    for (var n = 0; n < currentSection.length; n++) {
      sectionMarks.push(currentSection[n].textContent);
    }

    if (sectionMarks.every(this.isPlayerWinner)) {
      game.finishGame('win');
    } else if (sectionMarks.every(this.isGameWinner)) {
      game.finishGame('lose');
    }
  }

}




function Player(name, letter) {
  this.name = 'player '+name;
  this.letter = letter;
  this.turn = true;
}



var game = new Game();
game.runGame();