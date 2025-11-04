export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.status = err.status || 500;

  if(err.code === 11000){
    (err.message = `Duplicate ${Object.keys(err.keyValue)} entered`),
    (err.statusCode = 400)
  }

  return res.status(400).json({ success: false, message: err.message });
};

export const asyncError = (passedFunc) => (req, res, next) => {
  Promise.resolve(passedFunc(req, res, next)).catch(next);
};
