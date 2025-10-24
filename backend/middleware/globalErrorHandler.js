const notFound = (req,res,next)=>{
  let error = new Error(`cannot find the route ${req.originalUrl} on this server!`);
  next(error);
}

const globalError = (error, req, res, next)=>{
  const status = error?.status ? error.status : "failed";
  const message = error?.message;
  const stack = error?.stack;
  res.status(500).json({ status, message, stack });
}

module.exports = { globalError, notFound }