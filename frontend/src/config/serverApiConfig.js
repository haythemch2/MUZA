console.log(
  'process env REACT_APP_DEV_REMOTE',
  process.env.REACT_APP_DEV_REMOTE
);

// export const API_BASE_URL =
//   process.env.NODE_ENV == 'production' ||
//   process.env.REACT_APP_DEV_REMOTE == 'remote'
//     ? 'http://141.94.77.9:5010/api/'
//     : 'http://localhost:5000/api/';

export const API_BASE_URL = 'http://localhost:5010/api/';
export const ACCESS_TOKEN_NAME = 'x-auth-token';
