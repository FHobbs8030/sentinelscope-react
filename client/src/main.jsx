import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/theme.css";
import "./styles/typography.css";
import "./styles/spacing.css";
import "./styles/layout.css";
import "./styles/responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
