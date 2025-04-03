import React from 'react';
import type { CardColumnPosition, IColumn as ColumnType } from '@/lib/types';
import { getBoardById } from '@/lib/requests';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Board from '@/components/board';
import ErrorComponent from '@/components/error';
import { Skeleton } from '@/components/ui/skeleton';
import { socket } from '@/lib/socket';
import { moveCardWithinSameColumn } from '@/lib/utils';

const SkeletonColumn: React.FC = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-[100px] h-[30px] rounded-xl" />
    <Skeleton className="w-[300px] h-[700px] rounded-xl" />
  </div>
);

const REFETCH_INTERVAL = 1 * 6 * 1000; // 5 minutes

const BoardPage: React.FC = () => {
  const { boardId } = useParams();

  const [items, setItems] = React.useState<ColumnType[]>();
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  const { data, isLoading, isError, error, dataUpdatedAt } = useQuery({
    queryKey: ['board'],
    queryFn: () => getBoardById(boardId!),
    refetchInterval: REFETCH_INTERVAL,
  });

  console.log('dataUpdatedAt: ', dataUpdatedAt);

  const onCreateCardEvent = (value: any) => {
    console.log('create card: ', value);
  };

  const moveCardEvent = (oldPosition: CardColumnPosition, newPosition: CardColumnPosition): void => {
    oldPosition.cardIndex++;
    oldPosition.columnIndex++;
    newPosition.columnIndex++;
    newPosition.cardIndex++;
    console.log('oldPosition: ', oldPosition);
    console.log('newPosition: ', newPosition);
    socket.emit('move_card', { oldPosition, newPosition });

    console.log('items: ', items?.[0]?.Card);
  };

  const onMoveCardEvent = ({
    oldPosition: { columnIndex: oldColumnIndex, cardIndex: oldCardIndex },
    newPosition: { columnIndex: newColumnIndex, cardIndex: newCardIndex },
  }: {
    oldPosition: CardColumnPosition;
    newPosition: CardColumnPosition;
  }) => {
    // console.log('old column index: ', event.oldPosition.columnIndex);
    // console.log('new column index: ', event.newPosition.columnIndex);
    // console.log('new column index: ', event.newPosition.cardIndex);

    if (oldColumnIndex === newColumnIndex) {
      // moveCardWithinSameColumn()
      console.log('the same column! onMoveCard');
    }
  };

  const onDeleteCardEvent = () => {};

  const onEditCardEvent = () => {};

  // Column related events
  const onCreateColumnEvent = () => {};

  const onMoveColumnEvent = () => {};

  const onDeleteColumnEvent = () => {};

  const onEditColumnEvent = () => {};

  console.log('data: ', data);

  React.useEffect(() => {
    console.log('listeners: ', socket.listeners('create_card'));
    console.log('data: ', data);
    if (data) {
      console.log('data gets called');
      setItems(data.Column);
      // console.log('sets columns');
      // socket.on('connect', onConnect);
      // socket.on('disconnect', onDisconnect);
      socket.on('create_card', onCreateCardEvent);
      socket.on('move_card', onMoveCardEvent);
      setIsConnected(true);
    }

    return () => {
      // socket.off('connect', onConnect);
      // socket.off('disconnect', onDisconnect);
      socket.off('create_card', onCreateCardEvent);
      socket.off('move_card', onMoveCardEvent);
      setIsConnected(false);
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="py-4 pl-4 flex gap-4">
        <div className="py-4 pl-4 flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonColumn key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError && error) {
    return <ErrorComponent errorMessage={error.message} />;
  }

  const sortBoardColumnsAndCards = (columns: ColumnType[]): ColumnType[] => {
    if (columns) {
      // Sort Columns by position
      columns.sort((a, b) => a.position - b.position);

      // Sort Cards within each Column by position
      columns.forEach((column) => {
        if (column.Card) {
          column.Card.sort((a, b) => a.position - b.position);
        }
      });
    }

    return columns;
  };

  if (items) {
    return (
      <div className="py-4 pl-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold"> {data!.name} </h1>
        <Board
          items={sortBoardColumnsAndCards(items)}
          setItems={setItems}
          moveCardEvent={moveCardEvent}
          createCardEvent={onCreateCardEvent}
          createColumnEvent={onCreateColumnEvent}
          deleteCardEvent={onDeleteCardEvent}
          deleteColumnEvent={onDeleteColumnEvent}
          editCardEvent={onEditCardEvent}
          editColumnEvent={onEditColumnEvent}
          moveColumnEvent={onMoveColumnEvent}
        />
      </div>
    );
  }
};

export default BoardPage;
