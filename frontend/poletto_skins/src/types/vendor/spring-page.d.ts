export type SpringPage<T> = {
    totalElements: number
    totalPages: number
    size: number
    content: T[]
    number: number
    first: boolean
    last: boolean
    numberOfElements: number
    empty: boolean
}

export type Sort = {
    sort: string
    orderBy: string
}