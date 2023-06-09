type DropDownData = {
  [label: string]: string;
}[];

export class DropDown {
  attachTarget: HTMLElement | null;
  dropdownId: string;
  dropdownData: DropDownData;
  currentIndex: number;
  currentDropDown: HTMLDivElement | null;
  dropdownHead: string;
  dropdownBody: HTMLLIElement[] | null;
  callback?: Function; // 콜백함수?
  constructor(
    target: string,
    id: string,
    data: DropDownData,
    callback?: Function
  ) {
    this.attachTarget = document.querySelector(`${target}`);
    this.dropdownId = `${id}-dropdown`;
    this.dropdownData = this.transformedData(data);
    this.currentIndex = 0;
    this.dropdownHead = this.dropdownData[this.currentIndex].value;
    this.callback = callback;
    const dropdown = document.createElement("div");
    dropdown.id = this.dropdownId;
    const dropdownList: string[] = [];

    const template = `
                <div class='dropdown'>
                    <ol class='dropdown-list'>
                    <li class='dropdown-item head'>
                          <button type='button'><strong>${this.dropdownHead}</strong><span>▼</span></button>
                      </li>
                    {{MenuItem}}
                    </ol>
                </div>
                    `;
    for (let i = 0; i < this.dropdownData.length; i++) {
      const label = this.dropdownData[i].label;
      const value = this.dropdownData[i].value;

      dropdownList.push(`
                    <li class='dropdown-item body'
                   data-key=${label} data-value='${value}'>
                        <button type='button'>${this.dropdownData[i].value}<span>▼</span></button>
                    </li>
                    `);
    }

    dropdown.innerHTML = template.replace(
      "{{MenuItem}}",
      dropdownList.join("")
    );
    this.attachTarget!.insertAdjacentElement("afterbegin", dropdown);
    this.currentDropDown = document.querySelector(`#${this.dropdownId}`)!;

    this.dropdownBody = this.currentDropDown.querySelectorAll(
      "body"
    ) as unknown as HTMLLIElement[];

    this.addEvent();
  }
  updateDropDown(): void {
    const head = this.currentDropDown?.querySelector(".dropdown-item.head");
    const button = head?.querySelector("button");
    if (button) {
      const newValue = this.dropdownData[this.currentIndex - 1].value;
      button.textContent = `${newValue}▼`;
      button.value = newValue;
    }
  }
  transformedData(data: DropDownData): DropDownData {
    return data.reduce((acc: DropDownData, item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      acc.push({ label: key, value });
      return acc;
    }, []);
  }
  addEvent(): void {
    const head = this.currentDropDown?.querySelector(".dropdown-item.head");
    const body = this.currentDropDown?.querySelectorAll(".dropdown-item.body");
    head?.addEventListener("click", (event) => {
      event.stopPropagation();
      body?.forEach((bodyItem) => {
        bodyItem.classList.toggle("is-active");
      });
    });

    body?.forEach((bodyItem) => {
      bodyItem.addEventListener("click", (e) => {
        this.currentIndex = Number(bodyItem.getAttribute("data-key"));
        this.updateDropDown();
      });
    });

    this.currentDropDown?.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    document.addEventListener("click", () => {
      body?.forEach((bodyItem) => {
        bodyItem.classList.remove("is-active");
      });
    });
  }
}