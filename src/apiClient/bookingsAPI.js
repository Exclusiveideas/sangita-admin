import { addAuthHeader } from "../lib/utils";
import { API } from "./authAPI";


export const fetchAllBookingsAPI = async () => {
    try {
        const authHeader = addAuthHeader();

        const response = await API.get("/booking/fetchAll", {
            headers: {
                "Content-Type": "application/json",
                ...authHeader,
            },
        });


        return response?.data?.data
    } catch (error) {
        const status = error?.response?.status;
        const message = error?.response?.data?.error || "";

        const isUnauthorized =
            status === 401 ||
            status === 403 || // optional: handle forbidden
            typeof message === "string" &&
            message.toLowerCase().includes("unauthorized");

        if (isUnauthorized) {
            return { error: "Unauthorized - Please re-login" };
        }

        return {
            error: message || error.message || "Something went wrong.",
        };
    }
};
