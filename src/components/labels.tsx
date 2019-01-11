import * as d3 from 'd3';
import * as React from 'react';

import { d3Node } from '../types';

class Label extends React.Component<{ node: d3Node }, {}> {
    ref: SVGTextElement;

    componentDidMount() {
        d3.select(this.ref).data([this.props.node]);
    }

    render() {
        return <text className="label" ref={(ref: SVGTextElement) => this.ref = ref}>
            {this.props.node.id}
        </text>;
    }
}

export default class Labels extends React.Component<{ nodes: d3Node[] }, {}> {
    render() {
        const labels = this.props.nodes.map((node: d3Node, index: number) => {
            return <Label key={index} node={node} />;
        });

        return (
            <g className="labels">
                {labels}
            </g>
        );
    }
}
