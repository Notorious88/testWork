const {USER} = require("../../../database/model/index")

const tools = require("./../../utils/tools")
const crypt = require("../../utils/crypt");


exports.user_create = async (req, res) => {
    if(req.body.name === undefined || req.body.password === undefined){
       return  res.status(412).json({
            success: false,
            massage: "Invalid data"
        })
    }

        await USER.find({name: req.body.name})
            .then(result => {
                    if (result[0]) {
                        console.log(result, "res")
                        res.status(200).json({
                            success: false,
                            massage: "This name already exists"
                        })
                    } else {
                        const testData = tools.checkDataUserCreate(req.body);

                        if (testData.status) {

                            const hash = crypt.encrypt(req.body.password);

                            const user = new USER({
                                name: req.body.name,
                                password: hash
                            })

                            user.save()
                                .then(newUser => {
                                    req.logIn(newUser, (err) => {
                                        console.log(err)
                                        return err ? res.status(500).json({
                                            success: false,
                                            massage: "Error"
                                        }) : res.status(200).json({
                                            success: true,
                                            massage: "save"
                                        })
                                    })
                                })
                                .catch(e => {
                                    console.log(e)
                                    res.status(500).json({
                                        success: false,
                                        massage: "Error"
                                    })
                                })
                        } else {
                            res.status(200).json({
                                success: false,
                                massage: testData.error
                            })
                        }
                    }
                }
            ).catch(e => {
                console.log(e)
                res.status(500).json({
                    success: false,
                    massage: "Error"
                })
            })
}


exports.user_login = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            success: true,
            massage: "Login!"
        })
    } else {
        return res.status(500).json({
            success: false,
            massage: "Something went wrong!"
        })
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}


