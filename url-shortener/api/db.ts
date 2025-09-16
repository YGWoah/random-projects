
let db = new Map<string, string>();

export const getKey = (key: string): string | undefined => {
    return db.get(key);
};

export const saveKey = (key: string, url: string): void => {
    db.set(key, url);
};