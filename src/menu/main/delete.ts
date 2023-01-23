import * as fs from "fs-extra";
import inquirer from "inquirer";
import {getTitleList, requestToClearCache} from "@/common/common";

export async function deleteMenu() {
    const pageJsonList = await fs.readJSON("./config/menu.json");
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
    pageJsonList.splice(answers.selectFile, 1);
    await fs.writeJson("./config/menu.json", pageJsonList);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}
