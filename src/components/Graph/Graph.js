import React, { PureComponent } from 'react'
import cytoscape from 'cytoscape'
import { Button } from 'antd'
import { setTimeout } from 'timers'
export default class Graph extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            id: [],
            elements: {},
        }
    }
    componentDidMount() {
        this.set(this.props.elements)
    }
    set(element = this.state.elements) {
        let elements = { ...element }
        let that = this
        if (elements && elements.edges) {
            elements.edges = elements.edges.filter(function(item) {
                for (let i in that.state.id) {
                    if (
                        that.state.id[i] == item.data.source ||
                        that.state.id[i] == item.data.target
                    ) {
                        return item
                    }
                }
            })
        }
        if (elements && elements.nodes) {
            elements.nodes = elements.nodes.filter(function(item) {
                let edges = elements.edges
                let b = false
                for (let i in edges) {
                    if (
                        edges[i].data.source == item.data.id ||
                        edges[i].data.target == item.data.id
                    ) {
                        b = true
                    }
                }
                if (b) {
                    return item
                }
            })
        }
        if (elements.nodes && elements.edges) {
            this.show(elements)
        }
    }
    show(elements) {
        let indexId = this.state.id[this.state.id.length - 1]
        let that = this
        const { nodes, edges } = elements
        let Obj = {
            container: this.refs.root, // container to render in
            elements: {
                nodes: nodes,
                edges: edges,
            },
            zoom: 1,
            minZoom: 0.1,
            maxZoom: 10,
            zoomingEnabled: true,
            boxSelectionEnabled: true,
            hideEdgesOnViewport: true,
            hideLabelsOnViewport: true,
            // textureOnViewport: true,
            motionBlur: true,
            motionBlurOpacity: 0.1,
            wheelSensitivity: 0.1,
            style: [
                {
                    // the stylesheet for the graph
                    selector: 'node',
                    style: {
                        'background-color': '#1798f2',
                        label: 'data(properties.name)',
                        // 'background-image': 'data(image)',
                        'background-fit': 'cover cover',
                        'background-image-opacity': 0.5,
                        width: '8px',
                        height: '8px',

                        color: '#999',
                        'text-opacity': 1,
                        'font-weight': 400,
                        'font-size': 4,
                    },
                },
                {
                    // the stylesheet for the graph
                    selector: 'node:selected',
                    style: {
                        'border-color': '#ECA87F',
                        'border-width': '4',
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 1,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                    },
                },
                {
                    // the stylesheet for the graph
                    selector: "node[id = '" + indexId + "']",
                    style: {
                        'background-color': '#abcdef',
                    },
                },
                {
                    selector: 'edge[source = "' + indexId + '"]',
                    style: {
                        width: 1,
                        'line-color': '#f00',
                        'target-arrow-color': '#fcc',
                        'target-arrow-shape': 'triangle',
                    },
                },
                {
                    selector: 'edge[target = "' + indexId + '"]',
                    style: {
                        width: 1,
                        'line-color': '#f00',
                        'target-arrow-color': '#fcc',
                        'target-arrow-shape': 'triangle',
                    },
                },
            ],
            layout: {
                name: 'cose', //cose  circle
            },
            pan: { x: 0, y: 0 },
        }
        // Obj.style.push(itemStyle)
        // Obj.style.push(itemStyleLine)
        // Obj.style.push(itemStyleLine2)

        this.cy = cytoscape(Obj)
        this.cy.on('tap', function(evt) {
            if (evt.target[0]) {
                let id = evt.target.id()
                let ids = that.state.id
                ids.push(id)
                that.setState({
                    id: ids,
                })
                setTimeout(() => {
                    that.set()
                }, 0)
            }
        })
        this.cy.on('vmousedown', function(evt) {
            if (evt.target[0]) {
                let id = evt.target.id()
            }
        })
    }
    componentWillReceiveProps(newProps) {
        if (newProps.company_Id) {
            let that = this
            this.setState({
                elements: newProps.elements,
                id: [newProps.company_Id],
            })
            setTimeout(() => {
                that.set(newProps.elements)
            }, 0)
        }
    }
    layout = () => {
        let layout = this.cy.layout({
            name: 'random',
        })
        layout.run()
    }
    render() {
        return (
            <div style={{ flex: 1, position: 'relative' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9,
                        padding: '10px',
                    }}
                >
                    <Button onClick={this.layout}>布局</Button>
                </div>
                <div ref="root" style={{ height: '100%' }} />
            </div>
        )
    }
}
