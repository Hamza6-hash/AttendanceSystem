import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token) return res.status(403).send("Access denied")

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart()
        }

        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default verifyToken