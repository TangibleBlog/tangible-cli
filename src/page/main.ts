import inquirer from "inquirer";
import {sleep} from "@/common/sleep";
import {newPage} from "./main/new";
import {editPage} from "./main/edit";
import {deletePage} from "./main/delete";

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
            await newPage();
            break;
        case "Edit":
            await editPage();
            break;
        case "Delete":
            await deletePage();
            break;
        default:
            return true;
    }
    console.log();
    await sleep(500);
    return false;
}
