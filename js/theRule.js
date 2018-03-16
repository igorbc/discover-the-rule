function start() {
  setupKeyResponse();
  setAnswer();
}

function setAnswer() {
  document.getElementById("answer-text").innerHTML =
    getAnswerText(getSequence());
}

function setFlag(valid) {
  var classList = document.getElementById("flag").classList;
  if (valid) {
    classList.remove("invalid");
    classList.add("valid");
  }
  else {
    classList.remove("valid");
    classList.add("invalid");
  }
}

function getSequence() {
  n = []
  for(var i = 1; i <= 3; i++)
    n.push(document.getElementById("n" + i).value);

  return n;
}

function getAnswerText(n) {
  for(var i = 0; i < n.length; i++) {
    if(isNaN(Number(n[i])))
      return n[i] + " is not really a number";
    n[i] = Number(n[i]);
  }

  var valid = validate(n);
  setFlag(valid);
  
  return (
    n.toString() +
    " is" +
    (valid ? "" : " NOT") +
    " a valid sequence, according to the rule"
  );
}

function validate(n) {
  for(var i = 0; i < n.length - 1; i++)
    if(n[i] >= n[i + 1])
      return false;

  return true;
}
