class API {

    sendTest() {
        return this.requestSender('test')
    };

    getRecentPosts(userId, categoryID = 1) {
        return this.requestSender('posts/recent', {
            category_id: categoryID,
            user_id: userId
        })
    }

    getPosts(userId, page, categoryID = 1) {
        return this.requestSender('category/' + categoryID, {
            user_id: userId,
            page: page,
        })
    }

    postAction(postId, userId, action) {
        return this.requestSender('post/action', {
            type: action,
            user_id: userId,
            post_id: postId
        })
    }

    getCategories() {
        return this.requestSender('categories');
    };

    getUserStats(userID) {
        return this.requestSender('user/stats', {user_id: userID});
    };

    sendBugReport(report = {}) {
        return this.requestSender('bug/send', report)
    };

    getUserBugs(userID) {
        return this.requestSender('bugs/user', {user_id: userID});
    }

    requestSender(uri, data = {}, method = 'POST') {
        return new Promise((resolve, reject) => {
            let xr = new XMLHttpRequest(),
                body = JSON.stringify(data);
            xr.open(method, 'https://api.ostiwe.ru/kawaii/' + uri);
            xr.setRequestHeader('Content-type', 'application/json');
            xr.send(body);
            xr.onload = function () {
                if (xr.status === 200) {
                    resolve(JSON.parse(xr.response));
                }
                if (xr.status !== 200) {
                    reject(xr.response);
                }
            };
            xr.onerror = function () {
                reject('error');
            }

        })
    }
}

export default API;