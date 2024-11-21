import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddBrrowingView from '../views/AddBrrowing.vue';
import AddReaderView from '../views/AddReader.vue';
import PublisherView from '../views/PublisherView.vue';
import AddEmployeeForm from '../views/AddEmployeeForm.vue';

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/nhaxuatban',
            name: 'NXBview',
            component: PublisherView
        },
        {
            path: '/nhanvien',
            name: 'nhanvienview',
            component: AddEmployeeForm
        },
        {
            path: '/theodoimuonsach',
            name: 'AddBrrowing',
            component: AddBrrowingView
        },
        {
            path: '/docgia',
            name: 'AddReader',
            component: AddReaderView
        },

    ]
})

export default router