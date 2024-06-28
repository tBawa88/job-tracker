import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ totalJobStats }) => {
    const stats = [
        {
            title: 'pending applications',
            count: totalJobStats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#f59e0b',
            bcg: '#fef3c7',
        },
        {
            title: 'interviews scheduled',
            count: totalJobStats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: 'jobs declined',
            count: totalJobStats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ];
    return (
        <Wrapper>
            {
                stats.map((stat) => (
                    <StatItem key={ stat.title } { ...stat } />
                ))
            }
        </Wrapper>
    )
}
export default StatsContainer