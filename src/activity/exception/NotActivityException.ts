import {HttpException} from "@nestjs/common";

export class NotActivityException extends Error {

    constructor(message: string) {
        super(message);
    }
}