import inquirer from "inquirer";
import * as fs from "fs-extra";
import {requestToClearCache} from "@/common/common";
import {answerNotNull} from "@/common/validate";

export async function newMenu() {
    const question = [
        {
            type: "input",
            name: "Title",
            message: "Please enter the title of the article:",
            validate(answers: string) {
                return answerNotNull(answers);
            }
        },
        {
            type: "input",
            name: "URL",
            message: "Please enter the URL:",
            validate(answers: string) {
                return answerNotNull(answers);
            }
        }
    ];
    const answers = await inquirer.prompt(question);
    const pageJsonList = await fs.readJSON("./config/menu.json");
    pageJsonList.unshift(answers);
    await fs.writeJson("./documents/index.json", pageJsonList);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}
