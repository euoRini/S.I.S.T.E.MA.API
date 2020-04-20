const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send('Token não informado');

    const parts = authHeader.split(' ');

    if(!parts.length === 2) return res.status(401).send('erro no token');

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send('Token mal formatado.');
    if(!/^admin$/i.test(token)) return  next();
    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if (err) return res.status(401).send('token invalido');
  
        req.adminId = decoded.id;
        return next();
    });
};