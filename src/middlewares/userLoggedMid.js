const userService = require('../model/service/userService')

//MIDDLEWARE GLOBAL
function userLoggedMid(req,res, next){
    //la variable locals afecta a toda la aplicacion
    res.locals.isLogged = false;
    let emailInCookie = req.cookies.userEmail;
    if (emailInCookie != undefined) {
        let userFromCookie = userService.findByField('email', emailInCookie);

        if (userFromCookie) {
            req.session.userLogged = userFromCookie;
        }
    }
    

    if(req.session.userLogged){
        res.locals.isLogged = true;  
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMid;
