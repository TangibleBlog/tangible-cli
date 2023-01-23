import * as fs from "fs-extra";
import inquirer from "inquirer";
import {getTitleList, requestToClearCache} from "@/common/common";

export async function deleteArticles() {
    const pageJsonList = await fs.readJSON("./documents/index.json");
    const question = [
        {
            type: "list",
            name: "selectFile",
            message: "Please select the article you want to delete: ",
            choices: getTitleList(pageJsonList)
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
    const fileName = `./documents/post/${pageJsonList[answers.selectFile].UUID}.md`;
    pageJsonList.splice(answers.selectFile, 1);
    await fs.writeJson("./documents/index.json", pageJsonList);
    await fs.rm(fileName);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}
