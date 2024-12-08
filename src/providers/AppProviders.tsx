import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@context/AuthContext";
import ModalProvider from "@context/ModalContext";

const queryClient = new QueryClient();

export default function AppProviders({ children }: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Router>{children}</Router>

          <Toaster position='top-center' reverseOrder={false} />
        </ModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
