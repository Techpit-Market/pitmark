import firebase from "./firebase";

class AuthService {
  constructor() {
    this.auth = firebase.auth();
  }

  onStateChanged(fn) {
    this.auth.onAuthStateChanged(fn);
  }

  signUp(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  async update(currentPassword, email, password) {
    const user = await this.reauthenticate(currentPassword);
    if (email) {
      await user.updateEmail(email);
    }
    if (password) {
      await user.updatePassword(password);
    }
  }

  async retire(password) {
    const user = await this.reauthenticate(password);
    await user.delete();
  }

  async reauthenticate(password) {
    const user = this.auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );
    await user.reauthenticateWithCredential(credential);
    return user;
  }
}

const authService = new AuthService();
export { authService };
