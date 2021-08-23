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
  11: rowTwoBtns[1],
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
      val = a * b;
      break;
    case "divide":
      val = a / b;
      break;
  }
  if (curCal === "") {
    val = Number(startVal);
  }
  return val;
}

// 숫자를 보여주는 함수
// 1. 연속 소수점을 체크함
// 2. 처음 0을 누르고 그 다음 오는 숫자가 일반 숫자일 때 처리함
function showNum(e) {
  calInput.value = "";
  checkCheck();

  const n = e.target.innerHTML;
  switch (n) {
    case ".":
      if (num.indexOf(".") !== -1) {
        // 이미 소수점이 있으면 ERROR
        calInput.value = "ERROR";
        check = true;
      } else {
        if (num === "0" || num === "-0") {
          // 아무것도 입력되지 않았을 때는 소수점을 누르면 0.
          num = `${num}.`;
          calInput.value = num;
        } else if (num === "") {
          num = "0.";
          calInput.value = num;
        } else {
          // 소수점이 없으면 PASS
          num += ".";
          calInput.value = num;
          console.log(num);
        }
      }
      break;

    case "+/-":
      if (num === "") {
        num = "-";
        calInput.value = `${num}0`;
        console.log("1", num);
      } else if (num !== "" && num[0] !== "-") {
        num = `-${num}`;
        calInput.value = num;
        console.log("2");
        console.log(num);
      } else if (num !== "" && num[0] === "-") {
        num = `${num.slice(1, num.length)}`;
        console.log(num);
        calInput.value = num;
        console.log("3");
      }
      break;

    default:
      // 일반 숫자 선택했을 경우
      // 1. 첫번째 숫자가 0일때 처리
      if (num === "0") {
        // 0이 먼저 입력되어 있을때
        num = e.target.innerHTML;
      } else if (num === "-0") {
        // -0이 먼저 입력되어 있을 때
        num = `-${e.target.innerHTML}`;
      } else {
        // 그 외에 숫자가 들어왔을 때
        num += e.target.innerHTML;
      }
      calInput.value = num;
      break;
  }
  // 2. start값인지 end값인지 판단
  if (curCal === "") {
    //사칙연산 하기 전이면 start
    startVal = num;
    console.log("num:", num, "a:", startVal, "b:", endVal, curCal, check);
  } else if (curCal !== "") {
    //사칙연산 한 후면 end
    endVal = num;
    console.log("a:", startVal, "b:", endVal, curCal, check);
  }
}

function init() {
  calInput.value = 0;

  // 숫자 버튼
  Object.values(numBtn).forEach((ele) => {
    ele.addEventListener("click", showNum);
  });

  // % 버튼
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
