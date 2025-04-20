export default class Auth {
  static getAccessToken() {
    // const token = localStorage.getItem("token");
    // return token;
    const token = localStorage.getItem("token");

    return token;
  }
}
