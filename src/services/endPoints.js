import axios from 'axios';

const api = 'http://127.0.0.1:8000';

export const RegisterUser = async ({ user }) => {

    const header = "/users/create";
    console.log(user)
    try {
        const resPut = await axios.post(api + header, {
            user_name: user.userName,
            password: user.password,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            bio: user.bio,
            gender: user.gender
        })
        if (resPut.status === 201) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const LoginUser = async ({ user }) => {

    const header = "/users/login";
    try {
        const resPut = await axios.post(api + header, {
            user_name: user.userName,
            password: user.password,
        })
        if (resPut.status === 202) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const getUser = async ({ userName }) => {

    const header = "/users/" + userName;
    try {
        const resPut = await axios.get(api + header, {})
        if (resPut.status === 200) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const SendTweet = async ({ token, tweetInfo }) => {

    const header = "/tweets/create";
    try {
        const resPut = await axios.post(api + header, tweetInfo, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (resPut.status === 201) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const getTweets = async ({ userName }) => {

    const header = "/tweets/";
    try {
        const resPut = await axios.get(api + header, {
            headers: {
                'User-Name': userName
            }
        })
        if (resPut.status === 200) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const LikeTweet = async ({ token, tweetId, userName }) => {

    const header = "/tweets/like/" + tweetId;
    try {
        const resPut = await axios.put(api + header, {

        }, {
            params: {
                user_name: userName
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (resPut.status === 200) {
            return resPut.data[0]
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const DeleteTweet = async ({ token, tweetId, userName }) => {

    const header = "/tweets/delete/" + tweetId + "?user_name=" + userName;
    try {
        const resPut = await axios.put(api + header, {

        }, {
            params: {
                user_name: userName
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (resPut.status === 200) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const getUserTweets = async ({ userName }) => {

    const header = "/tweets/user/" + userName;
    try {
        const resPut = await axios.get(api + header, {})
        if (resPut.status === 200) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const getUsers = async ({ userName }) => {

    const header = "/users/";
    try {
        const resPut = await axios.get(api + header, {
            headers: {
                'User-Name': userName
            }
        })
        if (resPut.status === 200) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}
export const getTweet = async ({ userName, tweetId }) => {

    const header = "/tweets/" + tweetId;
    try {
        const resPut = await axios.get(api + header, {
            params: {
                user_name: userName
            }
        })
        if (resPut.status === 200) {
            return resPut.data
        } else {
            return -1
        }
    } catch (error) {
        console.log(error)
        return -1
    }
}