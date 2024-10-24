import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  AuthProvider  from "@context/AuthContext";


const queryClient = new QueryClient();

export default function AppProviders ({children}) {
  return(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          {children}
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};
