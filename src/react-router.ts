import * as http from 'http';
import ReactViews from "./react-views";

export default class ReactRouter {
    public startupSegment = 'office';

    constructor(viewDir: string) {
        this.views = new ReactViews(viewDir);
    }

    views: ReactViews;
    
    router(req: http.IncomingMessage, res: http.ServerResponse) {
        
        var segments = new String(req.url).split('/');

        // Startup Segment
        if(!segments[1]) segments[1] = this.startupSegment;

        let s1 = segments[1];

        if(/\.(js|css|svg|png|jpe?g|gif|woff|eot|ico)$/.test(s1)) {
            let contents = this.views.get(s1);
            if(contents) res.write(contents);
        } else 

        switch(s1) {
            default:
                res.write(this.views.render(s1, { name: "Mongo Model" }));
                // this.loadPageFromMongo();
                break;
        }

        res.end();
    }

}
