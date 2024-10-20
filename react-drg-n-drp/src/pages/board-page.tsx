import React from 'react';
import { getBoardById } from '@/lib/requests';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Board from '@/components/board';

const BoardPage: React.FC = () => {
  const { boardId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['board'],
    queryFn: () => getBoardById(boardId!),
  });

  if (isLoading) {
    return <div className="py-4 pl-4 flex flex-col"> isLoading... </div>;
  }

  if (isError) {
    return <div className="py-4 pl-4 flex flex-col"> {error.message} </div>;
  }

  return (
    <div className="py-4 pl-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold"> {data.name} </h1>
      <Board {...data} />
    </div>
  );
};

export default BoardPage;
