"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(commentText, commentId, user, parentId, commentRating, isFavorite, commentDate) {
        this.commentText = commentText;
        this.commentId = commentId;
        this.user = user;
        this.commentRating = commentRating;
        this.parentId = parentId;
        this.commentDate = commentDate;
        this.isFavorite = isFavorite;
        this.replies = [];
    }
    setFavorite(user) {
        this.isFavorite = true;
        //this.whoSetInFav.push(user)
    }
    unsetFavorite(user) {
        this.isFavorite = false;
        //this.whoSetInFav.push(user)
    }
    toggleFavorite(user) {
        this.isFavorite = !this.isFavorite;
        //this.whoSetInFav.push(user)
    }
    getIsFavorite() {
        return this.isFavorite;
    }
    getReplies() {
        return this.replies;
    }
    addReplyToComment(reply) {
        this.replies.push(reply);
    }
    getCommentText() {
        return this.commentText;
    }
    getUser() {
        return this.user;
    }
    getCommentDate() {
        return this.commentDate;
    }
    getCommentID() {
        return this.commentId;
    }
    getParentID() {
        return this.parentId;
    }
    ratingIncrease(userWhoLiked) {
        this.commentRating++;
        //  this.likes.push(userWhoLiked)
    }
    ratingReduce(userWhoDisliked) {
        this.commentRating--;
        //  this.likes.push(userWhoDisliked)
    }
    getRating() {
        return this.commentRating;
    }
    getDate() {
        return this.commentDate.getTime();
    }
    getRepliesQty() {
        return this.replies.length;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map