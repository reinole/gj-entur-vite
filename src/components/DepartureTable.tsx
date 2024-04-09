import { Departure, Call } from '../utils/types'

export const DepartureTable = ({ data }: Departure) => {
    if (!data) {
        return <div>No data</div>
    }

    const calulatedTimeDifference = (expected: string, actual: string) => {
        const expectedTime = new Date(expected)
        const actualTime = new Date(actual)

        const difference = expectedTime.getTime() - actualTime.getTime()

        return Math.round(difference / 1000 / 60)
    }

    return (
        <div>
            {data.stopPlace.estimatedCalls.map((call: Call, i: number) => {
                const { publicCode, name } = call.serviceJourney.journeyPattern.line
                const hours = new Date(call.aimedArrivalTime).getHours()
                const minutes = new Date(call.aimedArrivalTime).getMinutes()

                return (
                    <div key={call.serviceJourney.journeyPattern.line.id + i} style={{ display: "flex", justifyContent: "space-between", width: "45rem" }}>
                        <span>{publicCode}</span>
                        <span>{name}</span>
                        <span>{hours}:{minutes}</span>
                        <span>Forsinket med:{calulatedTimeDifference(call.expectedArrivalTime, call.aimedArrivalTime)} minutter</span>
                    </div>
                )
            })}
        </div>
    )

}