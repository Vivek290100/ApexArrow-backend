import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json({message: 'Invalid token', success: false})
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded) {
            return res.status(403).json({message: 'Token expired', success: false})
        }
        req.id = decoded.userId
        // console.log("middleware user id",req.id);
        
        next()
    }catch(error) {
        console.error(error)
        return res.status(500).json({message: 'Server Error', success: false})
    }
}


export default isAuthenticated