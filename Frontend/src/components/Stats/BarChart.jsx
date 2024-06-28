import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
    return <>
        {/* since our data contains 2 data keys (date and count) date goes into X-axis and count goes into Bar */ }
        <ResponsiveContainer width="100%" height={ 500 } >
            <BarChart
                data={ data }
                width={ 500 }
                height={ 300 }
                margin={ { top: 50 } }
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={ false } />
                <Tooltip />
                <Bar dataKey='count' fill='#2cb1bc' barSize={ 75 } />
            </BarChart>
        </ResponsiveContainer>
    </>
}
export default BarChartComponent