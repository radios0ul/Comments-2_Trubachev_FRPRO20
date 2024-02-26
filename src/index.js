"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/style.css");
const user_1 = require("./user");
const factory_1 = require("./factory");
const render_1 = require("./render");
let user = new user_1.User();
let factory = new factory_1.Factory();
//кнопка очистки local storage
let clr = (document.querySelector(".clear"));
clr.addEventListener("click", () => {
    factory.clearStorage();
});
let commentBase = factory.fillCommentBase();
let render = new render_1.Render(user, factory, commentBase);
render.renderCommentBase();
render.buttonListener();
render.filterMenuListener();
render.textLengthChecker();
render.favListener();
render.textareaResize();
//const test: HTMLElementTagNameMap
//# sourceMappingURL=index.js.map