const jwt = require('jsonwebtoken');
function validateToken(req,res,next){
    var token = req.headers.authorization;
    token = token.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'no token provided'});
    }
    jwt.verify(token,'Hamid',(err,decoded) => {
        if(err){
            return res.status(403).json({message: 'failed to authenticate token'});
        }
        req.user = decoded;
        next();
    });
}
function requireRoles(roles) {
    return (req, res, next) => {
    const userRole = req.body.role;
    if (roles.includes(userRole)) {    
    next();
    } else {    
    res.status(403).json({ message: 'Permission denied' });
    }
    };
    
    }
module.exports = {validateToken,requireRoles};