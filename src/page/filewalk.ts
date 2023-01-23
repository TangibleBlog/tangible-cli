import * as fs from "fs-extra";

export function getLocationJson() {
    const result: string[] = [];
    const files = fs.readdirSync("./documents/page/");
    files.forEach((item) => {
        const stat = fs.lstatSync(`./documents/page/${item}`);
        if (stat.isFile() && item.endsWith(".json")) {
            result.push(item.replaceAll(".json", ""));
        }
    });
    return result;
}
