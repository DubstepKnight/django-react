import { Board } from './types';

type JwtLoginResponse = {
  email: string;
};

type LoginInputParameters = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginInputParameters): Promise<JwtLoginResponse> => {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
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

const refreshTokens = async (): Promise<JwtLoginResponse> => {
  try {
    const response = await fetch('http://localhost:3000/user/refresh_token', {
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

const getBoardById = async (boardId: string): Promise<Board> => {
  try {
    const response = await fetch(`http://localhost:3000/board/${boardId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 401) {
      await refreshTokens();
    }

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllBoardsShallow = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await fetch(`http://localhost:3000/board/all-shallow`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 401) {
      await refreshTokens();
    }

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login, refreshTokens, getBoardById, getAllBoardsShallow };
