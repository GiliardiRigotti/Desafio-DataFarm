export interface IResources {
    machineries: IMachinery[]
    farms: IFarm[]
    reasons: IReason[]
}

export interface IMachinery {
    id: number
    name: string
    serialNumber?: string
    growerId: number
}

export interface IFarm {
    id: number
    name: string
    growerId: number
    growerName: string
    fields: IField[]
}

export interface IField {
    id: number
    name: string
}

export interface IReason {
    id: number
    name: string
    icon: string
}
