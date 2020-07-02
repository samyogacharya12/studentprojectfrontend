<template>
    <section class="auth-section">
        <div class="auth-brand">
        </div>
        <div class="auth-info">
            <div class="info-area">
                <p>Student Management System</p>
            </div>
        </div>
        <div class="auth-content" :model="loginForm">
            <div class="auth-form">
                <div class="auth-form-inner">
                    <form>
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" v-model="loginForm.username" class="form-control"
                                   placeholder="email or phone"
                                   :class="{ 'is-invalid': submitted && $v.loginForm.username.$error }">
                            <div v-if="submitted && !$v.loginForm.username.required" class="invalid-feedback">User Name
                                is required
                            </div>

                            <!--                            <small class="form-text">We'll never share your email with anyone else.</small>-->
                        </div>
                        <div class="form-group">
                            <label>Password<a class="float-right forget-text" href="request-reset.html">Forget
                                password?</a></label>
                            <input type="password" v-model="loginForm.password" class="form-control"
                                   placeholder="password"
                                   :class="{ 'is-invalid': submitted && $v.loginForm.password.$error }">
                            <div v-if="submitted && $v.loginForm.password.$error" class="invalid-feedback">
                                <span v-if="!$v.loginForm.password.required">Password is required</span>
                                <span v-if="!$v.loginForm.password.minLength">Password must be at least 6 characters</span>
                            </div>
                        </div>
                        <button class="btn btn-secondary btn-p-l-r" type="submit" @click.prevent="handleLogin">Sign in
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {required, minLength} from "vuelidate/lib/validators";
    import {getUsername, removeUsername, setRole, setUsername} from "../../utils/auth";

    export default {
        name: "login",
        data() {
            return {
                userDto: [],
                loggedIn: this.checkToken(),
                loginForm: {
                    username: '',
                    password: ''
                },
                response: {},
                submitted: false
            }
        },
        validations: {
            loginForm: {
                username: {required},
                password: {required},
            }
        },

        methods: {
            checkToken() {
                return this.$store.getters.isLoggedIn
            },

            handleLogin() {
                this.submitted = true;

                //stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                setUsername(this.loginForm.username);
                this.$store.dispatch('user/login', this.loginForm).then(() => {
                    this.loggedIn = this.checkToken();
                    this.$router.push('dashboard')
                    this.$notify({
                        title: 'Success',
                        message: 'Successfully Logged In',
                        type: 'success',
                        duration: 2000
                    })
                })
            },

            handleLogout() {
                this.$store.dispatch('user/logout').then(() => {
                    this.loggedIn = false
                    removeUsername();
                    this.$router.push('login')
                    this.$notify({
                        title: 'Success',
                        message: 'Successfully logged our',
                        type: 'success',
                        duration: 2000
                    })
                })
            }
        }
    }
</script>

<style scoped>

    .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #dc3545;
    }
</style>
