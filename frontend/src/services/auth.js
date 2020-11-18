export const isAuthenticated = () => {
    return localStorage.getItem("userId") ? true : false;
}