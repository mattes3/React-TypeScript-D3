import * as d3 from 'd3';

export interface d3Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
}

export interface d3Link extends d3.SimulationLinkDatum<d3Node> {
    value: number;
}

export type d3Graph = {
    nodes: d3Node[],
    links: d3Link[]
};

export type d3Simulation = d3.Simulation<d3Node, d3Link>;
