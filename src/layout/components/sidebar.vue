<template>
    <div id="sidebar-wrapper">
        <div class="sidebar-toggler">
            <div class="navbox">
                <div class="toggler-icon"><i class="icon1x icon-menu menu-toggle"></i></div>
                <div class="brand">
                    <img src="@/images/student.jpg">
                </div>
            </div>
            <div class="sidebar">
                <ul class="navbar-nav">

                    <li class="nav-item"> <a> <router-link to="/student"> <a><i class="icon1x icon-user"></i><span>Student Detail</span></a>
                    </router-link>
                    </a>
                    </li>

                    <li  class="nav-item"> <a> <router-link to="/semester"><a><i class="icon1x icon-user"></i><span>Semister</span></a>
                    </router-link>
                    </a>
                    </li>


                    <li class="nav-item"><a > <router-link to="/subject"><a> <i class="icon1x icon-user"></i><span>Subject</span></a>
                    </router-link>
                    </a>
                    </li>

                    <li class="nav-item"><a> <router-link to="/marksheet"><a><i class="icon1x icon-user"></i><span>Generate Marksheet</span></a>
                    </router-link>
                    </a>
                    </li>

                    <li class="nav-item"><a class="nav-link" @click="handleLogout"><i
                            class="icon1x icon-logout"></i><span>Log Out</span></a>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {removeUsername} from "../../utils/auth";
    import Vue from "vue";
    import $ from "jquery";

    export default {
        name: "Sidebar",

        data() {
            return {
                toPackageOrder()
                {
                    this.$router.push('/packageorder');
                },
                toPurchaseOrder()
                {
                  this.$router.push('/purchaseorder')
                },
                toDashboard() {
                    this.$router.push('/dashboard')
                },
                toSubscriptionOrder(){
                  this.$router.push("/subscriptionorder")
                },
                toUsers() {
                    this.$router.push('/users')
                },
                toPlan() {
                    this.$router.push('/plan')
                },
                toPlanPackage() {
                    this.$router.push('/planpackage')
                },
                toPlanPackageDetail() {
                    this.$router.push('/planpackagedetail')
                },

                toSubscription() {
                    this.$router.push('subscription-plan')
                },

                toCategory() {
                    this.$router.push('category')
                },
                toCoupon()
                {
                  this.$router.push('/coupon');
                },
                toProduct() {
                    this.$router.push('products')
                },
                toLab() {
                    this.$router.push('lab');
                },
                toStores() {
                    this.$router.push('stores')
                },

                toStoreType() {
                    this.$router.push('store-type')
                },
                toStores() {
                    this.$router.push('stores')
                },
                toCategory() {
                    this.$router.push('category')

                },
                toSubCategory() {
                    this.$router.push('sub-category')
                },
                toProductType() {
                    this.$router.push('product-type')
                },

                toQuantityType() {
                    this.$router.push('quantity-type')
                },
                toProduct() {
                    this.$router.push('products')
                },
                toPackages() {
                    this.$router.push('packages')
                },
                toPrescriptionQuotation() {
                    this.$router.push("prescription-quotation")
                },

                toPackages() {
                    this.$router.push("packages")
                },

                toPackageDetails() {
                    this.$router.push("package-detail")
                }
            }
        },

        methods: {
            handleLogout() {
                this.$store.dispatch('user/logout').then(() => {
                    this.loggedIn = false
                    removeUsername();
                    this.$router.push('login')
                    Vue.notify({
                        group: 'alert-message',
                        type: 'success',
                        title: 'Success',
                        text: 'Successfully Logged Out'
                    })
                })
            }
        },

        mounted() {
            $(document).ready(function () {
                $(".menu-toggle").click(function (e) {
                    e.preventDefault();
                    $("#wrapper").toggleClass("toggled");
                });
            });

            $('.nav-item ul').hide();
            $(".nav-item a").click(function () {
                $(this).parent(".nav-item").children("ul").slideToggle("100");
                $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
            });
        }
    }
</script>

<style scoped>
    .nav-link {
        cursor: pointer;
    }

    .sub-menu {
        list-style: none;
    }

    .sub-menu li {
        padding: 4px;
        cursor: pointer;
        border-left: 4px solid transparent;
    }

    .sub-menu li:hover {
        background: #ebebeb;
        padding: 4px;
        cursor: pointer;
        border-left: 4px solid #20bdbe;
    }

    .right {
        margin-left: .5rem;
    }
</style>
