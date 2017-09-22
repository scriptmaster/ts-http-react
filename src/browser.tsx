import * as React from "react";
import { render } from "react-dom";

import App from "./app/index";

let props = { name: "Browser rendered." };

render(<App {...props} />, document.getElementById('root'));