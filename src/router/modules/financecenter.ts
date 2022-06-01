import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { FundOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routeName = 'FinanceCenter';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/financeCenter',
    name: routeName,
    redirect: '/financeCenter/myApps',
    component: Layout,
    meta: {
      title: '金融中心',
      icon: renderIcon(FundOutlined),
      //permissions: [`${routeName}_myApps`, `${routeName}_appsMgr`],
      sort: 1,
    },
    children: [
      {
        path: 'myApps',
        name: `${routeName}_myApps`,
        meta: {
          title: '金融应用',
          //permissions: [`${routeName}_myApps`],
        },
        component: () => import('@/views/financecenter/home/index.vue'),
      },
      {
        path: 'appsMgr',
        name: `${routeName}_appsMgr`,
        meta: {
          title: '应用管理',
          //permissions: [`${routeName}_appsMgr`],
        },
        component: () => import('@/views/financecenter/mgr/index.vue'),
      },
      {
        path: 'appsGroup',
        name: `${routeName}_appsGroup`,
        meta: {
          title: '分组管理',
          //permissions: [`${routeName}_appsMgr`],
        },
        component: () => import('@/views/financecenter/group/index.vue'),
      },
    ],
  },
];

export default routes;
