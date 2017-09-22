import * as http from 'http';
import ReactRouter from "./react-router";

export default class App extends ReactRouter {
    public startupSegment = 'office';

    constructor(public port: number, viewDir: string = './public') {
        super(viewDir);

        let server = http.createServer(this.router.bind(this));
        server.listen(port);
    }

}
