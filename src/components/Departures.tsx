import { useEffect, useState } from "react"

import { fetchData } from "../utils/getData"
import { DepartureTable } from "./DepartureTable"

export const Departures = () => {
  const [data, setData] = useState(null)
  const [isloading, setIsLoading] = useState(false)
  const [queue, setQueue] = useState<number[]>([])
  const [fetchCount, setFetchCount] = useState(1)

  useEffect(() => {
    setQueue([0])
  }, [])

  useEffect(() => {
    if (queue.length === 0 || isloading) {
      return
    }

    const fetchDataFromQueue = async () => {
      console.log('fetchDataFromQueue', queue)
      setIsLoading(true)
      queue.shift()

      try {
        setTimeout(async () => {
          const newData = await fetchData()

          setData(newData)
          setIsLoading(false)
          console.log('fetchDataFromQueue done')
        }, 3000);
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchDataFromQueue()

  }, [queue, isloading])

  const handleFetchData = () => {
    setFetchCount(currentValue => currentValue + 1)
    if (queue.length === 0) {
      setQueue([fetchCount])

      return;
    }

    if (queue.length <= 1) {
      const removeOne: number[] = queue.slice(0, -1)
      removeOne.push(fetchCount)
      setQueue(removeOne)

      return
    }
  }

  return (
    <div>
      <h1>Entur case</h1>
      <button onClick={handleFetchData}>Hent data</button>
      {isloading && <p>Henter data...</p>}
      <DepartureTable data={data} />
    </div>
  )

}