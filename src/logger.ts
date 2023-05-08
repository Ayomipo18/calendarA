import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat,
        colorize({ all : true })
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
        new transports.Console({
            format: combine(logFormat, colorize({ all : true })),
        }),
    ]
})

export default logger;