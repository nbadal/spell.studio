import * as fs from "fs";
import axios from "axios";
import {Entry, Parse} from "unzipper";
import * as path from "path";
import {generateFonts} from "@momentum-ui/webfonts-generator";

generateFont().then(_ => {
    console.log("Job Done.");
});

async function cleanup(extractFolder: string, fontFolder: string) {
    return Promise.all(Array.of(extractFolder, fontFolder).map(async fileToDelete => {
        let exists = fs.existsSync(fileToDelete)
        if (exists) {
            console.log("Deleting " + fileToDelete)
            await fs.promises.rmdir(fileToDelete, {recursive: true});
        }
    }))
}

async function generateFont() {
    let zipUrl = "https://game-icons.net/archives/svg/zip/000000/transparent/game-icons.net.svg.zip";
    let zipPath = "./build/iconfont/svgs.zip";
    let extractFolder = "./build/iconfont/svg/";
    let fontFolder = "./build/iconfont/font/";
    let fontName = "icons";
    let fontDestination = "./web/src/gen/font/"

    console.log("Cleaning old folders.")
    await cleanup(extractFolder, fontFolder);

    console.log("Starting download.")
    await downloadZip(zipUrl, zipPath)

    console.log("Extracting icons.")
    await extractIcons(zipPath, extractFolder)

    console.log("Generating font.")
    await makeFont(extractFolder, fontFolder, fontName);

    console.log("Moving font into project.")
    await fs.promises.mkdir(fontDestination, {recursive: true});
    await fs.promises.copyFile(fontFolder + fontName + ".json", fontDestination + "icons.json")
    await fs.promises.copyFile(fontFolder + fontName + ".woff", fontDestination + "icons.woff");
}

async function downloadZip(url: string, zipPath: string) {
    await fs.promises.mkdir(path.dirname(zipPath), {recursive: true});
    const writer = fs.createWriteStream(zipPath)

    console.log("Getting file.")
    let response = await axios({
        method: 'get',
        url: url,
        responseType: 'stream',
    });

    console.log("Writing file.")
    return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error: Error | undefined = undefined;
        writer.on('error', err => {
            error = err;
            writer.close();
            reject(err);
        });
        writer.on('close', () => {
            if (!error) {
                resolve(true);
            }
        });
    });
}

async function extractIcons(zipPath: string, outputFolderPath: string, nameList?: string[]) {
    await fs.promises.mkdir(outputFolderPath, {recursive: true});

    const nameDupes = new Set<string>();

    // Find dupes first.
    let iconCount = 0;
    const iconNames = new Set<string>();
    await fs.createReadStream(zipPath).pipe(Parse()).on('entry', (entry: Entry) => {
        let name = path.basename(entry.path);
        if (name.includes(".svg")) {
            if (iconNames.has(name)) {
                nameDupes.add(name);
            } else {
                iconNames.add(name);
            }
            iconCount++;
        }
        entry.autodrain();
    }).promise();

    console.log(`Found ${iconCount} icons`);
    console.log(`Found ${nameDupes.size} duplicate icons`);

    // Extract!
    await fs.createReadStream(zipPath).pipe(Parse()).on('entry', (entry: Entry) => {
        let author = path.dirname(entry.path).split(path.sep).pop();
        let svgName = path.basename(entry.path);
        if (svgName.includes(".svg")) {
            if (nameDupes.has(svgName)) {
                // Prepend author names to BOTH dupes
                svgName = author+"-"+svgName;
            }

            let iconName = path.basename(svgName, ".svg");
            if (nameList == undefined || nameList.includes(iconName)) {
                let outputFilePath = outputFolderPath+svgName;
                console.log("Extracting " + svgName)
                entry.pipe(fs.createWriteStream(outputFilePath))
                    .on('error', err => {
                        console.error(`Error with ${outputFilePath}: ${err}`)
                    })
            } else {
                entry.autodrain();
            }
        } else {
            entry.autodrain();
        }
    }).promise();
}

async function makeFont(svgFolderPath: string, fontFolderPath: string, fontName: string) {
    let results = await generateFonts(fontName, svgFolderPath + "*", fontFolderPath, {})
    let lookup: {[name: string]: string} = {}

    results.glyphsData.reduce((map, glyph) => {
        map[glyph.name] = glyph.unicode;
        return map;
    }, lookup)

    return fs.promises.writeFile(fontFolderPath+fontName+".json", JSON.stringify(lookup));
}
