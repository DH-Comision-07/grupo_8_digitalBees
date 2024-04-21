const userService = require('../service/userService')

//MIDDLEWARE GLOBAL
function userLoggedMid(req,res, next){
    //la variable locals afecta a toda la aplicacion
    res.locals.isLogged = false;
    
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = userService.findByField('email', emailInCookie);
    //console.log("pase 1",emailInCookie);
    //console.log("pase 2",userFromCookie);
    if (userFromCookie) {
       // console.log("pase 3");
        req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged){
        res.locals.isLogged = true;  
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMid;
