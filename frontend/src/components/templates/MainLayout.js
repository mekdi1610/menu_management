import React from 'react';

export const MainLayout = ({ sidebar, main }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-1/4 text-white p-4">
        {sidebar}
      </aside>
      <main className="w-3/4 p-8 bg-white">
        {main}
      </main>
    </div>
  );
};
