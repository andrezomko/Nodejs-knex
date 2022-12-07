class AppError{
    message
    statusCode

    constructor(message,statusCode=400){ //carregado autmoaticamentoe qd a classe é isntanciada. Toda vez q a classe for utlziada quero o msg e o status code (caso n0a ifnorado, padrao nesse caso 400)
        this.message = message
        this.statusCode = statusCode
    }
}

module.exports = AppError