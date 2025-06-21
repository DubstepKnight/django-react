import { BASE_PATH_LOCAL_DEV } from '../constants';
import { IBoard } from '../types';
import { refreshTokens } from './auth';

export const getBoardById = async (boardId: string): Promise<IBoard> => {
  try {
    const response = await fetch(`${BASE_PATH_LOCAL_DEV}/boards/${boardId}`, {
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

export const getAllBoardsShallow = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await fetch(`${BASE_PATH_LOCAL_DEV}/boards/all-shallow`, {
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
