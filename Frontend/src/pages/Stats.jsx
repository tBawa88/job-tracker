import { useQuery } from "@tanstack/react-query"
import { queryClient } from '../utils/customFetch'
import { ChartsContainer, StatsContainer } from "../components"
import { fetchJobStats } from "../utils/httpHelpers"
import { toast } from "react-toastify"

const StatsPage = () => {
    const { data, error } = useQuery({
        queryKey: ['user', 'stats'],
        queryFn: fetchJobStats,
        staleTime: 2000,
        onError: (data) => {
            const message = data.message || 'Error loading the stats for user'
            toast.error(message);
        }
    })
    const monthlyJobStats = data?.monthlyJobStats || []
    const totalJobStats = data?.totalJobStats || {}

    return <>
        <StatsContainer totalJobStats={ totalJobStats } />

        {
            monthlyJobStats.length > 0 && (
                <ChartsContainer data={ monthlyJobStats } />
            )
        }
    </>
}
export default StatsPage