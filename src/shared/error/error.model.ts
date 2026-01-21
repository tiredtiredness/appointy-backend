export class CustomError extends Error {
  path?: string;
  status?: number;
  response?: unknown;
  constructor({
    message,
    path,
    status,
    response,
  }: {
    message?: CustomError["message"];
    path?: CustomError["path"];
    status?: CustomError["status"];
    response?: CustomError["response"];
  }) {
    super(message);
    this.path = path;
    this.status = status;
    this.response = response;
  }
}
