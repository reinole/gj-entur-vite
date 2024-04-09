export const fetchData = async () => {
  const baseUrl = "https://api.entur.io/journey-planner/v3/graphql"
  const NSR = 4000
  const query = `
      {
        stopPlace(id: "NSR:StopPlace:${NSR}"){
          id
          name  
          estimatedCalls(timeRange: 72100, numberOfDepartures: 10) { 
            realtime
            aimedArrivalTime
            expectedArrivalTime
            serviceJourney {
              journeyPattern {
                line {
                  id
                  name
                  transportMode
                  publicCode
                }
              }
            }
          }
        }
      }
      `

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ET-Client-Name": "gj-my-travel-app"
    },
    body: JSON.stringify({ query })
  })

  const result = await response.json()

  return result.data
}
