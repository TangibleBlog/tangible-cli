import inquirer from "inquirer";
import * as fs from "fs-extra";
import {requestToClearCache} from "@/common/common";
import {answerNotNull} from "@/common/validate";

export async function newPage() {
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
            name: "Name",
            message: "Please enter the slug:"
        },
        {
            type: "list",
            name: "Type",
            message: "Please select a page type:",
            choices: ["Markdown", "HTML"]
        },
        {
            type: "editor",
            name: "Content",
            message: "Please enter the text of the article:",
            waitUserInput: true
        }
    ];
    inquirer.registerPrompt("datetime", require("inquirer-datepicker-prompt"));
    const answers = await inquirer.prompt(question);
    if (answers.Name === "") {
        answers.Name = answers.Title;
    }
    let extName = "md";
    if (answers.Type === "HTML") {
        extName = "html";
    }
    const fileName = `./documents/page/${answers.Name}.${extName}`;
    delete answers.Type;
    const content = answers.Content;
    await fs.writeFile(fileName, content);
    await fs.writeJson(`./documents/page/${answers.Name}.json`, answers);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}
