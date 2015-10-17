var MPC = (function() {

  // Private interface
  var keys = ['j','k','l','f','g','h','a','s','d'];
  var board = document.getElementsByClassName('drum-pad');

  function assignKeyToPad(index) {
    var pad = board[index]
    api.triggerPad(pad);
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





  // Public interface
  var api = {};
  
  keys.forEach(function(key, index) {
    api[key] = function() { assignKeyToPad(index) };
  });

  api.triggerPad = function(pad) {
    var audio = pad.children[0];
    togglePadColor(pad);
    triggerAudio(audio);
  }




  return api;
})();

