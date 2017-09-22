import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from "./app/index"
import { WatchFiles } from "./watched-file";

export default class ReactViews extends WatchFiles {
    constructor(viewDir: string) {
        super(viewDir);
    }

    appString = renderToString(<App {...{ name: "Inline cache" }} />);

    // This is render view, similar to component render
    render(name: string, props: any) {

        // Comment the line below and check for performance. Include your view cache logic.
        // this.appString = renderToString(<App {...props} />);

        return new String(this.get(name))
            .replace(/<div id="(root|react-root|react)"><\/div>/g, `<div id="$1">${this.appString}</div>` )
    }
}
