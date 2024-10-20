import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const SideBar: React.FC = () => {
  return (
    <aside className="min-w-36 w-full h-screen">
      <div className="flex justify-between items-center py-4 pr-4">
        <h2 className="text-xl font-bold"> Boards </h2>
        <Button variant={'ghost'}>
          <Plus />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <ul>
          <li> Board 1 </li>
          <li> Board 1 </li>
          <li> Board 1 </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
