import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { AppstoreOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'AppCenter';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/appCenter',
    name: routeName,
    redirect: '/appCenter/myApps',
    component: Layout,
    meta: {
      title: '应用中心',
      icon: renderIcon(AppstoreOutlined),
      //permissions: [`${routeName}_myApps`, `${routeName}_appsMgr`],
      sort: 1,
    },
    children: [
      {
        path: 'myApps',
        name: `${routeName}_myApps`,
        meta: {
          title: '我的应用',
          //permissions: [`${routeName}_myApps`],
        },
        component: () => import('@/views/appcenter/home/index.vue'),
      },
      {
        path: 'appsMgr',
        name: `${routeName}_appsMgr`,
        meta: {
          title: '应用管理',
          //permissions: [`${routeName}_appsMgr`],
        },
        component: () => import('@/views/appcenter/mgr/index.vue'),
      },
      {
        path: 'myAppsGroup',
        name: `${routeName}_appsGroup`,
        meta: {
          title: '分组管理',
          //permissions: [`${routeName}_appsMgr`],
        },
        component: () => import('@/views/appcenter/group/index.vue'),
      },
    ],
  },
];

export default routes;
