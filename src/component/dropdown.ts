type DropDownData = {
  [key: string]: string;
}[];
export const dropDown = (
  target: string,
  dropDownId: string,
  data: any,
  index = 0
) => {
  const transformedData = (data: DropDownData) => {
    return data.reduce((acc: DropDownData, item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      acc.push({ label: key, value });
      return acc;
    }, []);
  };
  const updateDropDown = (): void => {
    const currentDropDown = document.querySelector(`#${dropDownId}-dropdown`);
    const head = currentDropDown?.querySelector(".dropdown-item.head");
    const button = head?.querySelector("button");
    if (button) {
      const newValue = Object.values(labelData)[currentValue - 1].value;
      button.textContent = `${newValue}▼`;
      button.value = newValue;
    }
  };
  const updateIndex = (newIndex: number): void => {
    index = newIndex - 1;
    currentValue = Number(Object.values(labelData)[index].label);
    updateDropDown();
  };

  const labelData = transformedData(data);
  let currentValue: number = Number(Object.values(labelData)[index].label);

  try {
    //const hash = location.hash.slice(1, 12);
    //throw new Error("통신 에러 발생");
    const $target = document.querySelector(`${target}`);
    const dropdown = document.createElement("div");
    dropdown.id = `${dropDownId}-dropdown`;

    const menuList: string[] = [];

    const template = `
                <div class='dropdown'>
                    <ol class='dropdown-list'>
                    <li class='dropdown-item head'>
                          <button type='button'><strong>${
                            Object.values(labelData)[index].value
                          }</strong><span>▼</span></button>
                      </li>
                    {{MenuItem}}
                    </ol>
                </div>
                    `;

    for (let i = 0; i < labelData.length; i++) {
      const label = Object.values(labelData)[i].label;
      const value = Object.values(labelData)[i].value;

      menuList.push(`
                    <li class='dropdown-item body'
                   data-key=${label} data-value='${value}'>
                    <a href=#${label}>
                        <button type='button'>${
                          Object.values(labelData)[i].value
                        }<span>▼</span></button></a>
                    </li>
                    `);
    }

    dropdown.innerHTML = template.replace("{{MenuItem}}", menuList.join(""));
    $target?.insertAdjacentElement("afterbegin", dropdown);

    const currentDropDown = document.querySelector(`#${dropDownId}-dropdown`);
    const head = currentDropDown?.querySelector(".dropdown-item.head");
    const body = currentDropDown?.querySelectorAll(".dropdown-item.body");

    head?.addEventListener("click", (event) => {
      event.stopPropagation();
      body?.forEach((bodyItem) => {
        bodyItem.classList.toggle("is-active");
      });
    });

    body?.forEach((bodyItem) => {
      bodyItem.addEventListener("click", (e) => {
        currentValue = Number(bodyItem.getAttribute("data-key")); // body 각 요소 클릭시 data-value attr 값을 current에 할당
        index = currentValue;
        updateDropDown();
        console.log(`${dropDownId} " ${currentValue}`);
      });
    });

    currentDropDown?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    document.addEventListener("click", () => {
      body?.forEach((bodyItem) => {
        bodyItem.classList.remove("is-active");
      });
    });
    return updateIndex; // 인덱스 조종 함수 리턴
  } catch (error) {
    const $target = document.querySelector(`${target}`);
    const dropdown = document.createElement("div");
    dropdown.id = `${dropDownId}-dropdown`;

    const template = `
                <div class='dropdown'>
                    <ol class='dropdown-list'>
                    <li class='dropdown-item head'>
                          <button type='button'><strong>
                          </strong><span>▼</span></button>
                      </li>
                    </ol>
                </div>
                    `;
    dropdown.innerHTML = template;
    $target?.insertAdjacentElement("afterbegin", dropdown);
  }
};
