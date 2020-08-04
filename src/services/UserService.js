import gravatar from "gravatar";
import firebase from "./firebase";
import { cacheService } from "./CacheService";

class UserService {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  async getCurrentUser() {
    if (this.auth.currentUser == null) {
      throw new Error("サインインしていません。サインインしてください");
    }

    const snapshot = await this.db
      .collection("users")
      .where("authId", "==", this.auth.currentUser.uid)
      .get();
    let user = null;
    snapshot.forEach(doc => {
      user = doc.data();
      user.id = doc.id;
    });
    return user;
  }

  async createUser(auth) {
    const user = {
      authId: auth.uid,
      name: auth.email.substr(0, auth.email.indexOf("@")),
      gravatarUrl: gravatar.url(auth.email)
    };
    await this.db.collection("users").add(user);
    return user;
  }

  async getUser(userId) {
    const users = cacheService.getItem("users") || {};
    if (!users[userId]) {
      const userRef = await this.db
        .collection("users")
        .doc(userId)
        .get();
      let user = null;
      if (userRef.exists) {
        user = {
          ...userRef.data(),
          id: userId
        };
      }
      users[userId] = user;
      cacheService.setItem("users", users);
    }
    return users[userId];
  }

  async updateUser(userId, data) {
    const ref = await this.db.collection("users").doc(userId);
    return ref.update(data);
  }
}

const userService = new UserService();
export { userService };
