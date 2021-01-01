import express from 'express'
import { Request } from 'express-serve-static-core'
declare module 'express-serve-static-core' {
    interface Request {
        tokenInfo?: {id: string, phone: string}
        data?: any
        count?:number | 0
        message?: any
        success?: boolean
    }
}