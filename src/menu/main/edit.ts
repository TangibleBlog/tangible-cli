import * as fs from "fs-extra";
import inquirer from "inquirer";
import {getTitleList, requestToClearCache} from "@/common/common";

export async function editMenu() {
    const pageJsonList = await fs.readJSON("./config/menu.json");
    const question = [
        {
            type: "list",
            name: "selectFile",
            message: "Please select the article to be edited: ",
            choices: getTitleList(pageJsonList)
        }
    ];
    const answers = await inquirer.prompt(question);
    pageJsonList[answers.selectFile] = await editMetadata(pageJsonList[answers.selectFile]);
    await fs.writeJson("./config/menu.json", pageJsonList);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}

async function editMetadata(pageItem: any) {
    const question = [
        {
            type: "input",
            name: "Title",
            message: "Please enter the title of the article:",
            default() {
                return pageItem.Title;
            }
        },
        {
            type: "input",
            name: "URL",
            message: "Please enter the url:",
            default() {
                return pageItem.URL;
            }
        }
    ];
    const answers = await inquirer.prompt(question);
    pageItem.URL = answers.URL;
    pageItem.Title = answers.Title;
    return pageItem;
}
