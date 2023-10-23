const { User } = require('../models/user');
exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  };

exports.loginUser=async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email})
        if(!user){
            res.status(401).send("No such user email")
        } else if(user.password===req.body.password){
            res.status(200).json({id:user.id,email:user.email,name:user.name,addresses:user.addresses})
        }else{
            res.status(401).send("invalid credentials")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}