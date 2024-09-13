import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { MenuManagement } from "./components/pages/MenuManagement";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <MenuManagement />
        </QueryClientProvider>

      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
