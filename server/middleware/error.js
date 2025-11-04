export const errorMiddleware = (err, req, res, next)=> {
    err.message = err.message || "Internal server error";
    err.status = err.status || 500;
    
    return res.status(400).json({success: false, message: err.message});
};