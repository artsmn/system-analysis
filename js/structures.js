const maxEdgeDistance = 3; // max width between points

let __nodeId = 1;
const getNodeId = function () {
    return __nodeId++;
}

class Graph {
    nodes;
    path;

    constructor(addresses) {
        this.nodes = this.__buildGraph(addresses);
    }

    shortestPath () {
        if(this.path) {
            const array = this.findParent(this.getNodeById(this.path.pop()), []);
            return array;
        }
        throw Error('breadthFirstSearch should be called first');
    }

    getNodeById(id) {
        return this.nodes[this.nodes.findIndex(x => x.id === id)];
    }

    __buildGraph (addresses) {
        let nodes = addresses.map(function (address) {
            return new Node(getNodeId(), address);
        });

        let tempNodes = [...nodes];

        nodes.map(function (node) {

            tempNodes.map(function (childNode) {
                const distance = getDistance(node.address, childNode.address);
                if(node.id !== childNode.id && distance <= maxEdgeDistance) {
                    node.children.push(childNode.id);
                    nodes[nodes.findIndex(x => x.id === childNode.id)].parent = node.id;
                }
            })

            if(!node.parent && node.id !== nodes[0].id) {
                let nearest = { distance: null, node: null };
                nodes.map(mapNode => {
                    const distance = getDistance(node.address, mapNode.address);
                    if ((!nearest.distance || nearest.distance > distance) && node.id !== mapNode.id) {
                        nearest.distance = distance;
                        nearest.node = mapNode;
                    }
                })
                node.parent = nearest.node.id;
                nodes[nodes.findIndex(x => x.id === nearest.node.id)].children.push(node.id);
            }

            tempNodes = tempNodes.filter((el) => !([node.id, ...node.children].includes(el.id)));
        })
        return nodes;
        }

    breadthFirstSearch () {
        let queue = [];
        let path = [];

        queue.push(this.nodes[0]);

        while (queue.length > 0) {

            let currentNode = queue[0];
            path.push(currentNode.id);

            if (currentNode.id === this.nodes[1].id) {
                this.path = path;
                return path
            }

            if (currentNode.children) {
                queue.push(...this.nodes.filter(node => currentNode.children.includes(node.id)));
            }
            queue.shift();
        }
        return null;
    }

    findParent(node, path) {
        path.push(node);
        if(node.id === this.nodes[0].id) {
            return path;
        } else {
            return this.findParent(this.getNodeById(node.parent), path);
        }
    }
}

class Node {
    id;
    address;
    children;
    parent;

    constructor(id, address) {
        this.id = id;
        this.address = address;
        this.children = [];
    }
}

class Address {
    title;
    lat;
    lng;

    constructor(object) {
        this.title = object.title;
        this.lat = object.lat;
        this.lng = object.lng
    }
}


