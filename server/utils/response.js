export function success(response, data, message = 'Success') {
  return response.json({ success: true, message, data });
}

export function failure(response, message = 'Failed', status = 400) {
  return response.status(status).json({ success: false, message });
}