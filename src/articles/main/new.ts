import inquirer from "inquirer";
import {v4 as uuidv4} from "uuid";
import * as fs from "fs-extra";
import {requestToClearCache} from "@/common/common";
import {answerNotNull} from "@/common/validate";
import {getArticleExcerpt} from "../excerpt";

export async function newArticles() {
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
            message: "Please enter the slug:",
            validate(answers: string) {
                return answerNotNull(answers);
            }
        },
        {
            type: "input",
            name: "Image",
            message: "Please enter the URL of the head image:"
        },
        {
            type: "datetime",
            name: "Time",
            message: "Please enter a release time:",
            format: ["mm", "/", "dd", "/", "yyyy", " ", "hh", ":", "MM", " ", "TT"]
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
    const uuid = uuidv4();
    const fileName = `./documents/post/${uuid}.md`;
    const content = answers.Content;
    await fs.writeFile(fileName, content);
    const pageJsonList = await fs.readJSON("./documents/index.json");
    answers.Time = Math.floor(new Date(answers.Time).getTime() / 1000);
    answers.UUID = uuid;
    if (answers.Name === "") {
        answers.Name = answers.Title;
    }
    answers.Excerpt = getArticleExcerpt(content);
    pageJsonList.unshift(answers);
    await fs.writeJson("./documents/index.json", pageJsonList);
    console.log("Successful operation!");
    await requestToClearCache(fs.readJSONSync("./config/system.json"));
}
