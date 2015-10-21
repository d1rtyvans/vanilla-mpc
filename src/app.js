var MPC = (function() {
  var exports = {};

  var keys = ['j','k','l','f','g','h','a','s','d'];
  var board = document.getElementsByClassName('drum-pad');

  keys.forEach(function(key, index) {
    exports[key] = function () { assignKeyToPad(index) };
  });

  exports.triggerPad = function(pad) {

    var audio = pad.children[0];
    togglePadColor(pad);
    triggerAudio(audio);
  }

  exports.wrongKey = function() {
    var audio = document.getElementById('missing')
    triggerAudio(audio);
    lightUpMPC();
  }


  // private
  function assignKeyToPad(index) {
    var pad = board[index]
    exports.triggerPad(pad);
  }

  function togglePadColor(pad) {
    var classList = String(pad.classList).split(' ');

    if (classList.indexOf('bgc-r')) {
      pad.classList.remove('bgc-r');
      setTimeout(function() { pad.classList.add('bgc-r') }, 100);
    }
  }

  function lightUpMPC() {
    var pads = document.getElementsByClassName('drum-pad');
    for (var i = 0; i < pads.length; i++)
      togglePadColor(pads[i]);
  }

  function triggerAudio(audio) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  return exports;

})();




window.onkeypress = function(event) {
  var letter = String.fromCharCode(event.charCode).toLowerCase();
  if (MPC[letter]) {
    MPC[letter]();
    animateLetter(letter);
  } else {
    MPC.wrongKey();
    lightUpLetters();
  }
}

// for when user clicks
function playSample() {
  var audioClass = event.target.children[0].className;
  if (audioClass === 'drum-sample') MPC.triggerPad(event.target);
}


function animateLetter(letter) {
  var el = document.getElementById(letter);
  toggleLetterColor(el);
}

function toggleLetterColor(el) {
  var classList = String(el.classList).split(' ');
  el.classList.add('c-r');
  setTimeout(function() { el.classList.remove('c-r') }, 100);
}

function lightUpLetters() {
  var letters = document.getElementsByClassName('drum-letters');
  for (var i = 0; i < letters.length; i++)
    toggleLetterColor(letters[i]);
}
