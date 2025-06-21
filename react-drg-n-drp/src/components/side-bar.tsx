import React from 'react';
import { Button } from './ui/button';
import { AlertCircle, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllBoardsShallow } from '@/lib/requests/board';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Link } from 'react-router-dom';

interface IBoardsList {
  data?: { id: number; name: string }[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const BoardsList: React.FC<IBoardsList> = ({ data, isLoading, isError, error }) => {
  // TODO: show proper error message
  if (isError && error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something wrong has happened.</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-2">
        <li>
          <Skeleton className="w-16 rounded-xl h-4" />
        </li>
        <li>
          <Skeleton className="w-12 rounded-xl h-4" />
        </li>
        <li>
          <Skeleton className="w-24 rounded-xl h-4" />
        </li>
        <li>
          <Skeleton className="w-14 rounded-xl h-4" />
        </li>
      </ul>
    );
  }

  if (data && !isLoading) {
    return (
      <ul>
        {data.map((board) => {
          return (
            <Link key={board.id} to={`boards/${String(board.id)}`} className="hover:underline">
              {board.name}
            </Link>
          );
        })}
      </ul>
    );
  }
};

const SideBar: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['boards-shallow'],
    queryFn: () => getAllBoardsShallow(),
  });

  return (
    <aside className="min-w-36 w-full h-screen">
      <div className="flex justify-between items-center py-4 pr-4">
        <h2 className="text-xl font-bold"> Boards </h2>
        <Button variant={'ghost'}>
          <Plus />
        </Button>
      </div>
      <div className="pr-4">
        <BoardsList data={data} isLoading={isLoading} isError={isError} error={error} />
      </div>
    </aside>
  );
};

export default SideBar;
