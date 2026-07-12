export function notFound(_request, response, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}

export function errorHandler(error, _request, response, _next) {
  let status = error.status || 500;
  let message = error.message || 'Server Error';

  if (error.name === 'ValidationError') {
    status = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(', ');
  }

  if (error.code === 11000) {
    status = 409;
    message = 'Duplicate value already exists';
  }

  if (error.name === 'CastError') {
    status = 400;
    message = `Invalid ${error.path}`;
  }

  if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError') {
    status = 503;
    message = 'Database unavailable';
  }

  response.status(status).json({
    success: false,
    message
  });
}