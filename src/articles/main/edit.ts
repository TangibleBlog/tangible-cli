import * as fs from "fs-extra";
import inquirer from "inquirer";
import { getTitleList, requestToClearCache} from "@/common/common";
import {getArticleExcerpt} from "../excerpt";

export async function editArticles() {
    const pageJsonList = await fs.readJSON("./documents/index.json");
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
    const fileName = `./documents/post/${pageJsonList[answers.selectFile].UUID}.md`;
    const documentRaw = fs.readFileSync(fileName, {encoding: "utf-8"});
    const content = await UserEditorInput(documentRaw);
    await fs.writeFile(fileName, content);
    pageJsonList[answers.selectFile].Excerpt = getArticleExcerpt(documentRaw);
    await fs.writeJson("./documents/index.json", pageJsonList);
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
        },
        {
            type: "input",
            name: "Image",
            message: "Please enter the URL of the head image:",
            default() {
                return pageItem.Image;
            }
        },
        {
            type: "datetime",
            name: "Time",
            message: "Please enter a release time:",
            format: ["mm", "/", "dd", "/", "yyyy", " ", "hh", ":", "MM", " ", "TT"],
            initial: new Date(pageItem.Time * 1000)
        }
    ];
    inquirer.registerPrompt("datetime", require("inquirer-datepicker-prompt"));
    const answers = await inquirer.prompt(question);
    pageItem.Name = answers.Name;
    pageItem.Title = answers.Title;
    pageItem.Image = answers.Image;
    pageItem.Time = Math.floor(new Date(answers.Time).getTime() / 1000);
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
