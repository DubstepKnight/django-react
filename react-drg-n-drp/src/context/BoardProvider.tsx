import React, { useReducer, useContext } from 'react';
import type { BoardState, BoardAction } from './BoardContext';
import { BoardActionType, BoardContext } from './BoardContext';
import { ICard, IColumn } from '@/lib/types';

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case BoardActionType.SET_BOARD:
      const { id: boardId, name, userId, Column } = action.payload;

      // 1. Sort columns by position
      const sortedColumns = [...(Column || [])].sort((a, b) => a.position - b.position);

      // 2. Prepare normalized structures
      const columns: Record<string, IColumn> = {};
      const columnOrder: string[] = [];
      const cards: Record<string, ICard> = {};
      const cardOrder: Record<string, string[]> = {};

      for (const col of sortedColumns) {
        columns[col.id] = col;
        columnOrder.push(col.id);

        // Sort cards by position
        const sortedCards = [...(col.Card || [])].sort((a, b) => a.position - b.position);
        cardOrder[col.id] = sortedCards.map((card) => card.id);

        for (const card of sortedCards) {
          cards[card.id] = card;
        }
      }

      // 3. Return new state
      return {
        ...state,
        boards: { ...state.boards, [boardId]: { id: boardId, name, userId } },
        columns,
        columnOrder,
        cards,
        cardOrder,
      };
    case BoardActionType.SET_ACTIVE_CARD:
      return { ...state, activeCard: action.payload, isCardActive: true, isColumnActive: false };
    case BoardActionType.SET_ACTIVE_COLUMN:
      return { ...state, activeColumn: action.payload, isCardActive: false, isColumnActive: true };

    case BoardActionType.MOVE_CARD: {
      const { newCardOrder } = action.payload;

      return {
        ...state,
        cardOrder: newCardOrder,
      };
    }

    case BoardActionType.MOVE_COLUMN: {
      const { newColumnOrder } = action.payload;

      return {
        ...state,
        columnOrder: newColumnOrder,
      };
    }
    default:
      return state;
  }
};

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, {
    activeCard: undefined,
    activeColumn: undefined,
    isCardActive: false,
    isColumnActive: false,
    boards: {},
    columns: {},
    columnOrder: [],
    cards: {},
    cardOrder: {},
  });

  return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>;
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};
