import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import { ToastContainer } from "react-toastify";

import DashboardPage from "./pages/DashboardPage";

import "../src/style/App.scss";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js">
          <div className="App">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
            </Routes>
          </div>
          <ToastContainer />
        </Worker>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
