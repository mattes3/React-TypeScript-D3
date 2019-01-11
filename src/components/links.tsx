import * as d3 from 'd3';
import * as React from 'react';

import { d3Link } from '../types';

interface LinkProps {
    link: d3Link;
}

class Link extends React.Component<LinkProps> {
    ref: React.RefObject<SVGLineElement>;

    constructor(props: LinkProps) {
        super(props);
        this.ref = React.createRef<SVGLineElement>();
    }

    componentDidMount() {
        d3.select(this.ref.current).data([this.props.link]);
    }

    render() {
        return <line className="link" ref={this.ref}
            strokeWidth={Math.sqrt(this.props.link.value)} />;
    }
}

export default class Links extends React.Component<{ links: d3Link[] }> {
    render() {
        const links = this.props.links.map((link: d3Link, index: number) => {
            return <Link key={index} link={link} />;
        });

        return (
            <g className="links">
                {links}
            </g>
        );
    }
}
