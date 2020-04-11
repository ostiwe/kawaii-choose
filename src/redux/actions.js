export function setAccessToken(accessToken) {
    return {
        type: "SET_ACCESS_TOKEN",
        token: accessToken,
    }
}

export function setCategories(categories) {
    return {
        type: "SET_CATEGORIES",
        payload: categories
    }
}

export function setPosts(posts) {
    return {
        type: "SET_POSTS",
        payload: posts
    }
}

export function setBugTitle(tile) {
    return {
        type: "SET_BUG_TITLE",
        payload: tile
    }
}

export function setBugSubTitle(subtile) {
    return {
        type: "SET_BUG_SUBTITLE",
        payload: subtile
    }
}

export function clearBugReport() {
    return {
        type: "CLEAR_BUG_REPORT",
    }
}

export function setUserInfo(userInfo) {
    return {
        type: 'SET_USER_INFO',
        payload: userInfo
    }
}

export function setBugInfo(bugInfo) {
    return {
        type: 'SET_BUG_INFO',
        payload: bugInfo
    }

}