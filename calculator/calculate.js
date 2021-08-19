const rowOne = document.querySelector(".row-1");
const calInput = rowOne.querySelector("input");
const rowTwo = document.querySelector(".row-2");
const rowThree = document.querySelector(".row-3");
const rowFour = document.querySelector(".row-4");
const rowFive = document.querySelector(".row-5");
const rowSix = document.querySelector(".row-6");
const rowTwoBtns = rowTwo.querySelectorAll("button");
const rowThreeBtns = rowThree.querySelectorAll("button");
const rowFourBtns = rowFour.querySelectorAll("button");
const rowFiveBtns = rowFive.querySelectorAll("button");
const rowSixBtns = rowSix.querySelectorAll("button");

const numBtn = {
  0: rowSixBtns[0],
  1: rowFiveBtns[0],
  2: rowFiveBtns[1],
  3: rowFiveBtns[2],
  4: rowFourBtns[0],
  5: rowFourBtns[1],
  6: rowFourBtns[2],
  7: rowThreeBtns[0],
  8: rowThreeBtns[1],
  9: rowThreeBtns[2],
};
const dotBtn = rowSixBtns[1];
const resetBtn = rowTwoBtns[0];
const changeBtn = rowTwoBtns[1];
const perBtn = rowTwoBtns[2];

const divideBtn = rowTwoBtns[3];
const multiplyBtn = rowThreeBtns[3];
const minusBtn = rowFourBtns[3];
const plusBtn = rowFiveBtns[3];
const resultBtn = rowSixBtns[2];

let num = "";
let startVal = "";
let endVal = "";
let curCal = "";
let check = false;

function resetAct() {
  num = "";
  startVal = "";
  endVal = "";
  curCal = "";
  calInput.value = "0";
}

function addFunc(a, b) {
  return Number(a) + Number(b);
}

function showNum(e) {
  calInput.value = "";

  if (check === true) {
    resetAct();
    check = false;
  }

  num += e.target.innerHTML;
  calInput.value = num;

  if (curCal === "") {
    startVal = num;
    console.log("start:", startVal, "end:", endVal, curCal);
  } else if (curCal !== "") {
    endVal = num;
    console.log("start:", startVal, "end:", endVal, curCal);
  }
}

function init() {
  calInput.value = 0;
  curCal = "";
  Object.keys(numBtn).forEach((key) => {
    numBtn[key].addEventListener("click", showNum);
  });
  plusBtn.addEventListener("click", (e) => {
    num = "";
    curCal = e.target.innerHTML;
    console.log("a:", startVal, "b:", endVal, curCal);
    if (endVal !== "") {
      startVal = addFunc(startVal, endVal);
      calInput.value = startVal;
      endVal = "";
    }
  });
  resultBtn.addEventListener("click", () => {
    startVal = addFunc(startVal, endVal);
    calInput.value = startVal;
    console.log("a:", startVal, "b:", endVal, curCal);
    check = true;
  });
  resetBtn.addEventListener("click", resetAct);
}

init();
