export default function (state, { type, payload }) {
    switch (type) {
        case "TOGGLE_LOADING":
            return {
                ...state,
                loading: payload
            }

        case "AUTHENTICATION":
            return {
                ...state,
                user: payload
            }

        case "FETCH_LANGUAGES":
            return {
                ...state,
                languages: payload
            }

        case "FETCH_CONTRIBUTIONS":
            return {
                ...state,
                contributions: payload
            }
    }
}