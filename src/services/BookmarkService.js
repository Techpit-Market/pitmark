import firebase from "./firebase";

class BookmarkService {
  constructor() {
    this.db = firebase.firestore();
  }

  async getBookmarks(num, time) {
    let ref = this.db.collection("bookmarks");
    if (time) {
      ref = ref.where("createdAt", "<", time);
    }
    const snapshot = await ref
      .orderBy("createdAt", "desc")
      .limit(num)
      .get();
    return snapshot.docs.map(doc => {
      return {
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate()
      };
    });
  }

  async getBookmark(id) {
    if (id == null) {
      return null;
    }
    const snapshot = await this.db
      .collection("bookmarks")
      .doc(id)
      .get();
    if (snapshot.exists) {
      return {
        ...snapshot.data(),
        id: id
      };
    }
    return null;
  }

  async getBookmarkComments(id) {
    const snapshot = await this.db
      .collection("bookmarks")
      .doc(id)
      .collection("comments")
      .get();
    const comments = [];
    for (let doc of snapshot.docs) {
      const userId = doc.data().userId;
      const user = await this.db
        .collection("users")
        .doc(userId)
        .get();
      comments.push({
        ...doc.data(),
        id: doc.id,
        user: {
          ...user.data(),
          id: userId
        }
      });
    }
    return comments;
  }

  async addStar(bookmarkId, commentId, userId) {
    const commentRef = this.db
      .collection("bookmarks")
      .doc(bookmarkId)
      .collection("comments")
      .doc(commentId);

    const comment = await commentRef.get();
    const stars = comment.data().stars || [];
    stars.push(userId);
    return commentRef.update({ stars: stars });
  }
}

const bookmarkService = new BookmarkService();
export { bookmarkService };
