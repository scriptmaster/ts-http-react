import * as fs from 'fs';
import * as path from 'path';


/*

Usage:

```js
let wf = new WatchedFile('./public/index.html')
```

and everywhere else:

    `wf.contents`

*/

export class WatchedFile {
    contents: String;

    constructor(private file: string) {
        this.loadFile();

        fs.watchFile(file, {persistent: true, interval: 60000}, this.loadFile);
    }

    loadFile(){
        this.contents = (fs.readFileSync(this.file) || '').toString();
    }
}

export class WatchFiles {
    files: any

    constructor(private dir: string) {
        console.log('Watching Directory: ', dir);

        this.files = {};

        fs.readdir(dir, (err, files) => {
            files.map((file) => {
                this.readFile(file);
            })

            console.log(`Loaded contents of files: ${files.length} in ${dir}`);
        });

        fs.watch(dir, (eventType, filename) => {
            if(eventType == 'change' && filename) {
                this.readFile(filename);
            }
        });
    }

    private readFile(filename: string) {
        let name = filename.substring(0, filename.length - path.extname(filename).length);
        this.files[name] = fs.readFileSync(path.join(this.dir, filename)) || '';
    }

    get(name: string): String | Buffer {
        return this.files[name.replace(/\..+$/, '')];
    }

}
