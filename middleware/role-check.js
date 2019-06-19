module.exports = (function(){
    // check for session
    function loggedIn(session){
        if(!session){
            return false;
        }
        return  session.level;
    }

    function  superadmins(req,res,next){
        // hvis du ikke er log in eller hvis dit level ikke er højt nok
        if(!loggedIn(req.session) || !req.session.level >= 110){
            return res.redirect('/login')
        }
        next();
    }

    function  admins(req,res,next){
        if(!loggedIn(req.session) || !req.session.level >= 100 && ! req.session.level <100){
            return res.redirect('/login')
        }
        next();
    }
    function  moderators(req,res,next){
        if(!loggedIn(req.session) || !req.session.level >= 75 && ! req.session.level < 75){
            return res.redirect('/login')
        }
        next();
    }

    function  user(req,res,next){
        if(!loggedIn(req.session) || !req.session.level >= 25 && ! req.session.level < 25){
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