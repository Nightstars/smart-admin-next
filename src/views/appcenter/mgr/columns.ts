import { h } from 'vue';
import { NAvatar } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'seqNo',
    width: 80,
    ifShow: false,
  },
  {
    title: '应用名称',
    key: 'name',
    width: 100,
  },
  {
    title: 'icon',
    key: 'avatar',
    width: 60,
    render(row) {
      return h(NAvatar, {
        size: 50,
        src: row.icon,
      });
    },
  },
  {
    title: 'Url',
    key: 'url',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    width: 150,
  },
  {
    title: '描述',
    key: 'summary',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 100,
  },
];
