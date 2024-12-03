import type { CardColumnPosition, Column as ColumnType } from '@/lib/types';
import type { Card as CardType } from '@/lib/types';
import React from 'react';
import ColumnComponent from './column';
import { Active, closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, Over } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import {
  findCard,
  findCardPosition,
  findColumn,
  findColumnPosition,
  moveCardToAnotherColumn,
  moveCardWithinSameColumn,
  moveColumn,
} from '@/lib/utils';
import DraggableItem from './draggable-item';

interface IBoard {
  items: ColumnType[];
  setItems: React.Dispatch<React.SetStateAction<ColumnType[] | undefined>>;
  moveCardEvent: (oldPosition: CardColumnPosition, newPosition: CardColumnPosition) => void;
  deleteCardEvent: (value: any) => void;
  createCardEvent: (value: any) => void;
  editCardEvent: (value: any) => void;
  moveColumnEvent: (value: any) => void;
  deleteColumnEvent: (value: any) => void;
  createColumnEvent: (value: any) => void;
  editColumnEvent: (value: any) => void;
}

const Board: React.FC<IBoard> = ({
  items,
  setItems,
  createCardEvent,
  createColumnEvent,
  deleteCardEvent,
  deleteColumnEvent,
  editCardEvent,
  editColumnEvent,
  moveCardEvent,
  moveColumnEvent,
}) => {
  const [isColumnActive, setIsColumnActive] = React.useState<boolean>(false);
  const [isCardActive, setIsCardActive] = React.useState<boolean>(false);
  const [activeCard, setActiveCard] = React.useState<CardType>();
  const [activeColumn, setActiveColumn] = React.useState<ColumnType>();

  function handleCardOverCard(active: Active, over: Over) {
    setItems((prevItems) => {
      const newItems = [...prevItems!];
      const activePos = findCardPosition(active, newItems);
      const overPos = findCardPosition(over, newItems);

      if (!activePos || !overPos) return newItems;

      const activeColumnCards = newItems[activePos.columnIndex].Card;
      const overColumnCards = newItems[overPos.columnIndex].Card;

      if (activePos.columnIndex === overPos.columnIndex) {
        moveCardWithinSameColumn(activeColumnCards!, activePos.cardIndex, overPos.cardIndex);
      } else {
        moveCardToAnotherColumn(activeColumnCards!, overColumnCards!, activePos.cardIndex, overPos.cardIndex);
      }

      // Optional: Call external function to update backend
      moveCardEvent(activePos!, overPos!);

      return newItems;
    });
  }

  function handleCardOverColumn(active: Active, over: Over) {
    setItems((prevItems) => {
      const newItems = [...prevItems!];
      const activePos = findCardPosition(active, newItems);
      const overColIndex = findColumnPosition(over, newItems);

      if (activePos === null || overColIndex === null) return newItems;

      const activeColumnCards = newItems[activePos!.columnIndex].Card;
      const overColumnCards = newItems[overColIndex!].Card;

      if (activePos!.columnIndex === overColIndex) {
        // Move to the end of the same column
        moveCardWithinSameColumn(activeColumnCards!, activePos!.cardIndex, activeColumnCards!.length - 1);
      } else {
        // Move to the end of the other column
        moveCardToAnotherColumn(activeColumnCards!, overColumnCards!, activePos!.cardIndex, overColumnCards!.length);
      }

      return newItems;
    });
  }

  function handleColumnOverColumn(active: Active, over: Over) {
    setItems((prevItems) => {
      const newItems = [...prevItems!];
      const activeColIndex = findColumnPosition(active, newItems);
      const overColIndex = findColumnPosition(over, newItems);

      if (activeColIndex === null || overColIndex === null) return newItems;

      moveColumn(newItems, activeColIndex!, overColIndex!);
      console.log('newItems: ', newItems);

      return newItems;
    });
  }

  // Refactored handleDragEnd function
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = `${active.id}`;
    const overId = `${over.id}`;

    const activeIsCol = activeId.includes('col-');
    const activeIsCard = activeId.includes('car-');
    const overIsCol = overId.includes('col-');
    const overIsCard = overId.includes('car-');

    if (activeIsCard && overIsCard) {
      handleCardOverCard(active!, over);
    } else if (activeIsCard && overIsCol) {
      handleCardOverColumn(active!, over);
    } else if (activeIsCol && overIsCol) {
      handleColumnOverColumn(active!, over);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    if (`${active.id}`.slice(0, 4) === 'car-') {
      setIsCardActive(true);
      setIsColumnActive(false);

      const activeCard = findCard(active, items);
      setActiveCard(activeCard);
    }
    if (`${active.id}`.slice(0, 4) === 'col-') {
      setIsColumnActive(true);
      setIsCardActive(false);

      const activeColumn = findColumn(active, items);

      setActiveColumn(activeColumn);
    }
  };

  console.log('items: ', items);

  return (
    <div className={`flex gap-4`}>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCenter}>
        <SortableContext items={items!.map((item) => `col-${item.id}`)} strategy={horizontalListSortingStrategy}>
          {items?.map((col) => {
            return <ColumnComponent key={col.id} {...col} />;
          })}
        </SortableContext>
        <DragOverlay>
          <DraggableItem
            isCardActive={isCardActive}
            isColumnActive={isColumnActive}
            cardItems={activeCard}
            columnItems={activeColumn}
          />
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
