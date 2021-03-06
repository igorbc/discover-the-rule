function start() {
  setupKeyResponse();
  document.getElementById("flag").ontouchstart = setAnswer;
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
  addTest(valid, n);
  return (
    n.toString() +
    " is" +
    (valid ? "" : " NOT") +
    " a valid sequence, according to the rule"
  );
}

function addTest(valid, n) {
  rowElement = document.getElementById("results").insertRow();
  result = rowElement.insertCell(0);
  sequence = rowElement.insertCell(1);

  flag = document.createElement('div');
  flag.classList.add("tiny-flag");
  flag.classList.add((valid ? "valid" : "invalid"));
  result.appendChild(flag);
  sequence.innerHTML = n.toString();
}

function validate(n) {
  for(var i = 0; i < n.length - 1; i++)
    if(n[i] >= n[i + 1])
      return false;

  return true;
}

function validateRule(){
  func = document.getElementById("the-supposed-rule").value + ";"

  console.log(func);

  for(var i = 0; i < testCases.length; i++) {
    var seq = testCases[i].seq;

    for(var j = 0; j < seq.length - 1; j++) {
      var n = seq[j];
      var nPlus1 = seq[j+1];
      theAnswer = true;
      funcResult = eval(func);
      console.log(funcResult);
      console.log("n " + n);
      console.log("nPlus1 " + nPlus1);
      theAnswer = theAnswer && eval(func);
      if(!theAnswer) break;
    }
    if(theAnswer != testCases[i].ans) {
      console.log("invalid rule");
      console.log(
        "got " +
        theAnswer +
        " for " +
        testCases[i].seq.toString() +
        " when the answer should have been " +
        testCases[i].ans
      );
      return false;
    }
  }
  return true;
}

function testRule(){
  var e = document.getElementById("rule-validation");
  if(validateRule()) {
    e.innerHTML = "Might be a valid rule";
  }
  else {
    e.innerHTML = "Is NOT a valid rule";
  }
}

var testCases = [
  { ans: false, seq: [1,1,1] },
  { ans: false, seq: [1,0,1] },
  { ans: false, seq: [1,1,0] },
  { ans: false, seq: [1,1,1] },
  { ans: false, seq: [1,2,-4] },
  { ans: true, seq: [1,1.1,1.2] },
  { ans: true, seq: [-1,2,3] },
  { ans: true, seq: [1,2,3] },
  { ans: true, seq: [-100,-20,-3] },
  { ans: true, seq: [1,100,10000] },
]
