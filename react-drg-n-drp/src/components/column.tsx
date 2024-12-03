import type { Column as ColumnType } from '@/lib/types';
import type { Card as CardType } from '@/lib/types';
import React from 'react';
import TodoCard from './todo-card';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CardShell } from './card-shell';
import ColumnShell from './column-shell';

const Column: React.FC<ColumnType> = ({ id, Card, name, boardId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `col-${id}`,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const [items] = React.useState<CardType[]>(Card!);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="min-w-48 w-full max-w-xs">
      <ColumnShell id={id} boardId={boardId} name={name} Card={Card} position={0}>
        <SortableContext items={items.map((item) => `car-${item.id}`)} strategy={verticalListSortingStrategy}>
          {items?.map((card) => {
            return (
              <TodoCard key={card.id} {...card}>
                <CardShell {...card} />
              </TodoCard>
            );
          })}
        </SortableContext>
      </ColumnShell>
    </div>
  );
};

export default Column;
