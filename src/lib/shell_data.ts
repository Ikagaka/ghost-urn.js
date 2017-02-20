import {DataHandlerBase} from "./data_handler_base";
import {
    UkagakaDescriptInfo,
    UkagakaDescriptInfoParser,
} from "ukagaka-install-descript-info";
import {SurfaceInfoParser, SurfaceInfo} from "ukagaka-surface-info";
import {SurfaceTableInfoParser, SurfaceTableInfo} from "ukagaka-surface-table-info";


export class ShellData extends DataHandlerBase {
    static async buildFromDirectory(directory: {[path: string]: Uint8Array}): Promise<ShellData> {
        return Promise.all([
            ShellData.getDescript(directory),
            ShellData.getImages(directory),
            ShellData.getSurfaces(directory),
            ShellData.getSurfaceTable(directory),
        ]).then((args) => {
            return new ShellData(args[0], args[1], args[2], args[3]);
        });
    }

    static getDescript(directory: {[path: string]: any}) {
        return new UkagakaDescriptInfoParser("shell").parse(ShellData.findDescript(directory)).result;
    }

    static selectSurfacePaths(directory: {[path: string]: any}) {
        return Object.keys(directory).filter((path) => /(?:^|\b)surfaces.*\.txt$/i.test(path));
    }

    static selectSurfaces(directory: {[path: string]: Uint8Array}) {
        const selected: {[path: string]: Uint8Array} = {};
        for (const path of ShellData.selectSurfacePaths(directory).sort()) {
            selected[path] = directory[path];
        }
        return selected;
    }

    static getSurfaces(directory: {[path: string]: Uint8Array}) {
        return SurfaceInfoParser.parse(ShellData.selectSurfaces(directory));
    }

    static selectSurfaceTablePaths(directory: {[path: string]: any}) {
        return Object.keys(directory).filter((path) => /(?:^|\b)surfacetable.*\.txt$/i.test(path));
    }

    static selectSurfaceTables(directory: {[path: string]: Uint8Array}) {
        const selected: {[path: string]: Uint8Array} = {};
        for (const path of ShellData.selectSurfaceTablePaths(directory).sort()) {
            selected[path] = directory[path];
        }
        return selected;
    }

    static getSurfaceTable(directory: {[path: string]: Uint8Array}): SurfaceTableInfo {
        return SurfaceTableInfoParser.parse(ShellData.selectSurfaceTables(directory));
    }

    readonly descript: UkagakaDescriptInfo.Shell;

    readonly surfaceResources: any;

    readonly surfaceInfo: SurfaceInfo;

    readonly surfaceTableInfo: SurfaceTableInfo;

    alias: { [name: string]: number };

    constructor(descript: UkagakaDescriptInfo.Shell, surfaceResources: any, surfaceInfo: SurfaceInfo, surfaceTableInfo: SurfaceTableInfo) {
        super();
        this.descript = descript;
        this.surfaceResources = surfaceResources;
        this.surfaceInfo = surfaceInfo;
        this.surfaceTableInfo = surfaceTableInfo;
    }

    surface(id: number) {
        return new Image();
    }

    unload() {

    }
}
