import React from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import type { Card as CardType } from '@/lib/types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

const TodoCard: React.FC<CardType> = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: `car-${id}` });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Card {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <CardHeader>
        <CardTitle> {content} </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TodoCard;
