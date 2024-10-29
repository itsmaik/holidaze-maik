import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import  AuthProvider  from "@context/AuthContext";


const queryClient = new QueryClient();

export default function AppProviders ({children}) {
  return(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          {children}
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};
