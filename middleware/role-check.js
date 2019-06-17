module.exports = (function(){
    function loggedIn(session){
        if(!session){
            return false;
            return session.user && session.role;
        }
    }

    function  superadmins(req,res,next){
        if(!loggedIn(req.session) || !req.session.role >= 100){
            return res.redirect('/login')
        }
        next();
    }

    function  admins(req,res,next){
        if(!loggedIn(req.session) || !req.session.role >= 100 && ! req.session.role <100){
            return res.redirect('/login')
        }
        next();
    }
    function  moderators(req,res,next){
        if(!loggedIn(req.session) || !req.session.role >= 75 && ! req.session.role < 75){
            return res.redirect('/login')
        }
        next();
    }

    function  user(req,res,next){
        if(!loggedIn(req.session) || !req.session.role >= 25 && ! req.session.role < 25){
            return res.redirect('/login')
        }
        next();
    }
    
    function  guest(req,res,next){
        if(!loggedIn(req.session) || !req.session.role == 0){
            return res.redirect('/login')
        }
        next();
    }

    return {
        superadmins,
        admins,
        moderators,
        user,
        guest
    }

})();