import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const findCard = (card: any, items: any[]) => {
  let foundCard;
  const id = card.id.slice(4);
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

export const findColumn = (column: any, items: any[]) => {
  let foundColumn = 0;
  const id = column.id.slice(4);
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    if (element.id === id) {
      foundColumn = i;
      return foundColumn;
    }
  }
};
