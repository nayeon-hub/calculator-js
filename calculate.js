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

const calBtn = [rowFiveBtns[3], rowFourBtns[3], rowThreeBtns[3], rowTwoBtns[3]]; // + - * ÷
const resetBtn = rowTwoBtns[0]; // AC
const changeBtn = rowTwoBtns[1]; // +/-
const perBtn = rowTwoBtns[2]; // %
const resultBtn = rowSixBtns[2]; // =

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
  11: rowTwoBtns[1],
  12: rowTwoBtns[2],
}; // 10 - 소수점 버튼

let num = "";
let startVal = "";
let endVal = "";
let curCal = "";
let check = false;

// 모든 값을  reset 시키는 함수
function resetAct() {
  num = "";
  startVal = "";
  endVal = "";
  curCal = "";
  calInput.value = "0";
}

// '='을 눌렀는지 확인하는 함수 : true이면 완전히 계산이 끝났음을 의미한다.
function checkCheck() {
  if (check === true) {
    resetAct();
    check = false;
  }
}

// 첫번째 값과 두번째값, 사칙연산 기호가 들어왔을 때 연산하는 함수
function actCalculate(curCal, startVal, endVal) {
  let val = "";
  const a = Number(startVal);
  const b = Number(endVal);
  switch (curCal) {
    case "plus":
      val = a + b;
      break;
    case "minus":
      val = a - b;
      break;
    case "multiply":
      if (b === "") {
        val = a * 1;
      } else {
        val = a * b;
      }
      break;
    case "divide":
      val = a / b;
      break;
  }
  if (curCal === "") {
    // 사칙연산을 누르지 않은 상태에서 = 을 눌렀을때 처리
    val = Number(startVal);
  }
  return val;
}

function preprocessorCal(e) {
  if (endVal !== "" && check === false) {
    // 두번째 숫자가 없는 상태에서 사칙연산 코드가 들어왔다면 (첫번째 계산, 연속으로 하는 두번째 계산)
    startVal = actCalculate(curCal, startVal, endVal);
    calInput.value = startVal;
    endVal = "";
  } else if (endVal !== "" && check === true) {
    // =을 눌러서 계산이 완전히 끝났지만, 이전 결과값을 가지고 더 계산을 하고 싶을 때
    check = false;
  }
  num = "";
  curCal = e.target.value;
}

// 숫자와 관련된 버튼 처리 함수
function switchNum(n) {
  switch (n) {
    case ".": // 소수점 입력
      if (num.indexOf(".") !== -1) {
        // 소수점이 있으면 ERROR
        calInput.value = "ERROR";
        check = true;
      } else {
        // 소수점이 없다면?
        if (num === "0" || num === "-0") {
          // 이미 입력된 숫자가 0이거나 -0일때 소수점 처리
          num = `${num}.`;
          calInput.value = num;
        } else if (num === "-") {
          // 숫자 없이 -만 있을 때 소수점 처리
          num = `${num}0.`;
          calInput.value = num;
        } else if (num === "") {
          // 아무것도 입력되지 않았을 때 소수점 처리
          num = "0.";
          calInput.value = num;
        } else {
          num += ".";
          calInput.value = num;
          console.log(num);
        }
      }
      break;

    case "+/-": // "+/-" 기호 입력
      if (num === "") {
        // 입력된 숫자가 없을 때  -0으로 처리
        num = "-";
        calInput.value = `${num}0`;
      } else if (num !== "" && num[0] !== "-") {
        // 입력된 숫자가 있고 -가 없을때
        num = `-${num}`;
        calInput.value = num;
      } else if (num !== "" && num[0] === "-") {
        // 입력된 숫자가 있고 -가 있을 때
        num = `${num.slice(1, num.length)}`;
        calInput.value = num;
      }
      break;

    case "%":
      if (num === "") {
        calInput.value = "0";
      } else {
        num = num / 100;
        calInput.value = num;
      }
      break;

    default:
      // 일반 숫자 선택했을 경우
      if (num === "0") {
        // 0이 먼저 입력되어 있을때
        num = n;
      } else if (num === "-0") {
        // -0이 먼저 입력되어 있을 때
        num = `-${n}`;
      } else {
        // 그 외에 숫자가 들어왔을 때
        num += n;
      }
      calInput.value = num;
      break;
  }
}

// 숫자를 보여주는 함수
function showNum(e) {
  calInput.value = "";
  checkCheck();

  const n = e.target.innerHTML;
  switchNum(n);

  // start값인지 end값인지 판단
  if (curCal === "") {
    //사칙연산 하기 전이면 start
    startVal = num;
  } else if (curCal !== "") {
    //사칙연산 한 후면 end
    endVal = num;
  }
}

function init() {
  calInput.value = 0;

  // 숫자 버튼
  Object.values(numBtn).forEach((ele) => {
    ele.addEventListener("click", showNum);
  });

  // 사칙연산 버튼
  calBtn.forEach((ele) => {
    ele.addEventListener("click", preprocessorCal);
  });

  resultBtn.addEventListener("click", () => {
    startVal = actCalculate(curCal, startVal, endVal);
    calInput.value = startVal; // 연속 계산을 위한 처리
    check = true; // 계산이 완료됬음을 알려줌
    num = String(startVal);
  });
  resetBtn.addEventListener("click", resetAct);
}

init();
