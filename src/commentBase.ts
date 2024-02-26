import { Comment } from "./comment";

export class CommentBase {
  commentBase: Comment[];

  constructor() {
    this.commentBase = [];
  }

  public addCommentToBase(comment: Comment) {
    this.commentBase.push(comment);
  }

  public getCommentById(id: number) {
    for (let i = 0; i < this.commentBase.length; i++) {
      let currentId: number = this.commentBase[i].getCommentID();

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

    return this.commentBase.sort(
      (a, b) => b.getRepliesQty() - a.getRepliesQty()
    );
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
