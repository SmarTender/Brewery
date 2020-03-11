export default class ApiResponse {
  readonly status: boolean;
  readonly message: string;
  readonly result?: any;
  readonly id?: any;

  constructor(status: boolean, message: string, id?: any, result?: any) {
    this.status = status;
    this.message = message;
    if (id) {
      this.id = id;
    }

    if (result) {
      this.result = result;
    }
  }
}
