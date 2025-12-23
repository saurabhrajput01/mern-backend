const errormiddleware = (err,req,res,next) =>{
    const status =err.status || 500;
    const message = err.message || "backend error";
    return res.status(status).json({message});
}


module.exports= errormiddleware;