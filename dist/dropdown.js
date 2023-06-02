"use strict";
var Dropdown = /** @class */ (function () {
    function Dropdown(dropDownId, target, data) {
        this.dropDownId = dropDownId;
        this.target = document.querySelector("".concat(target));
        this.data = data;
        this.attachToTarget();
        this.attachEvent();
    }
    Dropdown.prototype.attachToTarget = function () {
        var _a;
        var dropdown = document.createElement("div");
        dropdown.id = "".concat(this.dropDownId, "-dropdown");
        dropdown.innerHTML = this.createDropDown();
        (_a = this.target) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement("afterbegin", dropdown);
    };
    Dropdown.prototype.createDropDown = function () {
        var key = Object.keys(this.data);
        var menuList = [];
        var template = "\n    <div class='dropdown'>\n        <ol class='dropdown-list'>\n        {{MenuItem}}\n        </ol>\n    </div>\n        ";
        for (var i = 0; i < this.data.length; i++) {
            menuList.push("\n        <li class='dropdown-item ".concat(i === 0 ? "head" : "body", "'>\n            <button><strong>").concat(Object.values(this.data[key[i]]), "</strong><span>\u25BC</span></button>\n        </li>\n        "));
        }
        return template.replace("{{MenuItem}}", menuList.join(""));
    };
    Dropdown.prototype.attachEvent = function () {
        var dropdown = document.querySelector("#".concat(this.dropDownId, "-dropdown"));
        var head = dropdown === null || dropdown === void 0 ? void 0 : dropdown.querySelector(".dropdown-item.head");
        var body = dropdown === null || dropdown === void 0 ? void 0 : dropdown.querySelectorAll(".dropdown-item.body");
        head === null || head === void 0 ? void 0 : head.addEventListener("click", function () {
            body === null || body === void 0 ? void 0 : body.forEach(function (item) {
                item.classList.toggle("is-active");
            });
        });
    };
    return Dropdown;
}());
var data = [
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
var dropdown = new Dropdown("score1", "#root", data); // id-드랍다운 , 붙일 타겟 , 데이터
//# sourceMappingURL=dropdown.js.map