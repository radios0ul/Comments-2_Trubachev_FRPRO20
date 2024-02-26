"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentBase = void 0;
class CommentBase {
    constructor() {
        this.commentBase = [];
    }
    addCommentToBase(comment) {
        this.commentBase.push(comment);
    }
    getCommentById(id) {
        for (let i = 0; i < this.commentBase.length; i++) {
            let currentId = this.commentBase[i].getCommentID();
            if (currentId == id) {
                return this.commentBase[i];
            }
        }
    }
    getCommentsQty() {
        return this.commentBase.length;
    }
    sortByDate() {
        this.commentBase.forEach((comment) => {
            comment.getReplies().sort((a, b) => b.getDate() - a.getDate());
        });
        return this.commentBase.sort((a, b) => b.getDate() - a.getDate());
    }
    sortByRating() {
        this.commentBase.forEach((comment) => {
            comment.getReplies().sort((a, b) => b.getRating() - a.getRating());
        });
        return this.commentBase.sort((a, b) => b.getRating() - a.getRating());
    }
    sortByActuality() {
        this.commentBase.forEach((comment) => {
            comment.getReplies().sort((a, b) => a.getDate() - b.getDate());
        });
        return this.commentBase.sort((a, b) => a.getDate() - b.getDate());
    }
    sortByRepliesQty() {
        this.commentBase.forEach((comment) => {
            comment
                .getReplies()
                .sort((a, b) => b.getRepliesQty() - a.getRepliesQty());
        });
        return this.commentBase.sort((a, b) => b.getRepliesQty() - a.getRepliesQty());
    }
    reverseBase() {
        this.commentBase.forEach((comment) => {
            comment.getReplies().reverse();
        });
        return this.commentBase.reverse();
    }
    getAllComments() {
        return this.commentBase;
    }
}
exports.CommentBase = CommentBase;
//# sourceMappingURL=commentBase.js.map