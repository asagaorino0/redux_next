import { MenuState } from "./menu"

export type UsersState = {
    name: string,
    uid: string,
    icon: string | undefined,
    // namae: string,
    // sei: string,
    // tokoro: string,
    // area: string,
    // chip: number,
    // grade: string,
    // sns: string,
    // qr: string,
    users: [],
    // userliff: []
    menu: { menu: MenuState },
    // gappi: string,
}