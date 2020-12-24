import {ZkNodeModel} from '../domains/zk-node.model';

export const ZKNODES_EXPML: ZkNodeModel = {
  path: '/',
  value: '',
  name: '/',
  children: [
    {
      path: '/a1',
      value: 'value',
      name: 'a1',
      children: [
        {
          path: '/a1/a2',
          value: 'value',
          name: 'a2',
          children: [
            {
              path: '/a1/a2/a3',
              value: 'value',
              name: 'a3',
              children: [
                {
                  path: '/a1/a2/a3/a4',
                  value: 'value',
                  name: 'a4',
                  children: [
                    {
                      path: '/a1/a2/a3/a4/a5',
                      value: 'value',
                      name: 'a5',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/zookeeper',
      value: '',
      name: 'zookeeper',
      children: [
        {
          path: '/zookeeper/config',
          value: '',
          name: 'config',
          children: []
        },
        {
          path: '/zookeeper/quota',
          value: '',
          name: 'quota',
          children: []
        }
      ]
    },
    {
      path: '/l1',
      value: 'value',
      name: 'l1',
      children: [
        {
          path: '/l1/exp1',
          value: 'value',
          name: 'exp1',
          children: []
        },
        {
          path: '/l1/l2',
          value: 'value',
          name: 'l2',
          children: [
            {
              path: '/l1/l2/l3',
              value: null,
              name: 'l3',
              children: [
                {
                  path: '/l1/l2/l3/l4',
                  value: null,
                  name: 'l4',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/firstNode',
      value: 'firstValue',
      name: 'firstNode',
      children: [
        {
          path: '/firstNode/firstNodeChild',
          value: 'firstNodeChildValue',
          name: 'firstNodeChild',
          children: []
        }
      ]
    },
    {
      path: '/d1',
      value: 'value',
      name: 'd1',
      children: [
        {
          path: '/d1/d2',
          value: 'value',
          name: 'd2',
          children: [
            {
              path: '/d1/d2/d3',
              value: 'value',
              name: 'd3',
              children: [
                {
                  path: '/d1/d2/d3/d4',
                  value: 'value',
                  name: 'd4',
                  children: [
                    {
                      path: '/d1/d2/d3/d4/d5',
                      value: 'value',
                      name: 'd5',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/c1',
      value: 'value',
      name: 'c1',
      children: [
        {
          path: '/c1/c2',
          value: 'value',
          name: 'c2',
          children: [
            {
              path: '/c1/c2/c3',
              value: 'value',
              name: 'c3',
              children: [
                {
                  path: '/c1/c2/c3/c4',
                  value: 'value',
                  name: 'c4',
                  children: [
                    {
                      path: '/c1/c2/c3/c4/c5',
                      value: 'value',
                      name: 'c5',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/b1',
      value: 'value',
      name: 'b1',
      children: [
        {
          path: '/b1/b2',
          value: 'value',
          name: 'b2',

          children: [
            {
              path: '/b1/b2/b3',
              value: 'value',
              name: 'b3',
              children: [
                {
                  path: '/b1/b2/b3/b4',
                  value: 'value',
                  name: 'b4',
                  children: [
                    {
                      path: '/b1/b2/b3/b4/b5',
                      value: 'value',
                      name: 'b5',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const SETTINGS_NAME = 'options';
