import '../styles/App.css';

import * as d3 from 'd3';
import * as React from 'react';

import { d3Graph, d3Link, d3Node, d3Simulation } from '../types';
import Labels from './labels';
import Links from './links';
import Nodes from './nodes';

interface AppProps {
    width: number;
    height: number;
    graph: d3Graph;
}

export default class App extends React.Component<AppProps> {
    private simulation: d3Simulation;

    constructor(props: AppProps) {
        super(props);
        this.simulation = d3.forceSimulation<d3Node>()
            .force("link", d3.forceLink().id(function (d: d3Node) {
                return d.id;
            }))
            .force("charge", d3.forceManyBody().strength(-100))
            .force("center", d3.forceCenter(this.props.width / 2, this.props.height / 2))
            .nodes(this.props.graph.nodes);

        const linkForce = this.simulation.force<d3.ForceLink<d3Node, d3Link>>("link");
        linkForce && linkForce.links(this.props.graph.links);
    }

    componentDidMount() {
        const node = d3.selectAll(".node");
        const link = d3.selectAll(".link");
        const label = d3.selectAll(".label");

        this.simulation.nodes(this.props.graph.nodes).on("tick", ticked);

        function ticked() {
            link
                .attr("x1", function (d: any) {
                    return d.source.x;
                })
                .attr("y1", function (d: any) {
                    return d.source.y;
                })
                .attr("x2", function (d: any) {
                    return d.target.x;
                })
                .attr("y2", function (d: any) {
                    return d.target.y;
                });

            node
                .attr("cx", function (d: any) {
                    return d.x;
                })
                .attr("cy", function (d: any) {
                    return d.y;
                });

            label
                .attr("x", function (d: any) {
                    return d.x + 5;
                })
                .attr("y", function (d: any) {
                    return d.y + 5;
                });
        }
    }

    render() {
        const { width, height, graph } = this.props;
        return (
            <svg className="container"
                width={width} height={height}>
                <Links links={graph.links} />
                <Nodes nodes={graph.nodes} simulation={this.simulation} />
                <Labels nodes={graph.nodes} />
            </svg>
        );
    }
}
