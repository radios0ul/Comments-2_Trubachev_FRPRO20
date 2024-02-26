import { CommentBase } from "./commentBase";
import { Comment } from "./comment";
import { User } from "./user";
import { Factory } from "./factory";

export class Render {
  user: User;
  factory: Factory;
  commentBase: CommentBase;

  commentsBlock: HTMLElement = <HTMLElement>(
    document.querySelector(".comments__block")
  );
  commentInput: HTMLTextAreaElement = <HTMLTextAreaElement>(
    document.querySelector(".comm-input")
  );
  postCommentBtn: HTMLButtonElement | null = document.querySelector(
    ".comm__form-send-btn"
  );

  constructor(user: User, factory: Factory, commentBase: CommentBase) {
    this.user = user;
    this.factory = factory;
    this.commentBase = commentBase;
  }

  renderCommentBase() {
    //отрисовать все комменты в базе

    let allComments: Comment[] = this.commentBase.getAllComments();

    allComments.forEach((comment) => {
      this.renderComment(comment, false);
    });
  }

  renderComment(comment: Comment, favOnly: boolean) {
    //данные комментария
    let commentText: string = comment.getCommentText();
    let user: User = comment.getUser();
    let currentUser: User = new User();
    let date: Date = comment.getCommentDate();
    let commentID: number = comment.getCommentID();
    let rating: number = comment.getRating();
    let isFav: boolean = comment.getIsFavorite();

    //данные юзера, написавшего коммент
    let userName: string = user.name;
    let userAvatar: string = user.avatar;

    //данные юзера, "типа авторизованного" сейчас
    let currentuserName: string = currentUser.name;
    let currentuserAvatar: string = currentUser.avatar;

    //дата
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    let hour: number = date.getHours();
    let minute: number = date.getMinutes();
    let seconds: number = date.getSeconds();

    let formattedDate: string =
      day +
      "." +
      month +
      "." +
      year +
      "  " +
      hour +
      ":" +
      minute +
      ":" +
      seconds;

    //отрисовка ХТМЛ коммента

    if (!this.commentInput) return;

    let newCommentHtml: HTMLElement = document.createElement("div");

    newCommentHtml.classList.add("comment__thread");

    newCommentHtml.innerHTML = `<div class="comment__wrapper">

         <div class="comment__avatar-block">
            <div class="avatar-box">
               /* <img class="avatar" src="${userAvatar}"> */
            </div>
         </div>
                  <div class="comment__comment-block">
                     <div class="comment__head-block">
               <div class="comm__form-name">${userName}</div>
               <div class="comment__date">${formattedDate}</div>
            </div>
                     <div class="comment-body">
               <p class="comment-text">
                  ${commentText}
               </p>
            </div>
                     <div class="comment__foot-block">
                        <button class="comment__answer-btn">
                  <div class="answer-button-content">
                     <img src="./png/Mask group.png" alt="answer">
                     Ответить
                  </div>
               </button>
               <button id="fav-${commentID}" class = "fav__btn">
                        <div class="comment__fav-block">
                           <div class="fav not-added">
                                      <img class="not__fav" src="./png/hrt_empty.png" alt="not in favourities">
                              <div class="fav-txt not-added-txt">
                        В избранное
                     </div>
                  </div>
                  <div class="fav added hidden">
                  <img class="not__fav" src="./png/hrt_filled.png" alt="in favourities">
                                       <div class="fav-txt not-added-txt">
                        В избранном
                     </div>
                  </div>
                        </div> 
               </button>
                        <div class="comment__karma-block">
                        <button class = "minus__btn">
                  <div class="karma">
                     <svg width="20" height="23" viewBox="0 0 20 23" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.1" cx="10" cy="13" r="10" fill="black" />
                        <path d="M13.0696 11.6399V13.2955H7.26562V11.6399H13.0696Z" fill="#FF0000" />
                     </svg>
                           </div>
                  </button>
                  <div class="karma-counter">${rating}</div>
                  <button class = "plus__btn">
                  <div class="karma">
                     <svg width="20" height="23" viewBox="0 0 20 23" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.1" cx="10" cy="13" r="10" fill="black" />
                        <path
                           d="M9.13281 17.169V8.52699H10.8523V17.169H9.13281ZM5.67472 13.7045V11.9851H14.3168V13.7045H5.67472Z"
                           fill="#8AC540" />
                     </svg>
                  </div>
                  </button>
               </div>
            </div>
         </div>
         </div>
         <div class="comm__form-block reply-input-block">
                     <div class="comm__form-avatar-block">
                        <div class="avatar-box">
                           <img class="avatar" src="${currentuserAvatar}" alt="your avatar">
                        </div>
                     </div>
                     <div class="comm__form-form-block">

                        <div class="comm__form-head">
                           <div class="comm__form-name">${currentuserName}</div>
                           <div class="comm__form-symbols-counter comm__form-symbols-reply">Макс. 1000 символов</div>
                        </div>
                        <textarea class="comm-input reply-input" type="text"
                           placeholder="      Введите текст сообщения..."></textarea>
                     </div>
                     <div class="comm__form-btn-block">
                        <div class="reply-warning__message">
                           Слишком длинное сообщение
                        </div>
                        <button class="comm__form-send-btn reply-post-btn">Отправить</button>
                     </div>
                  </div>
         `;
    this.commentsBlock.appendChild(newCommentHtml);

    this.commentInput.value = "";

    //добавить коммент в избранное

    const favBtn: HTMLButtonElement | null =
      newCommentHtml.querySelector(".fav__btn");

    if (!favBtn) return;

    const favDiv1: HTMLElement | null = newCommentHtml.querySelector(".added");
    const favDiv2: HTMLElement | null =
      newCommentHtml.querySelector(".not-added");

    if (!favDiv1) return;
    if (!favDiv2) return;

    // отрисовка сердечек при изначальном рендеринге коммента

    if (isFav == true) {
      favDiv2.classList.add("hidden");
      favDiv1.classList.remove("hidden");
    }

    //установить/снять флаг избранного с коммента

    favBtn.addEventListener("click", () => {
      comment.toggleFavorite(user);

      this.factory.saveChangedBase(this.commentBase);
      isFav = comment.getIsFavorite();

      favDiv1.classList.toggle("hidden");
      favDiv2.classList.toggle("hidden");
    });

    //рейтинг коммента

    const plusBtn: HTMLButtonElement | null =
      newCommentHtml.querySelector(".plus__btn");
    const minusBtn: HTMLButtonElement | null =
      newCommentHtml.querySelector(".minus__btn");
    const ratingDiv: HTMLElement | null =
      newCommentHtml.querySelector(".karma-counter");
    let initRating = comment.getRating();

    if (!ratingDiv) return;
    if (!plusBtn) return;
    if (!minusBtn) return;

    plusBtn.addEventListener("click", () => {
      let currentRatingPlus: number = comment.getRating();

      if (Math.abs(initRating - currentRatingPlus) >= 1) {
        return;
      } else {
        comment.ratingIncrease(this.user);

        ratingDiv.innerHTML = String(comment.getRating());

        this.factory.saveChangedBase(this.commentBase);

        if (comment.getRating() >= 0) {
          ratingDiv.classList.remove("disliked");
        }
      }
    });

    minusBtn.addEventListener("click", () => {
      let currentRatingMinus = comment.getRating();

      if (Math.abs(initRating - currentRatingMinus) > 0) {
        return;
      } else {
        comment.ratingReduce(this.user);

        ratingDiv.innerHTML = String(comment.getRating());

        this.factory.saveChangedBase(this.commentBase);

        if (comment.getRating() < 0) {
          ratingDiv.classList.add("disliked");
        }
      }
    });

    if (comment.getRating() < 0) {
      ratingDiv.classList.add("disliked");
    }

    if (comment.getRating() >= 0) {
      ratingDiv.classList.remove("disliked");
    }

    //показать форму ввода ответа по клику на кнопку "Ответить"

    const replyBtn: HTMLButtonElement | null = newCommentHtml.querySelector(
      ".comment__answer-btn"
    );
    const replyInputBlock: HTMLInputElement | null =
      newCommentHtml.querySelector(".reply-input-block");

    if (!replyBtn) return;
    if (!replyInputBlock) return;

    replyBtn.addEventListener("click", () => {
      replyInputBlock.classList.toggle("not_hidden");
    });

    // Отрисовка ХТМЛ ответа

    let replies: Comment[] = comment.getReplies();

    if (favOnly == true) {
      // если отрисовка идет по команде "показать избранное"

      replies.forEach((element) => {
        let isF: boolean = element.getIsFavorite();

        if (isF == true) {
          // отрисовать только избранные ответы
          this.renderReply(element, newCommentHtml);
        } else return;
      });
    } else {
      // если это просто отрисовка по умолчанию

      replies.forEach((element) => {
        this.renderReply(element, newCommentHtml); // отрисовать все ответы
      });
    }

    const replyInput: HTMLInputElement | null =
      newCommentHtml.querySelector(".reply-input");
    const replyPostBtn: HTMLButtonElement | null =
      newCommentHtml.querySelector(".reply-post-btn");

    if (!replyInput) return;
    if (!replyPostBtn) return;

    replyPostBtn.addEventListener("click", () => {
      const userTextOfReply: string = replyInput.value;

      if (userTextOfReply === "") {
        alert("Nothing to post!");
      } else {
        let newReply = this.factory.createReply(
          userTextOfReply,
          this.user,
          commentID,
          comment,
          this.commentBase,
          0,
          false,
          new Date()
        );

        this.renderReply(newReply, newCommentHtml);

        replyInput.value = "";
      }
    });
  }

  renderReply(comment: Comment, newCommentHtml: HTMLElement) {
    //данные ответа
    let commentText: string = comment.getCommentText();
    let user: User = comment.getUser();
    let date: Date = comment.getCommentDate();
    let commentID: number = comment.getCommentID();
    let parentID: number = comment.getParentID();
    let replyRating: number = comment.getRating();
    let isFavorite: boolean = comment.getIsFavorite();

    //данные "авторизованного" юзера
    let userName: string = user.name;
    let userAvatar: string = user.avatar;

    //дата
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    let hour: number = date.getHours();
    let minute: number = date.getMinutes();
    let seconds: number = date.getSeconds();

    let formattedDate: string =
      day +
      "." +
      month +
      "." +
      year +
      "  " +
      hour +
      ":" +
      minute +
      ":" +
      seconds;

    //родительский коммент
    let parentComment: Comment = <Comment>(
      this.commentBase.getCommentById(parentID)
    ); // родительский коммент

    let newReplyHtml: HTMLElement = document.createElement("div");

    newReplyHtml.classList.add("answer");

    newReplyHtml.innerHTML = `

      <div class="comment__wrapper">

         <div class="comment__avatar-block">
            <div class="avatar-box">
               <img class="avatar" src="${userAvatar}" alt="user avatar">
            </div>
         </div>

         <div class="comment__comment-block">

            <div class="comment__head-block">

            <div class="comm__form-name">${userName}</div>

               <div class="comm__form-reply">

               <div class="comm__form-arrow">
               <img class="rep__arrow" src="./png/Mask group.png" alt="not in favourities">
               </div>
               ${parentComment.getUser().name}</div>
               <div class="comment__date">${formattedDate}</div>
            </div>

            <div class="mob__form-reply">
            <div class="mob-arrow">
            <img class="rep__arrow" src="./png/Mask group.png" alt="not in favourities">
               </div>
               ${parentComment.getUser().name}</div>
              
            
            </div>

            </div>

            <div class="comment-body answer-body">
               <p class="comment-text">
               ${commentText}
               </p>
            </div>

            <div class="comment__foot-block answer__foot-block">

            <button id="fav-${commentID}" class = "fav__btn">

               <div class="comment__fav-block">

                  <div class="fav not-added">
                    
                  <img class="not__fav" src="./png/hrt_empty.png" alt="not in favourities">

                     <div class="fav-txt not-added-txt">
                        В избранное
                     </div>
                  </div>

                  <div class="fav added hidden">

                     <img src="./png/hrt_filled.png" alt="in favourities">

                     <div class="fav-txt not-added-txt">
                        В избранном
                     </div>
                  </div>

               </div>

               </button>

               <div class="comment__karma-block">

               <button class = "minus__btn">
                  <div class="karma">
                     <svg width="20" height="23" viewBox="0 0 20 23" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.1" cx="10" cy="13" r="10" fill="black" />
                        <path d="M13.0696 11.6399V13.2955H7.26562V11.6399H13.0696Z" fill="#FF0000" />
                     </svg>

                  </div>
                  </button>

                  <div class="karma-counter">${replyRating}</div>

                  <button class = "plus__btn">
                  <div class="karma">
                     <svg width="20" height="23" viewBox="0 0 20 23" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.1" cx="10" cy="13" r="10" fill="black" />
                        <path
                           d="M9.13281 17.169V8.52699H10.8523V17.169H9.13281ZM5.67472 13.7045V11.9851H14.3168V13.7045H5.67472Z"
                           fill="#8AC540" />
                     </svg>
                  </div>
                  </button>
               </div>
            </div>
         </div>
      </div>
`;
    newCommentHtml.appendChild(newReplyHtml);

    //отрисовать начальные сердечки

    const favDiv1: HTMLElement | null = newReplyHtml.querySelector(".added");
    const favDiv2: HTMLElement | null =
      newReplyHtml.querySelector(".not-added");
    if (!favDiv1) return;
    if (!favDiv2) return;

    if (isFavorite == true) {
      favDiv2.classList.add("hidden");
      favDiv1.classList.remove("hidden");
    }

    //установить/снять флаг избранного с ответа

    const favBtn: HTMLButtonElement | null =
      newReplyHtml.querySelector(".fav__btn");

    if (!favBtn) return;

    favBtn.addEventListener("click", () => {
      comment.toggleFavorite(user);

      parentComment.setFavorite(user); // если добавили в избранное ответ, то добавляем и родительский коммент, чтобы в сортировке он присутствовал

      isFavorite = comment.getIsFavorite();

      let parentFav: Comment[] = parentComment.getReplies();

      let flag: boolean = false;

      parentFav.forEach((reply) => {
        //если все ответы не-избранные, то снять метку избранного с род.коммента

        if (reply.getIsFavorite() == true) {
          flag = true;
        }
      });

      if (flag == false) {
        parentComment.unsetFavorite(user);
      }

      this.factory.saveChangedBase(this.commentBase);

      if (!favDiv1) return;
      if (!favDiv2) return;

      favDiv1.classList.toggle("hidden");
      favDiv2.classList.toggle("hidden");
    });

    //рейтинг ответа

    const plusBtn: HTMLButtonElement | null =
      newReplyHtml.querySelector(".plus__btn");
    const minusBtn: HTMLButtonElement | null =
      newReplyHtml.querySelector(".minus__btn");
    const ratingDiv: HTMLElement | null =
      newReplyHtml.querySelector(".karma-counter");
    let initRating: number = comment.getRating();

    if (!ratingDiv) return;
    if (!plusBtn) return;
    if (!minusBtn) return;

    plusBtn.addEventListener("click", () => {
      let currentRatingPlus: number = comment.getRating();

      if (Math.abs(initRating - currentRatingPlus) >= 1) {
        return;
      } else {
        comment.ratingIncrease(this.user);

        ratingDiv.innerHTML = String(comment.getRating());

        this.factory.saveChangedBase(this.commentBase);

        if (comment.getRating() >= 0) {
          ratingDiv.classList.remove("disliked");
        }
      }
    });

    minusBtn.addEventListener("click", () => {
      let currentRatingMinus: number = comment.getRating();

      if (Math.abs(initRating - currentRatingMinus) > 0) {
        return;
      } else {
        comment.ratingReduce(this.user);

        ratingDiv.innerHTML = String(comment.getRating());

        this.factory.saveChangedBase(this.commentBase);

        if (comment.getRating() < 0) {
          ratingDiv.classList.add("disliked");
        }
      }
    });

    if (comment.getRating() < 0) {
      ratingDiv.classList.add("disliked");
    }

    if (comment.getRating() >= 0) {
      ratingDiv.classList.remove("disliked");
    }
  }

  buttonListener() {
    //действие по основной кнопке "Отправить"

    const commentInput: HTMLTextAreaElement = this.commentInput;
    const postCommentBtn: HTMLButtonElement | null = this.postCommentBtn;

    const commentCounter: HTMLElement = <HTMLElement>(
      document.querySelector(".comm__h-count")
    );

    if (!commentInput) return;
    if (!postCommentBtn) return;

    postCommentBtn.addEventListener("click", () => {
      const userTextOfComment: string = commentInput.value;

      if (userTextOfComment === "") {
        alert("Nothing to post!");
      } else {
        let newComment = this.factory.createComment(
          userTextOfComment,
          this.user,
          0,
          this.commentBase,
          0,
          false,
          new Date()
        );

        this.renderComment(newComment, false);

        commentCounter.innerHTML = `(${this.commentBase.getCommentsQty()})`;

        //console.log(this.commentBase)
      }
    });

    commentCounter.innerHTML = `(${this.commentBase.getCommentsQty()})`;
  }

  favListener() {
    //действие по кнопке "избранное"

    let favPressed: boolean = false;

    const favOnImg: HTMLImageElement | null = document.querySelector(".fav-on");
    const favOffImg: HTMLImageElement | null =
      document.querySelector(".fav-off");

    const showFavBtn: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector(".comm__favourities")
    );

    showFavBtn.addEventListener("click", () => {
      favPressed = !favPressed;

      if (favPressed == true) {
        // если кнопка не была до этого нажата, то отрисовываем только избранные комменты

        this.renderOnlyFav();

        if (!favOnImg) return;

        favOnImg.classList.remove("hidden");

        if (!favOffImg) return;

        favOffImg.classList.add("hidden");
      } else {
        // если кнопка уже нажата, т.е. избранное уже отображается, то по повторному нажатию отрисовываем всё

        this.clearAll();

        this.renderCommentBase();

        if (!favOnImg) return;

        favOnImg.classList.add("hidden");

        if (!favOffImg) return;

        favOffImg.classList.remove("hidden");
      }
    });
  }

  clearAll() {
    //базу не трогаем, убираем только отображение на странице

    const allCommentsBlock: HTMLElement = <HTMLElement>(
      document.querySelector(".comments__block")
    );

    allCommentsBlock.innerHTML = "";
  }

  renderOnlyFav() {
    // отрисовать только избранные комменты

    this.clearAll();

    let allComments: Comment[] = this.commentBase.getAllComments();

    allComments.forEach((comment) => {
      let isFav: boolean = comment.getIsFavorite();

      let replies: Comment[] = comment.getReplies();

      let favReplyFlag: boolean = false;

      replies.forEach((reply) => {
        //проверяем, есть ли ответы на этот коммент в избранном

        if (reply.getIsFavorite() == true) {
          favReplyFlag = true;
        }
      });

      if (isFav != false || favReplyFlag != false) {
        this.renderComment(comment, true);
      }

      // если коммент в избранном или если хотя бы 1 из ответов в избранном, то отрисовываем коммент
      else return;
    });
  }

  filterMenuListener() {
    const filterBtn: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector(".comm__btn")
    );

    const filtermenu: HTMLElement = <HTMLElement>(
      document.getElementById("filtermenu")
    );

    filterBtn.addEventListener("click", () => {
      filtermenu.classList.toggle("hidden");
    });

    const menuLegend: HTMLElement = <HTMLElement>(
      document.querySelector(".comm__filter-text")
    );

    const byDate: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("by-date")
    );
    const byRating: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("by-rating")
    );
    const byActuality: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("by-actuality")
    );
    const byAnswers: HTMLButtonElement = <HTMLButtonElement>(
      document.getElementById("by-answers")
    );

    const byDateG: HTMLImageElement = <HTMLImageElement>(
      document.querySelector(".by-date-g")
    );
    const byRatingG: HTMLImageElement = <HTMLImageElement>(
      document.querySelector(".by-rating-g")
    );
    const byActualityG: HTMLImageElement = <HTMLImageElement>(
      document.querySelector(".by-actuality-g")
    );
    const byAnswersG: HTMLImageElement = <HTMLImageElement>(
      document.querySelector(".by-answers-g")
    );

    const sortArrow: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector(".sort")
    );
    const arrowUp: HTMLImageElement = <HTMLImageElement>(
      document.querySelector(".arrow-up")
    );
    const arrowDwn: HTMLImageElement = <HTMLImageElement>(
      document.querySelector(".arrow-down")
    );

    sortArrow.addEventListener("click", () => {
      arrowUp.classList.toggle("hidden");
      arrowDwn.classList.toggle("hidden");

      this.commentBase.reverseBase();
      this.clearAll();
      this.renderCommentBase();
    });

    byDate.addEventListener("click", () => {
      byDateG.classList.remove("transparent");
      filtermenu.classList.add("hidden");
      menuLegend.innerHTML = "По дате";

      byRatingG.classList.add("transparent");
      byActualityG.classList.add("transparent");
      byAnswersG.classList.add("transparent");

      this.commentBase.sortByDate();
      this.clearAll();
      this.renderCommentBase();
    });

    byRating.addEventListener("click", () => {
      byRatingG.classList.remove("transparent");
      filtermenu.classList.add("hidden");
      menuLegend.innerHTML = "По рейтингу";

      byDateG.classList.add("transparent");
      byActualityG.classList.add("transparent");
      byAnswersG.classList.add("transparent");

      this.commentBase.sortByRating();
      this.clearAll();
      this.renderCommentBase();
    });

    byActuality.addEventListener("click", () => {
      byActualityG.classList.remove("transparent");
      filtermenu.classList.add("hidden");
      menuLegend.innerHTML = "По актуальности";

      byRatingG.classList.add("transparent");
      byDateG.classList.add("transparent");
      byAnswersG.classList.add("transparent");

      this.commentBase.sortByActuality();
      this.clearAll();
      this.renderCommentBase();
    });

    byAnswers.addEventListener("click", () => {
      byAnswersG.classList.remove("transparent");
      filtermenu.classList.add("hidden");
      menuLegend.innerHTML = "По кол-ву ответов";

      byDateG.classList.add("transparent");
      byActualityG.classList.add("transparent");
      byRatingG.classList.add("transparent");

      this.commentBase.sortByRepliesQty();
      this.clearAll();
      this.renderCommentBase();
    });
  }

  textLengthChecker() {
    const maxSymbolQty: number = 400; // ограничение по кол-ву символов

    const infoMsg: HTMLElement = <HTMLElement>(
      document.querySelector(".comm__form-symbols-counter")
    );

    const replyBtn: HTMLButtonElement | null =
      document.querySelector(".reply-post-btn");

    let warnMsg: HTMLElement | null =
      document.querySelector(".warning__message");
    let warnMsgReply: HTMLElement | null = document.querySelector(
      ".reply-warning__message"
    );

    //счетчик символов в комменте

    infoMsg.innerHTML = `Макс. ${maxSymbolQty} символов`;

    const commentInput = this.commentInput;
    if (!commentInput) return;

    commentInput.oninput = () => {
      let charQty: number = 0;

      commentInput.value = commentInput.value.slice(0, maxSymbolQty);

      charQty = commentInput.value.length;

      if (charQty > maxSymbolQty - 1) {
        if (!warnMsg) return;

        warnMsg.classList.add("showmsg");

        if (!this.postCommentBtn) return;

        this.postCommentBtn.classList.add("inactive_btn");

        this.postCommentBtn.setAttribute("disabled", "");
      }

      if (charQty <= maxSymbolQty - 1) {
        if (!warnMsg) return;

        warnMsg.classList.remove("showmsg");

        if (!this.postCommentBtn) return;

        this.postCommentBtn.classList.remove("inactive_btn");

        this.postCommentBtn.removeAttribute("disabled");
      }
    };

    //счетчик символов в ответе

    let replyInput: HTMLInputElement | null =
      document.querySelector(".reply-input");

    let replyInfoMsg: HTMLElement = <HTMLElement>(
      document.querySelector(".comm__form-symbols-reply")
    );

    if (!replyInput) return;

    replyInfoMsg.innerHTML = `Макс. ${maxSymbolQty} символов`;

    replyInput.oninput = () => {
      if (!replyInput) return;

      let charQty: number = 0;

      replyInput.value = replyInput.value.slice(0, maxSymbolQty);

      charQty = replyInput.value.length;

      if (charQty > maxSymbolQty - 1) {
        if (!warnMsgReply) return;

        warnMsgReply.classList.add("showmsg");

        if (!replyBtn) return;

        replyBtn.classList.add("inactive_btn");

        replyBtn.setAttribute("disabled", "");
      }

      if (charQty < maxSymbolQty - 1) {
        if (!warnMsgReply) return;

        warnMsgReply.classList.remove("showmsg");

        if (!replyBtn) return;

        replyBtn.classList.remove("inactive_btn");

        replyBtn.removeAttribute("disabled");
      }
    };
  }

  textareaResize() {
    const textarea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.querySelector(".comm-input")
    );

    const replyArea: HTMLTextAreaElement | null =
      document.querySelector(".reply-input");

    textarea.addEventListener("keyup", () => {
      textarea.style.height = `${textarea.scrollHeight}px`;

      if (textarea.value == "") {
        textarea.style.height = `60px`;
      }
    });

    const postBtn: HTMLButtonElement | null = document.querySelector(
      ".comm__form-send-btn"
    );
    const replyBtn: HTMLButtonElement | null =
      document.querySelector(".reply-post-btn");

    if (!postBtn) return;

    postBtn.addEventListener("click", () => {
      textarea.style.height = `60px`;
    });

    if (!replyArea) return;
    if (!replyBtn) return;

    replyBtn.addEventListener("click", () => {
      replyArea.style.height = `60px`;
    });

    replyArea.addEventListener("keyup", () => {
      replyArea.style.height = `${replyArea.scrollHeight}px`;

      if (replyArea.value == "") {
        replyArea.style.height = `60px`;
      }
    });
  }
}
