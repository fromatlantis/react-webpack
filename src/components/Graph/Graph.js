import React, { PureComponent } from 'react'
import cytoscape from 'cytoscape'
import { Button } from 'antd'
export default class Graph extends PureComponent {
    componentWillReceiveProps(newProps) {
        const { nodes, edges } = newProps.elements
        this.cy = cytoscape({
            container: this.refs.root, // container to render in
            elements: {
                nodes: nodes,
                edges: edges,
            },
            zoom: 1,
            minZoom: 0.1,
            maxZoom: 2,
            zoomingEnabled: true,
            boxSelectionEnabled: true,
            hideEdgesOnViewport: true,
            hideLabelsOnViewport: true,
            //textureOnViewport: true,
            motionBlur: true,
            motionBlurOpacity: 0.1,
            wheelSensitivity: 0.1,
            style: [
                {
                    // the stylesheet for the graph
                    selector: 'node',
                    style: {
                        'background-color': '#1798f2',
                        // 'label': 'data(properties.name)',
                        // 'background-image': 'data(image)',
                        'background-fit': 'cover cover',
                        'background-image-opacity': 0.5,
                        width: '5px',
                        height: '5px',
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
            ],
            layout: {
                name: 'circle',
            },
            pan: { x: 0, y: 0 },
        })
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
