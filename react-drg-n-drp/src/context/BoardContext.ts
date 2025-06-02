import { createContext } from 'react';
import type { IBoard, ICard, IColumn } from '@/lib/types';

export interface BoardState {
  boards: { [id: string]: IBoard };
  columnOrder: string[];
  columns: { [id: string]: IColumn };
  cardOrder: { [columnId: string]: string[] };
  cards: { [id: string]: ICard };
  activeCard?: ICard;
  activeColumn?: IColumn;
  isCardActive: boolean;
  isColumnActive: boolean;
}

export const initialState: IColumn[] = [];

export enum BoardActionType {
  SET_BOARD,
  SET_ACTIVE_CARD,
  SET_ACTIVE_COLUMN,
  MOVE_CARD,
  MOVE_COLUMN,
}

export type BoardAction =
  | { type: BoardActionType.SET_BOARD; payload: IBoard }
  | { type: BoardActionType.SET_ACTIVE_CARD; payload?: ICard }
  | { type: BoardActionType.SET_ACTIVE_COLUMN; payload?: IColumn }
  | { type: BoardActionType.MOVE_CARD; payload: { newCardOrder: { [columnId: string]: string[] } } }
  | { type: BoardActionType.MOVE_COLUMN; payload: { newColumnOrder: string[] } };

export const BoardContext = createContext<
  | {
      state: BoardState;
      dispatch: React.Dispatch<BoardAction>;
    }
  | undefined
>(undefined);
