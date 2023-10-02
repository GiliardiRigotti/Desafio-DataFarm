import { IFarm, IField, IMachinery, IReason } from "./resources"

export interface IRegistry {
    uuid: string | null
    note: string | null
    idFarm: number | null
    idField: number | null
    idReason: number | null
    idMachinery: number | null
    minutes: number | null
    longitude: number | null
    latitude: number | null
    sync?: number | null
    created?: number | null
}

export interface IRegistryItem {
    uuid: string | null
    farm: IFarm
    field: IField
    machinerie: IMachinery
    reason: IReason
    note: string | null
    minutes: number | null
    created?: number | null
}