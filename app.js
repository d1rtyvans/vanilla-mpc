window.onkeypress = function(event) {
  var letter = String.fromCharCode(event.charCode).toLowerCase();
  MPC[letter]();
}

window.onclick = function(event) {
  var audioClass = event.target.children[0].className;
  if (audioClass === 'drum-sample') MPC.triggerPad(event.target);
}