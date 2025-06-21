import { BASE_PATH_LOCAL_DEV } from '../constants';

type JwtLoginResponse = {
  email: string;
};

type LoginInputParameters = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginInputParameters): Promise<JwtLoginResponse> => {
  try {
    const response = await fetch(`${BASE_PATH_LOCAL_DEV}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_PATH_LOCAL_DEV}/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};

export const refreshTokens = async (): Promise<JwtLoginResponse> => {
  try {
    const response = await fetch(`${BASE_PATH_LOCAL_DEV}/users/refresh_token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      document.cookie = 'logged_in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
};
