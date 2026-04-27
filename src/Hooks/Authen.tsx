export const isSignedUp = () => !!localStorage.getItem("mmc_user");

export const signUpUser = (name: string, email: string) => {
    localStorage.setItem("mmc_user", JSON.stringify({ name, email }));
};

export const getUser = () => {
    const u = localStorage.getItem("mmc_user");
    return u ? JSON.parse(u) : null;
};