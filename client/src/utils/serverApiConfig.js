export const SERVER_API = import.meta.env.VITE_SERVER_API;

export const SUB_API = {
    AUTH: {
        SIGNUP: "user/signup",
        SIGNIN: "user/signin",
        CURRENT_USER: "user/me"
    },
    TOUR: {
        CREATE: "tour/",
        GET_ALL_TOURS: "tour/",
        GET_TOUR: "tour/",
    }
}