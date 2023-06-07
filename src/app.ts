import { store } from "./store/index";

const root = document.querySelector("#root");
root?.addEventListener("click", () => {
  console.log(1);
});
// 데이터 예

// const exData = {
//   name: "jeon",
//   grade: 1,
//   class: "yale",
//   teacher: "kelly",
//   chapData: {},
//   rawData: {},
// };

function getData() {
  // 페이지 데이터 가져옴
}

function processData() {
  // 데이터 가공
}

function render(hash: any): void {
  // 페이지 렌더함수
  // 컴포넌트 호출 ( 해시에 따른 데이터변화에 반응하는 요소들 === 개별 컴포넌트화 )
  const data = processData();
  let template = `
    <div class='header'></div>
    페이지 템플릿...
    ...
    ..
    `;

  if (root) root.innerHTML = template;

  //dropDown("target", "identifier", data[hash]);
}

function eventAttach() {
  // ex ) 버튼 요소에 해시값 변경 이벤트
  //해시에 변화를 주는 요인 : 드랍다운 , 챕터선택 버튼
}

function router() {
  const hash = window.location.hash;
  if (hash === "") {
    getData();
  }
  if (hash.indexOf("#/report/") >= 0) {
    //해시에 맞는 렌더링
    render(hash);
  }
}

//window.addEventListener("hashchange", router);
//router()
