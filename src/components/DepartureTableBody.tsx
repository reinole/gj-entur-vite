import { Call } from "../utils/types";

interface DepartureTableBodyProps {
    estimatedCalls: Call[]
}

export const DepartureTableBody = ({ estimatedCalls }: DepartureTableBodyProps) => {
    const calulatedTimeDifference = (expected: string, actual: string) => {
        const expectedTime = new Date(expected)
        const actualTime = new Date(actual)

        const difference = expectedTime.getTime() - actualTime.getTime()

        return Math.round(difference / 1000 / 60) > 0 ? Math.round(difference / 1000 / 60) : null
    }

    return (
        <tbody>
            {estimatedCalls && estimatedCalls.map((call: Call, i: number) => {
                const { publicCode, name, id } = call?.serviceJourney?.journeyPattern?.line
                const expectedArrival = call.expectedArrivalTime

                const hours = new Date(expectedArrival).getHours()
                const hoursTwoDigits = hours.toString().padStart(2, "0")

                const minutes = new Date(expectedArrival).getMinutes()
                const minutesTwoDigits = minutes.toString().padStart(2, "0")

                const minutesLate = calulatedTimeDifference(expectedArrival, call.aimedArrivalTime)

                return (
                    <tr key={id + i}>
                        <td>{publicCode}</td>
                        <td>{name}</td>
                        <td>{hoursTwoDigits}:{minutesTwoDigits}</td>
                        <td>{minutesLate}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}; 