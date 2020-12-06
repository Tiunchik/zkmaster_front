import {ZkNode} from '../domains/ZkNode';

export const ZKNODES_EXPML: ZkNode = {
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
          children: null
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
