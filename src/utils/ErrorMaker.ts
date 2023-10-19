export class ErrorMaker{
    makeError(message: string, status: number){
        return {
            error: true,
            message,
            status
        }
    }
}