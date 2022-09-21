import { h } from 'vue';
import { NTime } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'seqNo',
    width: 80,
    ifShow: false,
  },
  {
    title: '组别名称',
    key: 'groupName',
    width: 100,
  },
  {
    title: '权重',
    key: 'groupWeight',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    width: 100,
  },
  {
    title: '描述',
    key: 'groupDescription',
    width: 150,
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 150,
    render(row) {
      return h(NTime, {
        format: 'yyyy-MM-dd hh:mm:ss',
        time: new Date(row.createTime),
      });
    },
  },
];
