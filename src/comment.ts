import { User } from "./user";

export class Comment {
  private commentText: string;
  private commentId: number;
  private user: User;
  private commentRating: number;
  private parentId: number;
  private commentDate: Date;
  private isFavorite: boolean;
  private replies: Comment[];

  constructor(
    commentText: string,
    commentId: number,
    user: User,
    parentId: number,
    commentRating: number,
    isFavorite: boolean,
    commentDate: Date
  ) {
    this.commentText = commentText;
    this.commentId = commentId;
    this.user = user;
    this.commentRating = commentRating;
    this.parentId = parentId;
    this.commentDate = commentDate;
    this.isFavorite = isFavorite;
    this.replies = [];
  }

  setFavorite(user: User) {
    this.isFavorite = true;
    //this.whoSetInFav.push(user)
  }

  unsetFavorite(user: User) {
    this.isFavorite = false;
    //this.whoSetInFav.push(user)
  }

  toggleFavorite(user: User) {
    this.isFavorite = !this.isFavorite;
    //this.whoSetInFav.push(user)
  }

  getIsFavorite() {
    return this.isFavorite;
  }

  getReplies() {
    return this.replies;
  }

  addReplyToComment(reply: Comment) {
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

  ratingIncrease(userWhoLiked: User) {
    this.commentRating++;
    //  this.likes.push(userWhoLiked)
  }

  ratingReduce(userWhoDisliked: User) {
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

  /*    getLikes() {
         return this.likes
      }
   
      getDislikes() {
         return this.dislikes
      } */
}
