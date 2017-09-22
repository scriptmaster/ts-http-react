import * as http from 'http';

export default class App {

    public startupSegment = 'office';

    constructor(public port: number) {
        let server = http.createServer(this.router.bind(this));
        server.listen(port);
    }

    router(req: http.IncomingMessage, res: http.ServerResponse) {
        // if(res != null) res.end('ok'); // # # 

        var segments = new String(req.url).split('/');

        // Startup Segment
        if(!segments[1]) segments[1] = this.startupSegment;

        switch(segments[1]) {
            case "favicon.ico":
                break;
            default:
                // mvc 
                //let controller = this.loadController(segments, res);
                // console.log('router', controller);
                // let action = this.action(segments, controller, res);
                break;
        }

        res.end();
    }

    requires: any = {};

    requireOnce(path: string) {
        if (!this.requires[path]) {
            console.log('Requiring ' + path);
            this.requires[path] = require(path);
        }
        return this.requires[path];
    }

    loadController(segments: string[], res: http.ServerResponse): any {
        let path = './controllers/' + segments[1];
        try {
            let ctrl = this.requireOnce(path);
            // console.log('ctrl', ctrl);
            // console.log( 1, ctrl );
            // console.log( new ctrl )
            // return new (<typeof IController>ctrl)();
        } catch(e) {
            console.log(e);
            try {
                res.statusCode = 404;
                let path = './controllers/notfound';
                let ctrl = this.requireOnce(path);
                return new (<any>ctrl)();
            } catch(e2) {
                res.write('404');
                return null;
            }
        }
    }


    action(segments: string[], controller: any, res: http.ServerResponse) {
        controller.response = res;
        controller.segments = segments; // .slice(2)
        controller.action = segments[2];
        controller.id = segments[3];

        console.log(controller.get, controller['get']);
        // controller.get()
    }


}


export interface IController {
    response: http.ServerResponse;
    segments: string[];
    action: string;
    id: string;

    get(): any;
    //post(): any;
    //put(): any;
    //delete(): any;
}
