class NotAuthorizedError extends Error {
  status: number;

  constructor (message: string) {
    super(message);
    this.status = 401;
  }
}

export default NotAuthorizedError;
