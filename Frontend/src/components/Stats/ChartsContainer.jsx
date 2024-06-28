
import { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../../assets/wrappers/ChartsContainer';
const ChartsContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(true);
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <div className='chart-toggle'>
                <button type='button' onClick={ () => setBarChart(!barChart) }>
                    { barChart ? 'Area Chart' : 'Bar Chart' }
                </button>
            </div>
            { barChart ? <BarChart data={ data } /> : <AreaChart data={ data } /> }
        </Wrapper>
    );
}
export default ChartsContainer
