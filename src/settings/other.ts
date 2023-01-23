import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function otherSetting(systemConfig: any) {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please select the item you want to set:",
            choices: [
                "Paging", "TimeFormat"
            ]
        }
    ]);
    const actionResult = await inquirer.prompt([
        {
            type: "input",
            name: "configValue",
            message: `Please enter the ${answers.action}:`,
            default() {
                return systemConfig[answers.action];
            }
        }
    ]);
    systemConfig[answers.action] = actionResult.configValue;
    fs.writeJsonSync("./config/system.json", systemConfig);
}
