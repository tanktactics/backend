import dayjs from "@/utils/dayjs";
import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const error = exception.name

        switch (exception.code) {
            case 'P2025':
                response.status(HttpStatus.NOT_FOUND).json({
                    timestamp: dayjs().format(),
                    code: response.statusCode,
                    message: "the resource doesn't exists",
                    error,
                })
            break;
            case 'P2002':
                response.status(HttpStatus.CONFLICT).json({
                    timestamp: dayjs().format(),
                    code: response.statusCode,
                    message: 'the resource already exists',
                    error,
                })
            break;
        }
    } 
}