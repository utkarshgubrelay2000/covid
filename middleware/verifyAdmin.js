const jwt = require("jsonwebtoken");
const userModel = require("../model/adminModel");
const md5 = require("md5")

module.exports=(req,res,next)=>{
  let authorization=req.params.token
if(authorization){
jwt.verify(authorization, process.env.JWT_SECRET, (err, payload) => {
    if (err || payload === undefined) {
      console.log(`some error in verifying jwt secret${err}`);
      res.status(404).json('some error in verifying jwt secret')
    }
else{
  let  md5UserId=payload.secretId

  req.body.userId = md5UserId;

}
})

}
else{
  res.status(404).json('You Need To Login first')

}
}