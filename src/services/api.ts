import axios from "axios"

const apiUrl = 'https://job.minhafazenda.ag'
const idPartner = 372

console.log('ULR: ', apiUrl)

const api = axios.create({
    baseURL: apiUrl
})

const endpoints = {
    auth: "/api/auth/v2",
    resources: "/mobile/machine/resources",
    registry: "/mobile/machine/stop-register/registry",
}

export { api, endpoints, idPartner }