import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header';
import SideBar from './components/side-bar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';

const App: React.FC = () => {
  return (
    <div className="">
      <Header />
      <div className="px-6 py-4flex ">
        <ResizablePanelGroup direction={'horizontal'}>
          <ResizablePanel defaultSize={25} minSize={15}>
            <SideBar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75} minSize={40}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default App;
