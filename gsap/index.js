import { random } from "./util/random";
import { gradeToScore, scoreToGrade } from "./util/scoreToGrade";

//원점 100, 100
const score = [];

const timeLine = gsap.timeline({ paused: true }); // 타임라인 설정

const chart = gsap.set(".board .chart", { x: 0, y: 0 });
const resultbox = gsap.set(".result .resultbox", { x: 0, y: 0 });

const apples = document.querySelectorAll(".apple");

timeLine
  .to(apples[0], {
    y: 450,
    delay: random(),
    duration: 1,
    onComplete: () => {
      gsap.to(".chart .bar", { height: 50 * gradeToScore(score[0]) });
    },
  })
  .to(apples[1], {
    y: 450,
    delay: random(),
    duration: 1,
    // onComplete: () => {
    //   gsap.to(".bar", { height: 50 * gradeToScore(score[1]) });
    // },
  })
  .to(apples[2], {
    y: 450,
    delay: random(),
    duration: 1,
    // onComplete: () => {
    //   gsap.to(".bar", { height: 50 * gradeToScore(score[2]) });
    // },
  })
  .to(apples[3], {
    y: 450,
    delay: random(),
    duration: 1,
    // onComplete: () => {
    //   gsap.to(".bar", { height: 50 * gradeToScore(score[3]) });
    // },
  })
  .to(apples[4], {
    y: 450,
    delay: random(),
    duration: 1,
    // onComplete: () => {
    //   gsap.to(".bar", { height: 50 * gradeToScore(score[4]) });
    // },
  });

const gameStart = document.querySelector(".modal div"); //모달 게임시작 버튼
const modal = document.querySelector(".modal");

const button = document.querySelector("button");

window.addEventListener("load", () => {
  gsap.set(modal, { x: 100, y: 200 });
});

gameStart.addEventListener("click", () => {
  gsap.to(modal, { opacity: 0, display: "none", duration: 0.4 });
  timeLine.play();
});

button.addEventListener("click", (e) => {
  const appleElements = document.querySelectorAll(".apple");

  appleElements.forEach((apple) => {
    const appleRect = apple.getBoundingClientRect();
    const appleYValue = appleRect.y;
    if (scoreToGrade(appleYValue)) score.push(scoreToGrade(appleYValue));
  });
});

// 216, 278, 343, 407 , 470 , 533
