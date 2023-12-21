import { createRouter, createWebHashHistory } from "vue-router"
import Login from "../view/login.vue"
import Home from "../view/home.vue"
import Register from "../view/register.vue"
import Me from '../view/my.vue'
import Class from "../view/class.vue"
import User from '../view/user.vue'
import kaoqinbiao from '../view/kaoqinbiao.vue'
import seat from '../view/seat.vue'
const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        component: Login
    }, ,
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
                path: '/home',
                redirect: '/home/me'
            }, {
                path: '/home/me',
                name: 'Me',
                component: Me
            },
            {
                path: '/home/kao',
                name: 'kao',
                component: kaoqinbiao
            },

            {
                path: '/home/sign',
                name: 'Sign',

                meta: {
                    keepAlive: true
                },
                component: () =>
                    import ('../view/sign.vue')
            }, {
                path: '/home/class',
                name: 'Class',
                component: Class
            }, {
                path: '/home/user',
                name: 'User',
                component: User
            },
            {
                path: '/home/seat',
                name: 'Seat',
                component: seat
            }
        ]
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router