import React from 'react';
import { CardShell } from './card-shell';
import ColumnShell from './column-shell';
import TodoCard from './todo-card';
import { Card, Column } from '@/lib/types';

interface IDraggableItem {
  cardItems?: Card;
  columnItems?: Column;
  isColumnActive: boolean;
  isCardActive: boolean;
}

const DraggableItem: React.FC<IDraggableItem> = ({ cardItems, columnItems, isCardActive, isColumnActive }) => {
  if (isCardActive && cardItems) {
    return <CardShell {...cardItems} />;
  }
  if (isColumnActive && columnItems) {
    return (
      <ColumnShell {...columnItems}>
        {columnItems.Card?.map((card) => {
          return (
            <TodoCard key={card.id} {...card}>
              <CardShell {...card} />
            </TodoCard>
          );
        })}
      </ColumnShell>
    );
  }
};

export default DraggableItem;
