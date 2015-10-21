var MPC = (function() {
  var api = {};

  keys.forEach(function(key, index) {
    api[key] = function() { assignKeyToPad(index) };
  });

  api.triggerPad = function(pad) {
    var audio = pad.children[0];
    togglePadColor(pad);
    triggerAudio(audio);
  }


  // private
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

  return api;

})();




window.onkeypress = function(event) {
  var letter = String.fromCharCode(event.charCode).toLowerCase();
  MPC[letter]();
}

window.onclick = function(event) {
  var audioClass = event.target.children[0].className;
  if (audioClass === 'drum-sample') MPC.triggerPad(event.target);
}

