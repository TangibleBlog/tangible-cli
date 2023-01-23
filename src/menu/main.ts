import inquirer from "inquirer";
import {sleep} from "@/common/sleep";
import {newMenu} from "./main/new";
import {editMenu} from "./main/edit";
import {deleteMenu} from "./main/delete";

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
            await newMenu();
            break;
        case "Edit":
            await editMenu();
            break;
        case "Delete":
            await deleteMenu();
            break;
        default:
            return true;
    }
    console.log();
    await sleep(500);
    return false;
}
