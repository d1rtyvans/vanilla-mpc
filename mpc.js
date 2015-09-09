var MPC = (function() {
  var api = {};



  // Private interface
  var keys = ['j','k','l','f','g','h','a','s','d'];
  var board = document.getElementsByClassName('drum-pad');

  function assignKeyToPad(index) {
    var pad = board[index]
    var audio = pad.children[0];

    togglePadColor(pad);
    api.triggerAudio(audio);
  }

  function togglePadColor(pad) {
    // convert classList into array
    var classList = String(pad.classList).split(' ');

    if (classList.indexOf('bgc-r')) {
      pad.classList.remove('bgc-r');
      setTimeout(function() { pad.classList.add('bgc-r') }, 100);
    }
  }




  // Public interface
  keys.forEach(function(key, index) {
    api[key] = function() { assignKeyToPad(index) };
  });

  api.triggerAudio = function(audio) {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }




  return api;
})();

