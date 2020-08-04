import firebase from "./firebase";

class UserBookmarkService {
  constructor() {
    this.db = firebase.firestore();
  }

  async getBookmark(user, url) {
    const userBookmarkSnapshot = await this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .where("url", "==", url)
      .get();

    if (userBookmarkSnapshot.empty) {
      return null;
    }

    let userBookmark = null;
    userBookmarkSnapshot.forEach(doc => {
      userBookmark = doc.data();
      userBookmark.id = doc.id;
    });

    return userBookmark;
  }

  addBookmark(user, form) {
    form.bookmarkedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .add(form);
  }

  async getBookmarks(user) {
    const snapshot = await this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .orderBy("bookmarkedAt", "desc")
      .get();

    return snapshot.docs.map(doc => {
      return {
        ...doc.data(),
        bookmarkedAt: doc.data().bookmarkedAt.toDate(),
        id: doc.id
      };
    });
  }
}

const userBookmarkService = new UserBookmarkService();
export { userBookmarkService };
