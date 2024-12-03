import React from 'react';
import type { Card as CardType } from '@/lib/types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Card } from './ui/card';

interface ITodoCardProps extends CardType {
  children: React.ReactNode;
}

const TodoCard: React.FC<ITodoCardProps> = ({ id, content, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `car-${id}` });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} content={content} style={style}>
      {children}
    </div>
  );
};

export default TodoCard;
