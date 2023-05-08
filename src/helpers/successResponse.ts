import { Response } from 'express';

// export class SuccessResponse {
//     public res: Response;
//     public status: number;
//     public message: string;
//     public data: any;

//     constructor(res: Response, status: number, message: string, data: any) {
//         this.res = res
//         this.status = status;
//         this.message = message;
//         this.data = data;
//     }

//     public send = () => this.res.status(this.status).json({
//         message: this.message,
//         data: this.data
//     })
// }

const successResponse = (res: Response, status: number, message: string, data: any) => res.status(status).json({
    message,
    data
})

export default successResponse;