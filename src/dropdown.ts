class Dropdown {
  dropDownId: string;
  target: HTMLElement | null;
  data: DropDownData;
  constructor(dropDownId: string, target: string, data: DropDownData) {
    this.dropDownId = dropDownId;
    this.target = document.querySelector(`${target}`);
    this.data = data;

    this.attachToTarget();
    this.attachEvent();
  }

  attachToTarget() {
    const dropdown = document.createElement("div");
    dropdown.id = `${this.dropDownId}-dropdown`;
    dropdown.innerHTML = this.createDropDown();
    this.target?.insertAdjacentElement("afterbegin", dropdown);
  }

  createDropDown(): string {
    const key: string[] = Object.keys(this.data);
    const menuList = [];
    const template = `
    <div class='dropdown'>
        <ol class='dropdown-list'>
        {{MenuItem}}
        </ol>
    </div>
        `;

    for (let i = 0; i < this.data.length; i++) {
      menuList.push(`
        <li class='dropdown-item ${i === 0 ? "head" : "body"}'>
            <button><strong>${Object.values(
              this.data[key[i] as unknown as number]
            )}</strong><span>▼</span></button>
        </li>
        `);
    }

    return template.replace("{{MenuItem}}", menuList.join(""));
  }
  attachEvent() {
    const dropdown = document.querySelector(`#${this.dropDownId}-dropdown`);
    const head = dropdown?.querySelector(".dropdown-item.head");
    const body = dropdown?.querySelectorAll(".dropdown-item.body");

    head?.addEventListener("click", () => {
      body?.forEach((item) => {
        item.classList.toggle("is-active");
      });
    });
  }
}

//usecode

const data: DropDownData = [
  {
    "12345ASDFDF": "Phonics is Fun1",
  },
  {
    "1212345ASDF": "Phonics is Fun2",
  },
  {
    "1312345ASDF": "Phonics is Fun3",
  },
];

type DropDownData = {
  [key: string]: string;
}[];

const dropdown = new Dropdown("score1", "#root", data); // 드랍다운 id , 붙일 타겟 , 데이터
