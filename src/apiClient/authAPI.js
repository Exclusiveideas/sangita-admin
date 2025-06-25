import { addAuthHeader } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URI,
  withCredentials: true, // 🔥 Ensures cookies are sent & received
});

export const createUser = async (formData) => {
  const { firstName, lastName, email, password  } = formData;
  try {
    const response = await API.post(`/user/signup`, {
      firstName, lastName, email, password 
    });

    // Store token in localStorage
    localStorage.setItem("sangita_access_token", response.data.access_token);

    return { status: response.status, user: response.data?.user };
  } catch (err) {
    return {
      error:
        err?.response?.data?.error ||
        err?.message ||
        "Problem creating account - Try again.",
    };
  }
};

export const loginUser = async (formData) => {
  const { email, password } = formData;
  try {
    const response = await API.post(`/user/login`, { email, password });

    // Store token in localStorage
    localStorage.setItem("sangita_access_token", response.data.access_token);

    return { status: response.status, user: response.data?.user };
  } catch (err) {
    return {
      status: err?.response?.status || 500,
      error:
        err?.response?.data?.error ||
        err?.message ||
        "Problem signing in - Try again.",
    };
  }
};

export const logOutUser = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("sangita_access_token");

    // Send request to the logout endpoint (if token exists)
    if (token) {
      await API.post(
        `/user/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
  } catch (err) {
    console.warn(
      "Logout request failed:",
      err?.response?.data?.error || err?.message
    );
  } finally {
    // ✅ Remove token from localStorage regardless of success or failure
    localStorage.removeItem("sangita_access_token");
  }

  return { status: 200, message: "Logged out locally." };
};


export const fetchUser = async ({ updateUser, onUnauthorized }) => {
  try {
    const accessToken = localStorage.getItem("sangita_access_token");
    if (!accessToken) {
      console.warn("No access token found.");
      if (onUnauthorized) onUnauthorized();
      return;
    }

    const authHeader = addAuthHeader();

    const response = await API.get("/user/getUser", {
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
      },
    });


    if (response?.data?.user) {
      updateUser(response.data.user);
    } else {
      throw new Error("User object missing in response");
    }
  } catch (error) {
    const isUnauthorized =
      error?.response?.status === 401 ||
      error?.response?.data?.error?.toLowerCase().includes("unauthorized");

    if (isUnauthorized && onUnauthorized) {
      onUnauthorized();
    }

    toast.error("Error fetching user", {
      description:
        error?.response?.data?.error || error?.message || "Something went wrong.",
      style: { border: "none", color: "red" },
    });
  }
};