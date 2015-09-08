


function Game() {
  this.rows = this.getSections('row', 3);
  this.columns = this.getSections('column', 3);
  this.diags = this.getSections('diag', 2);
  this.board = this.getBoard();
  this.gameOver = false;
}


Game.prototype.checkFrequencyOfX = function(section) {
  var Xfreq = 0;

  for (i = 0; i < section.length; i++) {
    if (section[i].textContent === 'X') Xfreq ++;
  }

  return Xfreq;
}


Game.prototype.getSections = function(section, index) {
  var sections = [];

  for (var i = 1; i <= index; i++) {
    var elSection = document.getElementsByClassName(section+'-'+i);
    sections.push(elSection);
  }

  return sections;
}

Game.prototype.refreshBoard = function() {
  this.board = this.getBoard();
}

Game.prototype.getBoard = function() {
  var board = [
    this.getSections('row', 3),
    this.getSections('column', 3),
    this.getSections('diag', 2)
  ];

  return board;
}

Game.prototype.pickTile = function() {
  var game = this;
  var middleCell = game.rows[1][1];
  var turnOver = false;

  if (!middleCell.textContent.match(/[XO]/)) {
    return middleCell.textContent = 'O';
  }

  game.board.forEach(function(section) {
    section.forEach(function(thisSection) {
      var Xfreq = game.checkFrequencyOfX(thisSection);
      
      if (Xfreq === 2) {
        for (i = 0; i < thisSection.length; i++) {
          if (!thisSection[i].textContent.match(/[XO]/)) {
            return thisSection[i].textContent = 'O';
          }
        }
      } else if (Xfreq === 1) {
        // for (i = 0; i < thisSection.length; i++) {
        //   if (!thisSection[i].textContent.match(/[XO]/)) {
        //     return thisSection[i]
        //   }
        // }
      }
    });
  });
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
        game.refreshBoard();

        setTimeout(function() {
          game.pickTile();
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


Game.prototype.getSectionsMarks = function(section) {
  var sectionMarks = [];

  for (var i = 0; i < this[section].length; i++) {
    var marks = [];
    var currentSection = this[section][i];
  
    for (var n = 0; n < currentSection.length; n++) {
      marks.push(currentSection[n].textContent);
    }

    sectionMarks.push(marks);
  }

  return sectionMarks;
}


Game.prototype.checkSectionForWinner = function(section) {
  var game = this;
  var marks = game.getSectionsMarks(section);

  marks.forEach(function(sectionMarks) {
    if (sectionMarks.every(game.isPlayerWinner)) {
      game.finishGame('win');
    } else if (sectionMarks.every(game.isGameWinner)) {
      game.finishGame('lose');
    }
  });
}





function Player(name, letter) {
  this.name = 'player '+name;
  this.letter = letter;
  this.turn = true;
}



var game = new Game();
game.runGame();