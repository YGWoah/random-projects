const log = console.log

function func<T>(one: T) {
    return 34 as T;
}

type callback = () => number

const a = func<number>(4)

console.log(a)


const execute = (callback: callback) => {
    console.log("executing callback", callback.name)
    callback()
    log("executing")
}

execute(() => { return 1 + 3 })

enum Hello {
    salam,
    hi,
    bunjour
}

type Hello1 = "salam" | "hi"


const getHello = (): Hello1 => {
    if (Math.random())
        return "hi"
    else return "salam"
}


const print = <T>(data: T) => {
    if (typeof data == "string") {
        log("this is a string")
    }
    else log("this is not a string")
}



print("hh")


const printAny = (data: any) => {
    if (typeof data == "string") {
        log("this is a string")
    }
    else log("this is not a string")

}


printAny("hh")