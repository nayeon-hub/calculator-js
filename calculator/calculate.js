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
const calBtn = [plusBtn, minusBtn, multiplyBtn, divideBtn];
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

function multiplyFunc(a, b) {
  return Number(a) * Number(b);
}

function minusFunc(a, b) {
  return Number(a) - Number(b);
}

function divideFunc(a, b) {
  return Number(a) / Number(b);
}

function addFunc(a, b) {
  return Number(a) + Number(b);
}

function actCalculate(curCal, startVal, endVal) {
  let val = "";
  if (curCal === "plus") {
    val = addFunc(startVal, endVal);
  } else if (curCal === "minus") {
    val = minusFunc(startVal, endVal);
  } else if (curCal === "multiply") {
    val = multiplyFunc(startVal, endVal);
  } else if (curCal === "divide") {
    val = divideFunc(startVal, endVal);
  }
  return val;
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
  Object.values(numBtn).forEach((ele) => {
    ele.addEventListener("click", showNum);
  });

  calBtn.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      num = "";
      curCal = e.target.value;
      console.log("a:", startVal, "b:", endVal, curCal);
      if (endVal !== "" && check === false) {
        startVal = actCalculate(curCal, startVal, endVal);
        calInput.value = startVal;
        endVal = "";
      } else if (endVal !== "" && check === true) {
        check = false;
      }
    });
  });

  resultBtn.addEventListener("click", () => {
    startVal = actCalculate(curCal, startVal, endVal);
    calInput.value = startVal;
    console.log("a:", startVal, "b:", endVal, curCal);
    check = true;
  });
  resetBtn.addEventListener("click", resetAct);
}

init();
