import './styles/index.css';

import * as React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import data from './miserables';

ReactDOM.render(
    <ContainerDimensions>
        {({ width, height }) =>
            <App
                width={width}
                height={height}
                graph={data}
            />
        }
    </ContainerDimensions>,
    document.getElementById('root')
);
