// User utility functions

export const getUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(user => user.login === true);
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const logoutUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => ({
        ...user,
        login: false
    }));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
};