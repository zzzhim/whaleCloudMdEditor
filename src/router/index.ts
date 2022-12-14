import { createRouter, createWebHistory } from 'vue-router'

// 1. 定义路由组件.
// 也可以从其他文件导入
// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: '/',
    component: () => import("@/views/desk/index.vue")
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。
  // history: VueRouter.createWebHistory(),
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router
