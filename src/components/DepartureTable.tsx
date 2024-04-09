import { Departure, Call } from '../utils/types'

export const DepartureTable = ({ data }: Departure) => {
    const calulatedTimeDifference = (expected: string, actual: string) => {
        const expectedTime = new Date(expected)
        const actualTime = new Date(actual)

        const difference = expectedTime.getTime() - actualTime.getTime()

        return Math.round(difference / 1000 / 60) > 0 ? Math.round(difference / 1000 / 60) : null
    }

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
            <tbody>
                {data && data.stopPlace.estimatedCalls.map((call: Call, i: number) => {
                    const { publicCode, name } = call.serviceJourney.journeyPattern.line
                    const hours = new Date(call.expectedArrivalTime).getHours()
                    const hoursTwoDigits = hours < 10 ? `0${hours}` : hours
                    const minutes = new Date(call.expectedArrivalTime).getMinutes()
                    const minutesTwoDigits = minutes < 10 ? `0${minutes}` : minutes
                    const minutesLate = calulatedTimeDifference(call.expectedArrivalTime, call.aimedArrivalTime)

                    return (
                        <tr key={call.serviceJourney.journeyPattern.line.id + i}>
                            <td>{publicCode}</td>
                            <td>{name}</td>
                            <td>{hoursTwoDigits}:{minutesTwoDigits}</td>
                            <td>{minutesLate}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}