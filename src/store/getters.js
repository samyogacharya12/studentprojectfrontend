const getters = {
    isLoggedIn: state => !!state.user.token,
    token: state => state.user.token,
    username: state => state.user.username
}
export default getters
