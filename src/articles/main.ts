import inquirer from "inquirer";
import {sleep} from "@/common/sleep";
import {newArticles} from "./main/new";
import {editArticles} from "./main/edit";
import {deleteArticles} from "./main/delete";

export async function main() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please choose an action:",
            choices: [
                "New", "Edit", "Delete", new inquirer.Separator(),
                "Back"
            ]
        }
    ]);
    switch (answers.action) {
        case "New":
            await newArticles();
            break;
        case "Edit":
            await editArticles();
            break;
        case "Delete":
            await deleteArticles();
            break;
        default:
            return true;
    }
    console.log();
    await sleep(500);
    return false;
}
