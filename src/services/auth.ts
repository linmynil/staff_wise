import { baseAPI } from "./baseAPI";

export const authServive = baseAPI.injectEndpoints({
    endpoints: buider => ({
        login: buider.mutation({
            query: data => ({
                endpoint: '/auth/login',
                method: 'POST',
                data: data
            })
        })
    })
})

export const {useLoginMutation} = authServive