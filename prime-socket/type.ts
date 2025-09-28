export interface UserMessage {
    id: string,
    // client sends a numeric timestamp (Date.now())
    createdAt: number
}


export interface ResultMessage {

    id: string,
    result: {
        a: [number, boolean],
        b: [number, boolean],
        c: [number, boolean],

    }
}