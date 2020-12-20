import {ZkNodeModel} from '../domains/zk-node.model';

export const ZKNODES_EXPML: ZkNodeModel = {
  "path": "/",
  "value": "",
  "name": "/",
  "father": null,
  "children": [
    {
      "path": "/a1",
      "value": "value",
      "name": "a1",
      "father": null,
      "children": [
        {
          "path": "/a1/a2",
          "value": "value",
          "name": "a2",
          "father": null,
          "children": [
            {
              "path": "/a1/a2/a3",
              "value": "value",
              "name": "a3",
              "father": null,
              "children": [
                {
                  "path": "/a1/a2/a3/a4",
                  "value": "value",
                  "name": "a4",
                  "father": null,
                  "children": [
                    {
                      "path": "/a1/a2/a3/a4/a5",
                      "value": "value",
                      "name": "a5",
                      "father": null,
                      "children": []
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
      "path": "/zookeeper",
      "value": "",
      "name": "zookeeper",
      "father": null,
      "children": [
        {
          "path": "/zookeeper/config",
          "value": "",
          "name": "config",
          "father": null,
          "children": []
        },
        {
          "path": "/zookeeper/quota",
          "value": "",
          "name": "quota",
          "father": null,
          "children": []
        }
      ]
    },
    {
      "path": "/l1",
      "value": "value",
      "name": "l1",
      "father": null,
      "children": [
        {
          "path": "/l1/exp1",
          "value": "value",
          "name": "exp1",
          "father": null,
          "children": []
        },
        {
          "path": "/l1/l2",
          "value": "value",
          "name": "l2",
          "father": null,
          "children": [
            {
              "path": "/l1/l2/l3",
              "value": null,
              "name": "l3",
              "father": null,
              "children": [
                {
                  "path": "/l1/l2/l3/l4",
                  "value": null,
                  "name": "l4",
                  "father": null,
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "path": "/firstNode",
      "value": "firstValue",
      "name": "firstNode",
      "father": null,
      "children": [
        {
          "path": "/firstNode/firstNodeChild",
          "value": "firstNodeChildValue",
          "name": "firstNodeChild",
          "father": null,
          "children": []
        }
      ]
    },
    {
      "path": "/d1",
      "value": "value",
      "name": "d1",
      "father": null,
      "children": [
        {
          "path": "/d1/d2",
          "value": "value",
          "name": "d2",
          "father": null,
          "children": [
            {
              "path": "/d1/d2/d3",
              "value": "value",
              "name": "d3",
              "father": null,
              "children": [
                {
                  "path": "/d1/d2/d3/d4",
                  "value": "value",
                  "name": "d4",
                  "father": null,
                  "children": [
                    {
                      "path": "/d1/d2/d3/d4/d5",
                      "value": "value",
                      "name": "d5",
                      "father": null,
                      "children": []
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
      "path": "/c1",
      "value": "value",
      "name": "c1",
      "father": null,
      "children": [
        {
          "path": "/c1/c2",
          "value": "value",
          "name": "c2",
          "father": null,
          "children": [
            {
              "path": "/c1/c2/c3",
              "value": "value",
              "name": "c3",
              "father": null,
              "children": [
                {
                  "path": "/c1/c2/c3/c4",
                  "value": "value",
                  "name": "c4",
                  "father": null,
                  "children": [
                    {
                      "path": "/c1/c2/c3/c4/c5",
                      "value": "value",
                      "name": "c5",
                      "father": null,
                      "children": []
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
      "path": "/b1",
      "value": "value",
      "name": "b1",
      "father": null,
      "children": [
        {
          "path": "/b1/b2",
          "value": "value",
          "name": "b2",
          "father": null,
          "children": [
            {
              "path": "/b1/b2/b3",
              "value": "value",
              "name": "b3",
              "father": null,
              "children": [
                {
                  "path": "/b1/b2/b3/b4",
                  "value": "value",
                  "name": "b4",
                  "father": null,
                  "children": [
                    {
                      "path": "/b1/b2/b3/b4/b5",
                      "value": "value",
                      "name": "b5",
                      "father": null,
                      "children": []
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

export const SETTINGS_NAME = 'settings';
