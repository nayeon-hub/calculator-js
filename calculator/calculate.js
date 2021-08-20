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
  10: rowSixBtns[1],
}; // 10 - 소수점 버튼
const calBtn = [rowFiveBtns[3], rowFourBtns[3], rowThreeBtns[3], rowTwoBtns[3]]; // + - * ÷
const resetBtn = rowTwoBtns[0]; // AC
const changeBtn = rowTwoBtns[1]; // +/-
const perBtn = rowTwoBtns[2]; // %
const resultBtn = rowSixBtns[2]; // =

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
  } else {
    val = Number(startVal);
  }
  return val;
}

function showNum(e) {
  calInput.value = "";

  if (check === true) {
    resetAct();
    check = false;
  }
  if (e.target.innerHTML !== ".") {
    num += e.target.innerHTML;
    calInput.value = num;
  } else {
    if (num === "") {
      num += "0.";
      calInput.value = num;
    } else {
      num += ".";
      calInput.value = num;
    }
  }

  if (curCal === "") {
    startVal = num;
    console.log("num:", num, "a:", startVal, "b:", endVal, curCal, check);
  } else if (curCal !== "") {
    endVal = num;
    console.log("a:", startVal, "b:", endVal, curCal, check);
  }
}

function init() {
  calInput.value = 0;

  Object.values(numBtn).forEach((ele) => {
    ele.addEventListener("click", showNum);
  });

  changeBtn.addEventListener("click", () => {
    if (num === "") {
      num = "-";
      calInput.value = `${num}0`;
    } else if (num !== "" && num[0] !== "-") {
      num = `-${num}`;
      calInput.value = num;
      startVal = num;
    } else if (num !== "" && num[0] === "-") {
      num = `${num.slice(1, -2)}`;
      calInput.value = num;
      startVal = num;
    }
  });

  perBtn.addEventListener("click", () => {
    if (num === "") {
      calInput.value = "0";
    } else {
      num = num / 100;
      calInput.value = num;
      startVal = num;
    }
  });

  calBtn.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      if (endVal !== "" && check === false) {
        startVal = actCalculate(curCal, startVal, endVal);
        calInput.value = startVal;
        endVal = "";
      } else if (endVal !== "" && check === true) {
        check = false;
      }

      num = "";
      curCal = e.target.value;
      console.log("num:", num, "a:", startVal, "b:", endVal, curCal, check);
    });
  });

  resultBtn.addEventListener("click", () => {
    startVal = actCalculate(curCal, startVal, endVal);
    calInput.value = startVal;
    console.log("num:", num, "a:", startVal, "b:", endVal, curCal, check);

    check = true;
    num = String(startVal);
  });
  resetBtn.addEventListener("click", resetAct);
}

init();
