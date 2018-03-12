module.exports = validate

function validate(model) {
    return (req, res, next) => {
        const result = model.validate(req.body)
        if (result.error) {
            console.log(result.error)
            res.status(400).json(result.error.details[0].message)// .details[0].message added by me to send a more clear message
            return
        }
        req.model = result.value
        //delete req.body
        next()
    }
}