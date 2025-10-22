export const SERVER_API = import.meta.env.VITE_SERVER_API;

export const SUB_API = {
    AUTH: {
        SIGNUP: "user/signup",
        SIGNIN: "user/signin",
        CURRENT_USER: "user/me",
        UPDATE_USER_DETAIL: "user/update",
        LOGOUT_USER: "user/logout"
    },
    TOUR: {
        CREATE: "tour/",
        GET_ALL_TOURS: "tour/",
        GET_TOUR: "tour/",
    },
    BOOKING: {
        CREATE: "booking/",
        GET_USER_BOOKINGS: "booking/",
        GET_ALL_BOOKINGS: "booking/all",
    },
    PAYMENT: {
        CREATE_CHECKOUT_SESSION: "payment/create-checkout-session",
    },
}
