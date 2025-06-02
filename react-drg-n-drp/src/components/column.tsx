import { type IColumn as ColumnType } from '@/lib/types';
import React from 'react';
import TodoCard from './todo-card';
import { useSortable } from '@dnd-kit/react/sortable';
import { CardShell } from './card-shell';
import ColumnShell from './column-shell';
import { useBoardContext } from '@/context/BoardProvider';
import { CollisionPriority } from '@dnd-kit/abstract';

const Column: React.FC<ColumnType & { index: number }> = ({ id, name, boardId, index }) => {
  const { isDragging, isDropTarget, ref } = useSortable<ColumnType>({
    id,
    index,
    type: 'column',
    collisionPriority: CollisionPriority.Low,
    accept: ['card', 'column'],
  });

  const style = isDropTarget ? { background: '#00000030' } : undefined;

  const { state } = useBoardContext();

  return (
    <div
      ref={ref}
      className={`min-w-48 min-h-24 w-full max-w-xs rounded-xl ${isDragging && 'opacity-50 bg-gray-400'}`}
      style={style}
    >
      <ColumnShell id={id} boardId={boardId} name={name} position={0}>
        {state.cardOrder[id].map((cardId, index) => {
          const card = state.cards[cardId];
          return (
            <TodoCard key={card.id} index={index} colId={id} {...card}>
              <CardShell {...card} />
            </TodoCard>
          );
        })}
      </ColumnShell>
    </div>
  );
};

export default Column;
