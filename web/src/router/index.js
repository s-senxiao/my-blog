// import { HomeFilled } from "@ant-design/icons";
import Home from '../pages/home/Home'
export default [
  {
    path: '/',
    component: Home,
    childRoutes: [
      {
        path: '/home',
        component: Home
      }
    ]
  }
]