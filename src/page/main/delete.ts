import * as fs from "fs-extra";
import inquirer from "inquirer";
import {requestToClearCache} from "@/common/common";
import {getLocationJson} from "@/page/filewalk";

export async function deletePage() {
    const pageList = getLocationJson();
    const question = [
        {
            type: "list",
            name: "selectFile",
            message: "Please select the article you want to delete: ",
            choices: pageList
        },
        {
            type: "confirm",
            name: "confirm",
            message: "Are you sure you want to delete this article?",
            default: false
        }

    ];
    const answers = await inquirer.prompt(question);
    if (!answers.confirm) {
        return;
    }
    await fs.rm(`./documents/page/${answers.selectFile}.md`);
    await fs.rm(`./documents/page/${answers.selectFile}.json`);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}
