import { DropDownData } from "../type/index";

export const dropDown = (target: string, dropDownId: string, data: any) => {
  try {
    const hash = location.hash.slice(1, 12);
    const transformedData = (data: DropDownData) => {
      return data.reduce((acc: DropDownData, item) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        acc.push({ label: key, value });
        return acc;
      }, []);
    };

    data = transformedData(data);

    const dropdownHeader = (hash: string) => {
      const index = Object.values(data).findIndex((el) => {
        return el.label === hash;
      });
      return Object.values(data)[index].value;
    };

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
                            hash === ""
                              ? Object.values(data)[0].value
                              : dropdownHeader(hash)
                          }</strong><span>▼</span></button>
                      </li>
                    {{MenuItem}}
                    </ol>
                </div>
                    `;
    for (let i = 0; i < data.length; i++) {
      const label = Object.values(data)[i].label;
      const value = Object.values(data)[i].value;

      menuList.push(`
                    <li class='dropdown-item body'
                   data-key=${label} data-value='${value}'>
                    <a href=#${label}>
                        <button type='button' ${
                          label === hash ? "disabled" : ""
                        }>${
        Object.values(data)[i].value
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

    currentDropDown?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    document.addEventListener("click", () => {
      body?.forEach((bodyItem) => {
        bodyItem.classList.remove("is-active");
      });
    });
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

//dropDown("#root", "first", data);
