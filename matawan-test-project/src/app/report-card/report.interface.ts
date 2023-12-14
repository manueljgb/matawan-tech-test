import { ObservationInterface } from "./observation.interface"

export interface ReportInterface {
    id?: number,
    author: {
        first_name: string,
        last_name: string,
        birth_date: string,
        sex: string,
        email: string
    },
    description: string,
    observations: number[]
}

