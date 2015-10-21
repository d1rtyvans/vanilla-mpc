var MPC = (function() {
  var exports = {};

  keys.forEach(function(key, index) {
    exports[key] = function() { assignKeyToPad(index) };
  });

  exports.triggerPad = function(pad) {
    var audio = pad.children[0];
    togglePadColor(pad);
    triggerAudio(audio);
  }

  // private
  var keys = ['j','k','l','f','g','h','a','s','d'];
  var board = document.getElementsByClassName('drum-pad');

  function assignKeyToPad(index) {
    var pad = board[index]
    exports.triggerPad(pad);
  }

  function togglePadColor(pad) {
    // convert classList into array
    var classList = String(pad.classList).split(' ');

    if (classList.indexOf('bgc-r')) {
      pad.classList.remove('bgc-r');
      setTimeout(function() { pad.classList.add('bgc-r') }, 100);
    }
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
  MPC[letter]();
}

window.onclick = function(event) {
  var audioClass = event.target.children[0].className;
  if (audioClass === 'drum-sample') MPC.triggerPad(event.target);
}

