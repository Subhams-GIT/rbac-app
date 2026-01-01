type ErrorName='SIGNUP_ERROR' | 'FETCH_ERROR' | 'SIGNIN_ERROR' | 'SESSION_ERROR'
interface ErrorProps{
    name:ErrorName,
    message:string,
    cause:string
}

export class UserError extends Error{
    constructor({name,message,cause}:ErrorProps){
        super(cause)
        this.name=name
        this.message=message
        this.cause=cause
    }    
}