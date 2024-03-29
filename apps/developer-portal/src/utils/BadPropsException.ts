class BadPropsException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadPropsException.prototype);
  }
}

export default BadPropsException;
