import { expect } from 'chai';
import * as d3 from 'd3';
import { shallow } from 'enzyme';
import * as React from 'react';

import Nodes from '../src/components/nodes';
import data from '../src/miserables';
import { d3Node, d3Link } from '../src/types';

describe("Nodes", () => {
    it("renders the nodes", () => {
        const simulation = d3.forceSimulation<d3Node, d3Link>()
            .nodes(data.nodes);
        const wrapper = shallow(<Nodes nodes={data.nodes} simulation={simulation} />);
        expect(wrapper.children().length).to.equal(data.nodes.length);
    });
});
