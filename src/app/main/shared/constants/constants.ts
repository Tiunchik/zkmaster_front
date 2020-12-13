import {ZkNodeModel} from '../domains/zk-node.model';

export const ZKNODES_EXPML: ZkNodeModel = {
  path: '/',
  value: '',
  name: '/',
  father: null,
  children: [
    {
      path: '/firstNode',
      value: 'firstValue',
      name: 'firstNode',
      father: null,
      children: [
        {
          path: '/firstNode/firstNodeChild',
          value: 'firstNodeChildValue',
          name: 'firstNodeChild',
          father: null,
          children: [
            {
              path: '/firstNode/firstNodeChild/zookeeper',
              value: '',
              name: 'zookeeper',
              father: null,
              children: null
            },
            {
              path: '/firstNode/firstNodeChild/quota',
              value: '',
              name: 'quota',
              father: null,
              children: null
            }
          ]
        }
      ]
    },
    {
      path: '/zookeeper',
      value: '',
      name: 'zookeeper',
      father: null,
      children: [
        {
          path: '/zookeeper/config',
          value: '',
          name: 'config',
          father: null,
          children: null
        },
        {
          path: '/zookeeper/quota',
          value: '',
          name: 'quota',
          father: null,
          children: null
        }
      ]
    }
  ]
};
export const SETTINGS_NAME = 'settins';
