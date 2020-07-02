import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress'
import {getToken} from "../utils/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    // {
    //   path:'/labtest',
    //   name:'LabTest',
    //   component:()=>import('../views/labtest')
    // },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login')
    },
    {
      path:'/semester',
      name:'Semester',
      component:()=>import('../views/semester'),
        meta: { title: 'Semester | Student' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },
    {
        path:'/student',
        name:'StudentDetail',
        component:()=>import('../views/studentdetail'),
        meta: { title: 'Student Detail | Student' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },
    {
        path:'/marksheet',
        name:'Marksheet',
        component:()=>import('../views/marksheet'),
        meta: { title: 'Marksheet | Student' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },
    {
        path:'/subject',
        name:'Subject',
        component:()=>import('../views/subject'),
        meta: { title: 'Subject | Student' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }

    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard'),
        meta: { title: 'Dashboard | Student' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },
    {
        path: '/*',
        name: 'PageNotFound',
        component: () => import('../views/pagenotfound'),
        meta: { title: 'Page Not Found | Bidhana' },
    },

];

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    },

});

router.beforeEach((to, from, next) => {
    NProgress.configure({ easing: 'ease', speed: 500});
    NProgress.start();
    next()
});

router.afterEach(() => {
    NProgress.done(true)
});

const DEFAULT_TITLE = 'Student';
router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;
