import { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';

export const getErrorCodeFromStatus = (status: number): TRPC_ERROR_CODE_KEY => {
  let code: TRPC_ERROR_CODE_KEY;
  switch (status) {
    case 400:
      code = 'BAD_REQUEST';
      break;
    case 401:
      code = 'UNAUTHORIZED';
      break;
    case 403:
      code = 'FORBIDDEN';
      break;
    case 404:
      code = 'NOT_FOUND';
      break;
    case 408:
      code = 'TIMEOUT';
      break;
    case 409:
      code = 'CONFLICT';
      break;
    case 412:
      code = 'PRECONDITION_FAILED';
      break;
    case 413:
      code = 'PAYLOAD_TOO_LARGE';
      break;
    case 405:
      code = 'METHOD_NOT_SUPPORTED';
      break;
    // case 422:
    //   code = 'UNPROCESSABLE_CONTENT';
    //   break;
    case 429:
      code = 'TOO_MANY_REQUESTS';
      break;
    case 499:
      code = 'CLIENT_CLOSED_REQUEST';
      break;
    case 500:
    default:
      code = 'INTERNAL_SERVER_ERROR';
  }
  return code;
};
