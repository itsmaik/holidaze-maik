import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home"

const queryClient = new QueryClient();

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route index element={ <Home /> }></Route>

          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App;