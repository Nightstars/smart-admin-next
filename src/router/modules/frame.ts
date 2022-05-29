import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { DesktopOutline } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/frame',
    name: 'Frame',
    redirect: '/frame/docs',
    component: Layout,
    meta: {
      title: '帮助文档',
      sort: 8,
      icon: renderIcon(DesktopOutline),
    },
    children: [
      {
        path: 'naive',
        name: 'frame-naive',
        meta: {
          title: 'NaiveUi',
          frameSrc: 'https://www.naiveui.com',
        },
        component: IFrame,
      },
      {
        path: 'AntDesign',
        name: 'frame-antd',
        meta: {
          title: 'AntDesign',
          frameSrc: 'https://www.antdv.com/docs/vue/introduce-cn',
        },
        component: IFrame,
      },
      {
        path: 'docs',
        name: 'frame-docs',
        meta: {
          title: '项目文档',
          frameSrc: 'https://naive-ui-admin-docs.vercel.app',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
