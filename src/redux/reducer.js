// import vkBridge from '@vkontakte/vk-bridge';


const initialState = {
    artsList: {},
    categories: [],
    user_info: {},
    history: [],
    activePanel: '',
    bug_title: '',
    bug_subtitle: '',
    bug_info: null,
    create_post_categories: [],
    create_post_file: null,
    settings: {
        thumbs: 1,
    }

};

// TODO Реализовать IOS Swipe back
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload
            };
        case "SET_POSTS":
            return {
                ...state,
                artsList: action.payload
            };
        // case "HISTORY_BACK":
        //     let history = [...state.history];
        //     history.pop();
        //     return {};
        case "SET_BUG_TITLE":
            return {
                ...state,
                bug_title: action.payload
            };
        case "SET_BUG_SUBTITLE":
            return {
                ...state,
                bug_subtitle: action.payload
            };
        case "CLEAR_BUG_REPORT":
            return {
                ...state,
                bug_title: '',
                bug_subtitle: '',
            };
        case "SET_USER_INFO":
            return {
                ...state,
                user_info: action.payload
            };
        case "SET_BUG_INFO":
            return {
                ...state,
                bug_info: action.payload
            };
        case "CREATE_POST_SET_CATEGORIES":
            return {
                ...state,
                create_post_categories: action.payload
            }
        case "CREATE_POST_SET_FILE":
            return {
                ...state,
                create_post_file: action.payload
            }
        case "CREATE_POST_CLEAR":
            return {
                ...state,
                create_post_categories: [],
                create_post_file: null
            }
        case "CHANGE_SETTINGS_THUMBS":
            return {
                ...state,
                settings: {
                    ...state.settings,
                    thumbs: action.payload
                }
            }
        default:
            return state;
    }
}