// const restrictRole = (role)=>{
//     return(req,res,next)=>{
//         if(req.user.role !== role){
//             res.status(403).json({status:false,message:"you do not have access to view this route"})
//             next()

//         }
//         next()


//     }

// }

// module.exports = restrictRole