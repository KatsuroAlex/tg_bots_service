const url = 'http://80.87.96.7/api';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
  // return res.text().then((text) => {
  //   // eslint-disable-next-line prefer-promise-reject-errors
  //   return Promise.reject({
  //     status: res.status,
  //     errorText:
  //       JSON.parse(text).message === 'Validation failed'
  //         ? JSON.parse(text).validation.body.message
  //         : JSON.parse(text).message,
  //   });
  // });
}

// eslint-disable-next-line no-shadow
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// eslint-disable-next-line camelcase
export function register(email, username, password, confirm_password, image) {
  return request(`${url}/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // eslint-disable-next-line camelcase
    body: JSON.stringify({
      email,
      username,
      password,
      // eslint-disable-next-line camelcase
      confirm_password,
      image,
    }),
  });
}

export function authorize(password, email) {
  return request(`${url}/auth/token/login/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  });
}

// eslint-disable-next-line camelcase
export function checkToken(auth_token) {
  return request(`${url}/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // eslint-disable-next-line camelcase
      Authorization: `Token ${auth_token}`,
    },
  });
}
