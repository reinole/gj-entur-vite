export interface Call {
    aimedArrivalTime: string;
    expectedArrivalTime: string;
    serviceJourney: {
        journeyPattern: {
            line: {
                id: string;
                name: string;
                publicCode: string;
            }
        }
    }
}

export interface StopPlace {
    estimatedCalls: Call[];
    id: string;
    name: string;
}

export interface Data {
    stopPlace: StopPlace;
    time: string;
    track: string;
}


export interface Departure {
    data: Data | null
}