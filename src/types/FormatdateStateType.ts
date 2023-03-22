import { Timestamp } from "firebase/firestore"

export type FormatDateStateType = {
    formatDate: string
    nextDate: string
    value: boolean
    yoyakuMenu: string
    menu: string
    editMode: boolean
    template: boolean
    next: boolean
    formatMonth: Date
    bDate: Date
    start: string,
    end: string,
    updatedAt: Date
}