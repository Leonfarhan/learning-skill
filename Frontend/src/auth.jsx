export const fakeAuthProvider = {
    isAuthenticated: localStorage.getItem("username") !== "",
    username: localStorage.getItem("username"),
    async signIn(username) {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        fakeAuthProvider.isAuthenticated = true;
        fakeAuthProvider.username = username;
        localStorage.setItem("username", username);
    },
    async signOut() {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        fakeAuthProvider.isAuthenticated = false;
        fakeAuthProvider.username = "";
        localStorage.setItem("username", "");
    },
};
