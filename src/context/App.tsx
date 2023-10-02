import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { api, endpoints, idPartner } from "../services/api"
import { IUser } from "../interfaces/user"
import { IResources } from "../interfaces/resources"
import { IPartner } from "../interfaces/partner"
import { IRegistry } from "../interfaces/registry"

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
}

const AppContext = createContext<IAppContext>(
    {} as IAppContext
)

const AppProvider: React.FC<T> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<string>()
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
                setAuthToken(data.data.token)
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
                setUser(data.data.user)
                setResources(data.data.resources)
            })
            .catch((error) => console.log(error.response.data))
    }, [signIn])

    const addRegistry = useCallback((newRegistry: IRegistry) => {
        setRegistry(prev => [...prev, newRegistry])
    }, [])

    async function signOut(): Promise<void> {
        setAuthToken(undefined)
    }

    useEffect(() => {

    }, [])

    return (
        <AppContext.Provider value={{ isLoading, user, partner, resources, registry, signIn, signOut, addRegistry }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider }

export function useApp() {
    const context = useContext(AppContext)
    return context
}