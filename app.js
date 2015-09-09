window.onkeypress = function(event) {
  var letter = String.fromCharCode(event.charCode).toLowerCase();
  MPC[letter]();
}

window.onclick = function(event) {
  var audio = event.target.children[0];
  var audioClass = audio.className;

  if (audioClass === 'drum-sample') MPC.triggerAudio(audio);
}