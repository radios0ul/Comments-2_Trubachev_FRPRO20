import "./css/style.css";
import { User } from "./user";
import { Factory } from "./factory";
import { Render } from "./render";

let user = new User();
let factory = new Factory();

//кнопка очистки local storage
let clr: HTMLButtonElement = <HTMLButtonElement>(document.querySelector(".clear"));
clr.addEventListener("click", () => {
  factory.clearStorage();
});


let commentBase = factory.fillCommentBase();

let render = new Render(user, factory, commentBase);

render.renderCommentBase();
render.buttonListener();
render.filterMenuListener();
render.textLengthChecker();
render.favListener();
render.textareaResize();

//const test: HTMLElementTagNameMap
