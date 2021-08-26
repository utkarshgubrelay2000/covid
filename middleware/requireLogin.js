const jwt = require("jsonwebtoken");

module.exports=(req,res,next)=>{
  let authorization=req.params.token
 
if(authorization){
jwt.verify(authorization, process.env.JWT_SECRET, (err, payload) => {
    if (err || payload === undefined) {
      console.log(`some error in verifying jwt secret${err}`);
  res.status(404).json('token')
    }
else{
  let  md5UserId=payload.secretId

  req.body.userId = md5UserId;
next()
}
})

}
else{
  res.redirect('/')


}
}

