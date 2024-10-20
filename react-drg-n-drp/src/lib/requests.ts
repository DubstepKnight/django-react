type JwtLoginResponse = {
  access_token: string;
};

type LoginInputParameters = {
  email: string;
  password: string;
};

const login = async ({ email, password }: LoginInputParameters): Promise<JwtLoginResponse> => {
  try {
    const response = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
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

const getBoardById = async (boardId: string): Promise<any> => {
  console.log('boardId: ', boardId);

  try {
    const response = await fetch(`http://localhost:3000/board/${boardId}`, {
      method: 'GET',
    });

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

export { login, getBoardById };
