//init code
const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/user');

//middleware setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//routes go here
//default route
router.all('/', (req,res) => {
        res.send("Hello Saurav");
    }
);

//create new user
router.post('/createUser',
    [
        //check not empty fields
        check('username').not().isEmpty().trim().escape(),
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    (req,res) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({
                status : false,
                message : "Form Validation Error",
                errors : errors.array()
            });
        }

        //hash password code
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        //create new use model
        var temp = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        });

        //insert data into database
        temp.save((error, result) => {
            //check error
            if(error){
                return res.json({
                    status : false,
                    message : 'DB Insert Fail',
                    error : error
                });
            }
            //Everything Ok
            return res.json({
                status : true,
                message : 'DB Insert Success',
                result : result
            });
        });
    }
);

//find user document route
router.get('/find/:email',
    (req,res) => {
        //find user documet
        User.find({email : req.params.email},{password : 0},
            (error, result) => {
            //check error
            if(error){
                return res.json({
                    status : false,
                    message : 'DB Find Fail',
                    error : error
                });
            }
            //if everything ok
            return res.json({
                status : true,
                message : 'DB Find Success',
                result :result
            });
        });
    }
);

//update user document
router.put('/update/:email',
    (req,res) => {
        //check email is empty or not
        if(req.params.email){
            User.updateOne(
                { email : req.params.email},
                { username : 'Username' },
                (error,result) => {
                    //check error
                    if(error){
                        return res.json({
                            status : false,
                            message : 'DB Update Fail',
                            error : error
                        });
                    }
                    //if everything ok
                    return res.json({
                        status : true,
                        message : 'DB Update Success',
                        result : result
                    });
                }
            );
        } else {
            return res.json({
                status : false,
                message : 'Email not provided'
            });
        }
    }
);

//delete user document
router.delete('/delete/:email',
    (req,res) => {
        //check if email empty
        if(req.params.email){
            User.deleteOne(
                { email : req.params.email},
                (error,result) => {
                    //check error
                    if(error){
                        return res.json({
                            status : false,
                            message : 'DB Delete Fail',
                            error : error
                        });
                    }
                    //everything ok
                    return res.json({
                        status : true,
                        message : 'DB Delete Success',
                        result : result
                    });
                }
            );
        } else {
            return res.json({
                status : false,
                message : 'Email not provided'
            });
        }
    }
);

//module export
module.exports = router;