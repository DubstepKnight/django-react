import React from 'react';
import type { IColumn as ColumnType } from '@/lib/types';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';

interface IColumnTypeProps extends ColumnType {
  children: React.ReactNode;
}

const ColumnShell: React.FC<IColumnTypeProps> = ({ name, children }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-md font-bold"> {name} </h2>
        <Button variant={'ghost'} size={'sm'}>
          <MoreHorizontal />
        </Button>
      </div>
      <div className={`flex flex-col gap-2 min-h-96 h-auto`}>{children}</div>
    </div>
  );
};

export default ColumnShell;
