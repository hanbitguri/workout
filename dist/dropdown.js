export var dropDown = function (target, dropDownId, data) {
    try {
        var hash = location.hash.slice(1, 12);
        var transformedData = function (data) {
            return data.reduce(function (acc, item) {
                var key = Object.keys(item)[0];
                var value = item[key];
                acc.push({ label: key, value: value });
                return acc;
            }, []);
        };
        data = transformedData(data);
        var dropdownHeader = function (hash) {
            var index = Object.values(data).findIndex(function (el) {
                return el.label === hash;
            });
            return Object.values(data)[index].value;
        };
        //throw new Error("통신 에러 발생");
        var $target = document.querySelector("".concat(target));
        var dropdown = document.createElement("div");
        dropdown.id = "".concat(dropDownId, "-dropdown");
        var menuList = [];
        var template = "\n                <div class='dropdown'>\n                    <ol class='dropdown-list'>\n                    <li class='dropdown-item head'>\n                          <button type='button'><strong>".concat(hash === ""
            ? Object.values(data)[0].value
            : dropdownHeader(hash), "</strong><span>\u25BC</span></button>\n                      </li>\n                    {{MenuItem}}\n                    </ol>\n                </div>\n                    ");
        for (var i = 0; i < data.length; i++) {
            var label = Object.values(data)[i].label;
            var value = Object.values(data)[i].value;
            menuList.push("\n                    <li class='dropdown-item body'\n                   data-key=".concat(label, " data-value='").concat(value, "'>\n                    <a href=#").concat(label, ">\n                        <button type='button' ").concat(label === hash ? "disabled" : "", ">").concat(Object.values(data)[i].value, "<span>\u25BC</span></button></a>\n                    </li>\n                    "));
        }
        dropdown.innerHTML = template.replace("{{MenuItem}}", menuList.join(""));
        $target === null || $target === void 0 ? void 0 : $target.insertAdjacentElement("afterbegin", dropdown);
        var currentDropDown = document.querySelector("#".concat(dropDownId, "-dropdown"));
        var head = currentDropDown === null || currentDropDown === void 0 ? void 0 : currentDropDown.querySelector(".dropdown-item.head");
        var body_1 = currentDropDown === null || currentDropDown === void 0 ? void 0 : currentDropDown.querySelectorAll(".dropdown-item.body");
        head === null || head === void 0 ? void 0 : head.addEventListener("click", function (event) {
            event.stopPropagation();
            body_1 === null || body_1 === void 0 ? void 0 : body_1.forEach(function (bodyItem) {
                bodyItem.classList.toggle("is-active");
            });
        });
        currentDropDown === null || currentDropDown === void 0 ? void 0 : currentDropDown.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        document.addEventListener("click", function () {
            body_1 === null || body_1 === void 0 ? void 0 : body_1.forEach(function (bodyItem) {
                bodyItem.classList.remove("is-active");
            });
        });
    }
    catch (error) {
        var $target = document.querySelector("".concat(target));
        var dropdown = document.createElement("div");
        dropdown.id = "".concat(dropDownId, "-dropdown");
        var template = "\n                <div class='dropdown'>\n                    <ol class='dropdown-list'>\n                    <li class='dropdown-item head'>\n                          <button type='button'><strong>\n                          </strong><span>\u25BC</span></button>\n                      </li>\n                    </ol>\n                </div>\n                    ";
        dropdown.innerHTML = template;
        $target === null || $target === void 0 ? void 0 : $target.insertAdjacentElement("afterbegin", dropdown);
    }
};
//dropDown("#root", "first", data);
//# sourceMappingURL=dropdown.js.map