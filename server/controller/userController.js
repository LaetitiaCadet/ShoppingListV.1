module.exports.createUser = async (req, res) => {

    let response = {}
    try {
        console.log(req.body)
        response.status = 200
        response.message = 'User successfully created'
        response.body = req.body
    } catch (error) {
        console.error(error)
        response.status = 400
        response.message = error.message
    }
    return res.status(response.status).send(response)
}