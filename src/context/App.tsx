import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import NetInfo from '@react-native-community/netinfo';
import { api, endpoints, idPartner } from "../services/api"
import { IUser } from "../interfaces/user"
import { IFarm, IField, IResources } from "../interfaces/resources"
import { IPartner } from "../interfaces/partner"
import { IRegistry } from "../interfaces/registry"
import { Alert } from "react-native";
import { createTable, deleteAll, insert, select, update } from "../db/useDB";
import { modelRegistry } from "../db/models/modelRegistry";
import { modelFarm } from "../db/models/modelFarm";
import { modelField } from "../db/models/modelField";
import { modelMachinery } from "../db/models/modelMachinery";
import { modelReason } from "../db/models/modelReason";
import { modelUser } from "../db/models/modelUser";

interface T extends React.Component {
    children: React.JSX.Element
}

interface IResponseAuth {
    data: {
        token: string
    }
}

interface IResponseGetData {
    data: {
        user: IUser
        resources: IResources
    }
}

interface IAppContext {
    isLoading: boolean
    user?: IUser
    partner?: IPartner
    resources?: IResources
    registry?: IRegistry[]
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    addRegistry: (newRegistry: IRegistry) => void
    sync: () => void
}

const AppContext = createContext<IAppContext>(
    {} as IAppContext
)

const tablesDB = {
    user: 'user',
    farm: 'farm',
    field: 'field',
    reason: 'reason',
    machinary: 'machinary',
    registry: 'registry',
}

const AppProvider: React.FC<T> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<IUser>()
    const [partner, setPartner] = useState<IPartner>()
    const [resources, setResources] = useState<IResources>()
    const [registry, setRegistry] = useState<IRegistry[]>([])

    async function signIn(email: string, password: string): Promise<void> {
        if (!email || !password) new Error('Verificar os campos email e/ou senha se foram digitados')
        setIsLoading(true)
        api.post<IResponseAuth>(endpoints.auth,
            {
                email: email,
                senha: password,
                idPartner: idPartner
            })
            .then(({ data }) => {
                api.defaults.headers.common.TokenAuthorization = data.data.token
                getData()
            })
            .catch((error) => {
                console.log('Error: ', JSON.stringify(error))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const getData = useCallback(() => {
        api.get<IResponseGetData>(endpoints.resources)
            .then(({ data }) => {
                deleteAll(tablesDB.farm)
                deleteAll(tablesDB.field)
                deleteAll(tablesDB.machinary)
                deleteAll(tablesDB.reason)
                deleteAll(tablesDB.user)
                setUser(data.data.user)
                setResources(data.data.resources)
                insertDataInDatabase(data.data.resources)
                insert(tablesDB.user, [
                    { name: 'id', value: data.data.user.id },
                    { name: 'name', value: data.data.user.name },
                    { name: 'email', value: data.data.user.email },
                    { name: 'accessToken', value: data.data.user.accessToken },
                ])
                    .then(() => { console.log('Registrado User no BD') })
                    .catch(() => { console.log('Erro no BD') })
            })
            .catch((error) => console.log(error.response.data))
    }, [signIn])

    const insertDataInDatabase = useCallback(async (data: IResources) => {

        const farmData = data.farms
        const machineryData = data.machineries
        const reasonData = data.reasons
        console.log(reasonData)

        machineryData.forEach(async (machinery) => {
            await insert(tablesDB.machinary, [
                { name: 'id', value: machinery.id },
                { name: 'name', value: machinery.name },
                { name: 'serialNumber', value: machinery.serialNumber || 0 },
            ])
        })

        reasonData.forEach(async (reason) => {
            await insert(tablesDB.reason, [
                { name: 'id', value: reason.id },
                { name: 'name', value: reason.name },
                { name: 'icon', value: reason.icon },
            ])
        })

        farmData.forEach(async (farm) => {
            await insert(tablesDB.farm, [
                { name: 'id', value: farm.id },
                { name: 'name', value: farm.name },
            ])
            farm.fields?.forEach(async (field) => {
                await insert(tablesDB.field, [
                    { name: 'id', value: field.id },
                    { name: 'name', value: field.name },
                    { name: 'idFarm', value: farm.id },
                ])
            })
        })

    }, [])

    const addRegistry = useCallback((newRegistry: IRegistry) => {
        const date = new Date().getTime()
        console.log('Data', date)
        Location.getCurrentPositionAsync({})
            .then((location) => {
                const data: IRegistry = {
                    ...newRegistry, latitude: location.coords.latitude, longitude: location.coords.longitude, uuid: Crypto.randomUUID(), created: date, sync: 0
                }
                setRegistry(prev => [...prev, data])
                insert(tablesDB.registry, [
                    { name: 'uuid', value: data.uuid },
                    { name: 'note', value: data.note },
                    { name: 'idFarm', value: data.idFarm },
                    { name: 'idField', value: data.idField },
                    { name: 'idMachinery', value: data.idMachinery },
                    { name: 'idReason', value: data.idReason },
                    { name: 'minutes', value: data.minutes },
                    { name: 'longitude', value: data.longitude },
                    { name: 'latitude', value: data.latitude },
                    { name: 'created', value: data.created || 0 },
                    { name: 'sync', value: 0 }
                ])
                    .then(() => { console.log('Registrado no BD') })
                    .catch(() => { console.log('Erro no BD') })
                NetInfo.fetch().then(async (state) => {
                    if (state.isConnected) {
                        sync()
                    }
                });
            })
            .catch((error) => {
                Alert.alert('Aviso', error || 'Erro de obter a localização, verique se seu GPS esteja ligado')
            })
    }, [])

    async function signOut(): Promise<void> {
        setUser(undefined)
        deleteAll(tablesDB.farm)
        deleteAll(tablesDB.field)
        deleteAll(tablesDB.machinary)
        deleteAll(tablesDB.reason)
        deleteAll(tablesDB.user)
    }

    const sync = useCallback(async () => {
        try {
            let status = ''
            const registryNoSync = registry.filter((registry) => parseInt(registry.sync) == 0)
            console.log(registryNoSync)
            registryNoSync.forEach(async (registry) => {
                const data: IRegistry = {
                    uuid: registry.uuid,
                    idFarm: registry.idFarm,
                    idField: registry.idField,
                    idMachinery: registry.idMachinery,
                    idReason: registry.idReason,
                    latitude: registry.latitude,
                    longitude: registry.longitude,
                    minutes: registry.minutes,
                    note: registry.note,
                }
                const response = await api.post(endpoints.registry, data)
                console.log(response.data.data.status)
                await update(tablesDB.registry, [
                    { name: "sync", value: 1 }
                ], registry.uuid)
            })
            const registryDB = await select(tablesDB.registry)
            const registryValues = registryDB[0].rows ? registryDB[0].rows : []
            console.log(registryValues)
            setRegistry(registryValues)


        } catch (error) {

        }

    }, [])

    async function createTables() {
        await createTable(tablesDB.registry, modelRegistry)
        await createTable(tablesDB.farm, modelFarm)
        await createTable(tablesDB.field, modelField)
        await createTable(tablesDB.machinary, modelMachinery)
        await createTable(tablesDB.reason, modelReason)
        await createTable(tablesDB.user, modelUser)
    }

    async function restoreDB() {
        const registryDB = await select(tablesDB.registry)
        const registryValues = registryDB[0].rows ? registryDB[0].rows : []
        setRegistry(registryValues)

        const farmDB = await select(tablesDB.farm)
        const farmValues: IFarm[] = farmDB[0].rows ? farmDB[0].rows : []

        const fieldDB = await select(tablesDB.field)
        const fieldValues: IField[] = fieldDB[0].rows ? fieldDB[0].rows : []

        const listFarm: IFarm[] = []
        farmValues.forEach((itemFarm) => {
            const listFields = fieldValues.filter((itemField) => itemField.idFarm == itemFarm.id)
            listFarm.push({
                fields: listFields,
                ...itemFarm
            })
        })

        const machineryDB = await select(tablesDB.machinary)
        const machineryValues = machineryDB[0].rows ? machineryDB[0].rows : []

        const reasonDB = await select(tablesDB.reason)
        const reasonValues = reasonDB[0].rows ? reasonDB[0].rows : []

        const resourcesDB: IResources = {
            farms: listFarm,
            machineries: machineryValues,
            reasons: reasonValues
        }
        setResources(resourcesDB)

    }

    async function restoreSession() {
        const userDB = await select(tablesDB.user)
        const userValues: IUser[] = userDB[0].rows ? userDB[0].rows : null
        api.defaults.headers.common.TokenAuthorization = userValues[0].accessToken
        setUser(userValues[0])
    }

    useEffect(() => {
        setIsLoading(true)
        createTables()
        restoreDB()
        restoreSession()
        setIsLoading(false)
    }, [])

    return (
        <AppContext.Provider value={{ isLoading, user, partner, resources, registry, signIn, signOut, addRegistry, sync }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }

export function useApp() {
    const context = useContext(AppContext)
    return context
}