import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function serviceSetting(systemConfig: any) {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please select the item you want to set:",
            choices: [
                "Control", "Comment"
            ]
        }
    ]);
    const actionResult = await inquirer.prompt([
        {
            type: "confirm",
            name: "configValue",
            message: `Please choose whether to use ${answers.action}:`,
            default() {
                return systemConfig.Service[answers.action];
            }
        }
    ]);
    systemConfig.Service[answers.action] = actionResult.configValue;
    fs.writeJsonSync("./config/system.json", systemConfig);
}
