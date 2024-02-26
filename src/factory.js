"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const comment_1 = require("./comment");
const commentBase_1 = require("./commentBase");
class Factory {
    constructor() {
        this.lastID = 1;
    }
    createComment(textOfComment, user, parentID, commentBase, commentRating, isFavorite, date) {
        let newComment = new comment_1.Comment(textOfComment, this.lastID++, user, parentID, commentRating, isFavorite, date);
        commentBase.addCommentToBase(newComment);
        localStorage.setItem("savedComments", JSON.stringify(commentBase));
        return newComment;
    }
    saveChangedBase(commentBase) {
        localStorage.setItem("savedComments", JSON.stringify(commentBase));
    }
    createReply(textOfComment, user, parentID, comment, commentBase, commentRating, isFavorite, date) {
        let newReply = new comment_1.Comment(textOfComment, this.lastID++, user, parentID, commentRating, isFavorite, date);
        comment.addReplyToComment(newReply);
        localStorage.setItem("savedComments", JSON.stringify(commentBase));
        return newReply;
    }
    readInitComments(commentBase) {
        let inCom = `{"commentBase":
[{"commentText":"Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
   "commentId":1,
   "user":{"name":"Kolya G","avatar":"./jpg/Gogol.jpg","userID":0},
   "commentRating":4,
   "parentId":0,
   "commentDate":"2024-01-26T08:21:44.605Z",
   "isFavorite":false,
   "replies":[
      {"commentText":"Первыйнах",
      "commentId":4,
      "user":{"name":"Alex_Pushkin1799","avatar":"./jpg/Pushkin.jpg","userID":0},
      "commentRating":-11,
      "parentId":1,
      "commentDate":"2024-01-26T08:23:52.109Z",
      "isFavorite":false,
      "replies":[]},
      {"commentText":"Коль, ты б хоть посмотрел для начала, прежде чем осуждать",
      "commentId":5,
      "user":{"name":"Антон Чехов","avatar":"./jpg/Chehov.jpg","userID":0},
      "commentRating":2,
      "parentId":1,
      "commentDate":"2024-02-29T08:21:56.493Z",
      "isFavorite":false,
      "replies":[]}]},

   {"commentText":"Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
   "commentId":2,
   "user":{"name":"HИKOЛAИ4","avatar":"./jpg/Tolstoy.jpg","userID":0},
   "commentRating":6,
   "parentId":0,
   "commentDate":"2024-02-05T08:21:46.485Z",
   "isFavorite":true,
   "replies":[]},
   
   {"commentText":"Вообще не пойму, кто смотрит такую шляпу",
   "commentId":3,
   "user":{"name":"Alex_Pushkin1799","avatar":"./jpg/Pushkin.jpg","userID":0},
   "commentRating":-3,
   "parentId":0,
   "commentDate":"2024-02-10T08:21:48.805Z",
   "isFavorite":false,
   "replies":[
      {"commentText":"Ну да, таким как ты - только стрелялки подавай. Пыщ-пыщ, а что такое философия - это нам не интересно...",
      "commentId":6,
      "user":{"name":"Kolya G","avatar":"./jpg/Gogol.jpg","userID":0},
      "commentRating":1,
      "parentId":3,
      "commentDate":"2024-02-11T08:22:00.101Z",
      "isFavorite":false,
      "replies":[]}]}]}`;
        let savedCommentsJson = localStorage.getItem("savedComments");
        if (!savedCommentsJson) {
            localStorage.setItem("savedComments", inCom);
        }
    }
    fillCommentBase() {
        let commentBase = new commentBase_1.CommentBase();
        this.readInitComments(commentBase);
        this.readCommentsFromStorage(commentBase);
        return commentBase;
    }
    readCommentsFromStorage(commentBase) {
        let savedCommentsJson = localStorage.getItem("savedComments");
        if (!!savedCommentsJson) {
            const savedComments = JSON.parse(savedCommentsJson);
            if (!!savedComments) {
                for (let i = 0; i <= savedComments.commentBase.length - 1; i++) {
                    let currentComment = savedComments.commentBase[i];
                    let currentCommentDate = new Date(Date.parse(currentComment.commentDate));
                    let newComment = new comment_1.Comment(currentComment.commentText, currentComment.commentId, currentComment.user, currentComment.parentId, currentComment.commentRating, currentComment.isFavorite, currentCommentDate);
                    commentBase.addCommentToBase(newComment);
                    for (let j = 0; j <= currentComment.replies.length - 1; j++) {
                        let currentReply = currentComment.replies[j];
                        let currentReplyDate = new Date(Date.parse(currentReply.commentDate));
                        let newReply = new comment_1.Comment(currentReply.commentText, currentReply.commentId, currentReply.user, currentReply.parentId, currentReply.commentRating, currentReply.isFavorite, currentReplyDate);
                        newComment.addReplyToComment(newReply);
                    }
                }
            }
        }
    }
    clearStorage() {
        localStorage.clear();
    }
}
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map