import type { Column as ColumnType } from '@/lib/types';
import type { Card as CardType } from '@/lib/types';
import React from 'react';
import TodoCard from './todo-card';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

const Column: React.FC<ColumnType> = ({ id, Card, name }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver, over } = useSortable({
    id: `col-${id}`,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const [items] = React.useState<CardType[]>(Card!);

  return (
    <div
      className="flex flex-col gap-4 min-w-48 w-full max-w-xs"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between">
        <h2 className="text-md font-bold"> {name} </h2>
        <Button variant={'ghost'} size={'sm'}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className={`flex flex-col gap-2 min-h-96 h-auto`}>
        <SortableContext items={items.map((item) => `car-${item.id}`)} strategy={verticalListSortingStrategy}>
          {items?.map((card) => {
            return <TodoCard key={card.id} {...card} />;
          })}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
