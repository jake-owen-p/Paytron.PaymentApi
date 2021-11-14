export const Logger = {
    log: (message: string, params?: object) => {
        console.log({
            message,
            date: new Date(),
            ...params
        })
    },
    error: (error: Error, params?: object) => {
        console.log({
            message: error.message,
            stackTrace: error.stack,
            date: new Date(),
            ...params
        })
    }
}
