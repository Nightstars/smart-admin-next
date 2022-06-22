import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './router-guards';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

//影视中心
export const CinemaRoute: RouteRecordRaw = {
  path: '/cinema',
  name: 'Cinema',
  redirect: '/cinema/recommend',
  component: () => import('@/views/cinema/home/index.vue'),
  meta: {
    title: '影视中心',
  },
  children: [
    {
      path: 'recommend',
      name: 'Recommend',
      component: () => import('@/views/cinema/recommend/index.vue'),
      meta: {
        title: '影视中心-推荐',
      },
    },
    {
      path: 'movie',
      name: 'Movie',
      component: () => import('@/views/cinema/movie/index.vue'),
      meta: {
        title: '影视中心-电影',
      },
    },
    {
      path: 'serial',
      name: 'Serial',
      component: () => import('@/views/cinema/serial/index.vue'),
      meta: {
        title: '影视中心-电视剧',
      },
    },
    {
      path: 'cartoon',
      name: 'Cartoon',
      component: () => import('@/views/cinema/cartoon/index.vue'),
      meta: {
        title: '影视中心-动漫',
      },
    },
    {
      path: 'varietyShow',
      name: 'VarietyShow',
      component: () => import('@/views/cinema/varietyshow/index.vue'),
      meta: {
        title: '影视中心-综艺',
      },
    },
    {
      path: 'detail',
      name: 'Detail',
      component: () => import('@/views/cinema/movieDetail/index.vue'),
      meta: {
        title: '影视中心-详情',
      },
    },
    {
      path: 'play',
      name: 'Play',
      component: () => import('@/views/cinema/play/index.vue'),
      meta: {
        title: '影视中心-播放',
      },
    },
  ],
};

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: any[] = [LoginRoute, RootRoute, RedirectRoute, CinemaRoute];

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
