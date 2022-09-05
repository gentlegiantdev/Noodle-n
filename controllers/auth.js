const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const bcrypt = require('bcrypt')

 exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect('/groceryItems')
    }
    res.render('login', {
      title: 'Login'
    })
  }
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('/login')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) {
        req.flash('errors', info)
        return res.redirect('/login')
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || '/groceryItems')
      })
    })(req, res, next)
  }
  
  exports.logout = (req, res) => {
    req.logout(() => {
      console.log('User has logged out.')
    })
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err)
      req.user = null
      res.redirect('/')
    })
  }
  
  exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect('/groceryItems')
    }
    res.render('signup', {
      title: 'Create Account'
    })
  }
  
  exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'ERROR: Please enter a valid email address.' })
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'ERROR: Password must be at least 8 characters long.' })
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'ERROR: Passwords do not match.' })
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect('../signup')
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })
  
    User.findOne({$or: [
      {email: req.body.email},
      {userName: req.body.userName}
    ]}, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        req.flash('errors', { msg: 'Account with that email address or username already exists.' })
        return res.redirect('../signup')
      }
      user.save((err) => {
        if (err) { return next(err) }
        req.logIn(user, (err) => {
          if (err) {
            return next(err)
          }
          res.redirect('/groceryItems')
        })
      })
    })
  }

  //resetPassword method renders reset.ejs as a response
  exports.resetPassword = (req, res) => {
    res.render('reset', {
      title: 'Reset'
    })
  }

  //postResetPassword to process the submitted reset form  
  exports.postResetPassword = (req, res, next) => {

    
     //validating reset form inputs
     const validationErrors = []
    
     if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
     if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Old password cannot be blank.' })
     if (validator.isEmpty(req.body.newPassword)) validationErrors.push({ msg: 'New password cannot be blank.' })
     if (validator.isEmpty(req.body.confirmNewPassword)) validationErrors.push({ msg: 'Confirm new password cannot be blank.' })
 
     if(req.body.newPassword !== req.body.confirmNewPassword){validationErrors.push({ msg: 'New passwords are not same.' })}
 
     //if one or more reset form inputs is invalid 
     if (validationErrors.length) {
       req.flash('errors', validationErrors)
       return res.redirect('/reset')
     }
 
     
    // if all reset form inputs are valid:
    
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    //Validate user exists: Go to database and find user using email as filter
    User.findOne({email: req.body.email}).then((user) => {
      //user not found:
      if(!user){
        req.flash('errors',{ msg: 'No such user account exists' })
        console.log("User not found")
        return res.redirect('/reset')
      }
      //user found:
      if(user){
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => { //compare is bcrypt's method
          if(err){
            console.log(err)
          }
          //if user's entered old password matches the password stored in the database 
          if(isMatch){
            console.log(req.body)
            user.password = req.body.newPassword
            user.save()
            
             
            res.redirect('/login')
          }

          //if old password does not match the password stored in the database 
          else{
            req.flash('errors',{ msg: 'Old password is incorrect' })
            return res.redirect('/reset')
          }
  
        })
      }
    })
  
  }