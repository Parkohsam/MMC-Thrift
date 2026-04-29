import { supabase } from "../lib/Supabase";

//Check if user is signed up (uses localStorage for session)
export const isSignedUp = () => !!localStorage.getItem("mmc_user");

// ✅ Save user to both localStorage AND Supabase
export const signUpUser = async (name: string, email: string) => {
    // Save to localStorage for session
    localStorage.setItem("mmc_user", JSON.stringify({ name, email }));

    // Save to Supabase users table
    const { error } = await supabase.from("users").insert([{ name, email }]);

    if (error) {
        if (error.code === "23505") {
            // Email already exists — that's fine
            console.log("User already exists");
            return;
        }
        console.error("Error saving user:", error.message);
    }
};

// ✅ Get user from localStorage
export const getUser = () => {
    const u = localStorage.getItem("mmc_user");
    return u ? JSON.parse(u) : null;
};