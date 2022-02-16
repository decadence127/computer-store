interface IApiError {
  status: number;
  message: string;
  errors: unknown[];
}

export class ApiError extends Error implements IApiError {
  status: number;
  message: string;
  errors: unknown[];

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
  static BadRequest(message: string, errors: unknown[] = []) {
    return new ApiError(
      400,
      message || "Content you have requested does not exist",
      errors
    );
  }
  static UnauthorizedError() {
    return new ApiError(401, "Unauthorized Error");
  }
}
