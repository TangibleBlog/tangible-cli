import * as fs from "fs-extra";
import inquirer from "inquirer";
import {requestToClearCache} from "@/common/common";
import {getLocationJson} from "@/page/filewalk";

export async function editPage() {
    const pageList = getLocationJson();
    const question = [
        {
            type: "list",
            name: "selectFile",
            message: "Please select the article to be edited: ",
            choices: pageList
        }
    ];
    const answers = await inquirer.prompt(question);
    const metadata = await editMetadata(fs.readJSONSync(`./documents/page/${answers.selectFile}.json`));
    await fs.writeJson("./documents/index.json", metadata);
    let fileName = `./documents/page/${answers.selectFile}.md`;
    if (!fs.existsSync(fileName)) {
        fileName = `./documents/page/${answers.selectFile}.html`;
    }
    const documentRaw = fs.readFileSync(fileName, {encoding: "utf-8"});
    const content = await UserEditorInput(documentRaw);
    await fs.writeFile(fileName, content);
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
            name: "Name",
            message: "Please enter the slug:",
            default() {
                return pageItem.Name;
            }
        }
    ];
    inquirer.registerPrompt("datetime", require("inquirer-datepicker-prompt"));
    const answers = await inquirer.prompt(question);
    pageItem.Name = answers.Name;
    pageItem.Title = answers.Title;
    return pageItem;
}

async function UserEditorInput(rawDocuments: string) {
    const questions = [
        {
            type: "editor",
            name: "content",
            message: "Please enter the content of the article:",
            default() {
                return rawDocuments;
            },
            waitUserInput: true
        }
    ];

    const answer = await inquirer.prompt(questions);
    return answer.content;
}
