import authStore from "./AuthStore";

const API_URL = "http://localhost:8003";


const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        }),
    });
console.log(res)
    if (res.status === 401) {
        throw new Error("Invalid login credentials");
    }

    const data = await res.json();
    return data.token;
};

export default { login };
