import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ICard, ICard as CardType, IColumn } from './types';
import { IColumn as ColumnType } from './types';
import { Active, Over } from '@dnd-kit/core';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findCard = (card: Active | Over, items: any): CardType | undefined => {
  const id = `${card.id}`.slice(4);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    for (let j = 0; j < (item.Card?.length ?? 0); j++) {
      const element = item.Card![j];
      if (element.id === id) {
        return element;
      }
    }
  }
};

export const findColumn = (column: Active | Over, items: any[]): ColumnType | undefined => {
  const id = `${column.id}`.slice(4);
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element.id === id) {
      return element;
    }
  }
};

export const findCardPosition = (card: Active | Over, items: any[]) => {
  let foundCard;
  const id = `${card.id}`.slice(4);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    for (let j = 0; j < (item.Card?.length ?? 0); j++) {
      const element = item.Card![j];
      if (element.id === id) {
        foundCard = { columnIndex: i, cardIndex: j };
        return foundCard;
      }
    }
  }
};

export const findColumnPosition = (column: Active | Over, items: any[]) => {
  let foundColumn = 0;
  const id = `${column.id}`.slice(4);
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element.id === id) {
      foundColumn = i;
      return foundColumn;
    }
  }
};

// Moving utilities
export const moveCardWithinSameColumn = (columnCards: ICard[], fromIndex: number, toIndex: number): void => {
  const [movedCard] = columnCards.splice(fromIndex, 1);
  columnCards.splice(toIndex, 0, movedCard);
  updateCardPositions(columnCards);
};

export const moveCardToAnotherColumn = (
  fromColumnCards: ICard[],
  toColumnCards: ICard[],
  fromIndex: number,
  toIndex: number,
): void => {
  const [movedCard] = fromColumnCards.splice(fromIndex, 1);
  updateCardPositions(fromColumnCards);

  toColumnCards.splice(toIndex, 0, movedCard);
  updateCardPositions(toColumnCards);
};

export const moveColumn = (columns: IColumn[], fromIndex: number, toIndex: number): void => {
  console.log('column gets to move');
  const [movedColumn] = columns.splice(fromIndex, 1);
  console.log('movedColumn: ', movedColumn);
  columns.splice(toIndex, 0, movedColumn);
  console.log('columns: ', columns);
  updateColumnPositions(columns);
};

// Update position utilities
export const updateCardPositions = (cards: ICard[]): void => {
  cards.forEach((card, index) => {
    card.position = index + 1;
  });
};

export const updateColumnPositions = (columns: IColumn[]): void => {
  columns.forEach((column, index) => {
    column.position = index + 1;
  });
};
