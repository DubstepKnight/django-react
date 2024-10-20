import type { Board as BoardType } from '@/lib/types';
import type { Column as ColumnType } from '@/lib/types';
import React from 'react';
import ColumnComponent from './column';
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { findCard, findColumn } from '@/lib/utils';

const Board: React.FC<BoardType> = ({ Column }) => {
  const [items, setItems] = React.useState<ColumnType[]>(Column!);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIsCol = `${active?.id}`.includes('col-');
      const activeIsCard = `${active?.id}`.includes('car-');
      const overIsCol = `${over?.id}`.includes('col-');
      const overIsCard = `${over?.id}`.includes('car-');

      if (activeIsCard && overIsCard) {
        const overCard = findCard(over, items);
        const activeCard = findCard(active, items);

        if (activeCard?.columnIndex === overCard?.columnIndex) {
          setItems((items) => {
            if (activeCard && overCard) {
              const newCards = items[overCard.columnIndex].Card!;
              newCards.splice(
                overCard?.cardIndex < 0 ? newCards.length + overCard?.cardIndex : overCard?.cardIndex,
                0,
                newCards.splice(activeCard.cardIndex, 1)[0],
              );
              for (let i = 0; i < newCards.length; i++) {
                const element = newCards[i];
                element.position = i + 1;
              }
            }
            return items;
          });
        }

        if (activeCard?.columnIndex !== overCard?.columnIndex) {
          setItems((items) => {
            const activeColumnCards = items[activeCard!.columnIndex].Card!;
            const removedCard = activeColumnCards.splice(activeCard!.cardIndex, 1)[0];

            for (let i = 0; i < activeColumnCards.length; i++) {
              const element = activeColumnCards[i];
              element.position = i + 1;
            }

            const overColumnCards = items[overCard!.columnIndex].Card!;
            overColumnCards.splice(
              overCard!.cardIndex < 0 ? overColumnCards.length + overCard!.cardIndex : overCard!.cardIndex,
              0,
              removedCard,
            );

            for (let i = 0; i < overColumnCards.length; i++) {
              const element = overColumnCards[i];
              element.position = i + 1;
            }

            return items;
          });
        }
      }

      if (activeIsCard && overIsCol) {
        const activeCard = findCard(active, items);
        const overCol = findColumn(over, items);

        if (activeCard?.columnIndex === overCol) {
          setItems((items) => {
            if (activeCard && overCol?.toString()) {
              const newCards = items[overCol].Card!;
              newCards.push(newCards.splice(activeCard.cardIndex, 1)[0]);

              for (let i = 0; i < newCards.length; i++) {
                const element = newCards[i];
                element.position = i + 1;
              }
            }
            return items;
          });
        }

        if (activeCard?.columnIndex !== overCol) {
          setItems((items) => {
            if (activeCard?.columnIndex.toString() && overCol?.toString()) {
              const activeColumnCards = items[activeCard.columnIndex].Card!;
              const removedCard = activeColumnCards.splice(activeCard.cardIndex, 1)[0];

              for (let i = 0; i < activeColumnCards.length; i++) {
                const element = activeColumnCards[i];
                element.position = i + 1;
              }

              const overColumnCards = items[overCol].Card!;
              overColumnCards.push(removedCard);

              for (let i = 0; i < overColumnCards.length; i++) {
                const element = overColumnCards[i];
                element.position = i + 1;
              }
            }
            return items;
          });
        }
      }

      if (activeIsCol && overIsCol) {
        const activeCol = findColumn(active, items);
        const overCol = findColumn(over, items);

        if (activeCol?.toString() && overCol?.toString()) {
          setItems((items) => {
            const newArray = items.slice();
            newArray.splice(overCol < 0 ? newArray.length + overCol : overCol, 0, newArray.splice(activeCol, 1)[0]);
            for (let i = 0; i < newArray.length; i++) {
              const element = newArray[i];
              element.position = i + 1;
            }
            return newArray;
          });
        }
      }
    }
  };

  return (
    <div className={`flex gap-4`}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext items={items.map((item) => `col-${item.id}`)} strategy={horizontalListSortingStrategy}>
          {items?.map((col) => {
            return <ColumnComponent key={col.id} {...col} />;
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Board;
