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

export const SendTweet = async ({ token, tweetInfo }) => {

    const header = "/tweets/create";
    console.log(tweetInfo)
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