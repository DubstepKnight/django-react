import React from 'react';
import { CardShell } from './card-shell';
import ColumnShell from './column-shell';
import { useBoardContext } from '@/context/BoardProvider';

type IDraggableItem = {
  id: string;
  type: any;
};

const DraggableItem: React.FC<IDraggableItem> = ({ id, type }) => {
  const { state } = useBoardContext();

  if (type === 'card') {
    const activeCard = state.cards[id];
    return <CardShell {...activeCard} />;
  }
  if (type === 'column') {
    const activeColumn = state.columns[id];
    return (
      <ColumnShell {...state.columns[id]}>
        {state.cardOrder[activeColumn.id]?.map((cardId) => {
          const card = state.cards[cardId];
          return <CardShell {...card} />;
        })}
      </ColumnShell>
    );
  }
};

export default DraggableItem;
