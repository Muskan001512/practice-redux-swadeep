import JWT from "jsonwebtoken"

const JWTKEY = process.env.JWTKEY || "sanCHAY"

const authentication = (req, res, next) => {
    const token = req?.headers?.['swadeep']
    if (token) {
        JWT.verify(token, JWTKEY, (err, valid) => {
            if (err) {
                res.status(400).send({ status: 400, message: "Access Forbidden, Unauthorized Request" })
            } else {
                next()
            }
        })
    } else {
        res.status(400).send({ status: 400, message: "Invalid Token" })
    }
}

export default authentication