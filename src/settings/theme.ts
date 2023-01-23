import inquirer from "inquirer";
import * as fs from "fs-extra";
import {main} from "./main";
import {setTheme} from "./theme/setTheme";
import {setParam} from "./theme/setParam";
import {removeTheme} from "./theme/removeTheme";

export async function themeSettings() {
    const systemConfig = fs.readJSONSync("./config/system.json");
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please choose what you want to do:",
            choices: [
                "Set Theme",
                "Modify theme parameters",
                "Remove Theme",
                new inquirer.Separator(),
                "Back"
            ]
        }
    ]);
    switch (answers.action) {
        case "Set Theme":
            await setTheme(systemConfig);
            break;
        case "Modify theme parameters":
            await setParam(systemConfig);
            break;
        case "Remove Theme":
            await removeTheme(systemConfig);
            break;
        default:
            return true;
    }
    return false;
}
