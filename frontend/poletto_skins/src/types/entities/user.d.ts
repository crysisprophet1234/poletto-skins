export type User = {
    id: UUID,
    email: string,
    balance: string,
    steamUser: SteamUser
}

type SteamUser = {
    steamId: string
    communityVisibilityState: number
    profileState: number
    personaName: string
    commentPermission: number
    profileUrl: string
    avatar: string
    avatarMedium: string
    avatarFull: string
    avatarHash: string
    lastLogOff: number
    personaState: number
    realName: string
    primaryClanId: string
    timeCreated: number
    personaStateFlags: number
    locCountryCode: string
    locStateCode: string
    locCityId: number
}