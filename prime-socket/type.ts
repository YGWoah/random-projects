export interface UserMessage {
    id: string,
    createdAt: Date
}


export interface ResultMessage {

    id: string,
    result: {
        a: [number, boolean],
        b: [number, boolean],
        c: [number, boolean],

    }
}