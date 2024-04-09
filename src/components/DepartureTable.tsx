import { Departure } from '../utils/types'
import { DepartureTableBody } from './DepartureTableBody'

export const DepartureTable = ({ data }: Departure) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Linje</th>
                    <th>Navn</th>
                    <th>Ankommer</th>
                    <th>Forsinket (m)</th>
                </tr>
            </thead>
            {data && <DepartureTableBody estimatedCalls={data.stopPlace.estimatedCalls} />}
        </table>
    )
}