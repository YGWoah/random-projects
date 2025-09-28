import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500
    const payload: any = {
        error: {
            message: err.message || 'Internal Server Error',
            status,
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack)
        payload.error.stack = err.stack
    } else {
        // log minimal info in production
        console.error(err.message)
    }

    res.status(status).json(payload)
};


export default errorHandler