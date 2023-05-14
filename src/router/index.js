import { createRouter, createWebHistory } from 'vue-router'
import PageNotFound from '../components/PageNotFound.vue'
import MeetingRoomOccupancy from '../components/MeetingRoomOccupancy.vue'

const routes = [
    {
      path: '/',
      redirect: '/occupancy',
      name: 'home',
      children: [
        {
          path: '/occupancy',
          name: 'occupancy',
          component: MeetingRoomOccupancy
        },
        {
          path: '*',
          component: PageNotFound,
          name: 'page-not-found'
        }
      ]
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
