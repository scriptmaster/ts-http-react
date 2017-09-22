import * as http from 'http';
import { WatchFiles } from "./watched-file";

export default class App {
    public startupSegment = 'office';

    constructor(public port: number, viewDir: string = './public') {
        let server = http.createServer(this.router.bind(this));
        server.listen(port);

        this.views = new WatchFiles(viewDir);
    }

    views: WatchFiles;

    router(req: http.IncomingMessage, res: http.ServerResponse) {
        
        var segments = new String(req.url).split('/');

        // Startup Segment
        if(!segments[1]) segments[1] = this.startupSegment;

        switch(segments[1]) {
            case "favicon.ico":
                break;
            default:
                res.write(this.views.get('index'));
                // this.loadPageFromMongo();
                break;
        }

        res.end();
    }

    loadPageFromMongo() {
        // 
    }

}
