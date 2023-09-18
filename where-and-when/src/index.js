import { createRoot } from "react-dom/client"
import "./index.css"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter } from "react-router-dom"
import { WhereAndWhen } from "./WhereAndWhen"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <WhereAndWhen />
    </BrowserRouter>
)
