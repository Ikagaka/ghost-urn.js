import {DataHandlerBase} from "./data_handler_base";
import {
    UkagakaDescriptInfo,
    UkagakaDescriptInfoParser,
} from "ukagaka-install-descript-info";

export class BalloonData extends DataHandlerBase {
    static async buildFromDirectory(directory: {[path: string]: Uint8Array}): Promise<BalloonData> {
        return Promise.all([
            BalloonData.getDescript(directory),
            BalloonData.getImages(directory),
            BalloonData.getBalloons(directory),
        ]).then((args) => {
            return new BalloonData(args[0], args[1], args[2]);
        });
    }

    static getDescript(directory: {[path: string]: any}) {
        return new UkagakaDescriptInfoParser("balloon").parse(BalloonData.findDescript(directory)).result;
    }

    static selectBalloonPaths(directory: {[path: string]: any}) {
        return Object.keys(directory).filter((path) => /(?:^|\b)balloon[sk]\d+\.txt$/i.test(path));
    }

    static selectBalloons(directory: {[path: string]: Uint8Array}) {
        const selected: {[path: string]: Uint8Array} = {};
        for (const path of BalloonData.selectBalloonPaths(directory).sort()) {
            selected[path] = directory[path];
        }
        return selected;
    }

    static getBalloons(directory: {[path: string]: Uint8Array}) {
        const ballons = BalloonData.selectBalloons(directory);
        const balloonInfos: {[path: string]: UkagakaDescriptInfo.Balloon} = {};
        for (const path of Object.keys(ballons)) {
            balloonInfos[path] = new UkagakaDescriptInfoParser("balloon").parse(ballons[path]).result;
        }
        return balloonInfos;
    }

    readonly descript: UkagakaDescriptInfo.Balloon;

    readonly surfaceResources: any;

    readonly balloonInfos: {[id: string]: UkagakaDescriptInfo.Balloon};

    alias: { [name: string]: number };

    constructor(descript: UkagakaDescriptInfo.Balloon, surfaceResources: any, balloonInfos: {[id: string]: UkagakaDescriptInfo.Balloon}) {
        super();
        this.descript = descript;
        this.surfaceResources = surfaceResources;
        this.balloonInfos = balloonInfos;
    }

    surface(id: number) {
        return new Image();
    }

    unload() {

    }
}
