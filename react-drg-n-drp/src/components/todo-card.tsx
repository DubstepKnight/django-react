import React from 'react';
import { type ICard as CardType } from '@/lib/types';
import { useAuth } from '@/context/AuthProvider';
import { useSortable } from '@dnd-kit/react/sortable';
import { CollisionPriority } from '@dnd-kit/abstract';

interface ITodoCardProps extends CardType {
  children: React.ReactNode;
  colId?: string;
  index: number;
}

const TodoCard: React.FC<ITodoCardProps> = ({ id, content, children, colId, index }) => {
  const { isDragging, ref } = useSortable({
    id,
    index,
    type: 'card',
    accept: 'card',
    collisionPriority: CollisionPriority.High,
    group: colId,
    data: {
      parentColumndId: colId,
    },
  });

  const { devMode } = useAuth();

  return (
    <div ref={ref} className={isDragging ? 'opacity-50' : undefined} content={content} data-dragging={isDragging}>
      {children}
      {devMode && <p className="text-xs text-gray-500"> {id} </p>}
    </div>
  );
};

export default TodoCard;
