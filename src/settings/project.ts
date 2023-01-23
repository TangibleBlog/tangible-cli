import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function projectSetting(systemConfig: any) {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please select the item you want to set:",
            choices: [
                "Name", "URL", "Description"
            ]
        }
    ]);
    const actionResult = await inquirer.prompt([
        {
            type: "input",
            name: "configValue",
            message: `Please enter the ${answers.action}:`,
            default() {
                return systemConfig.Project[answers.action];
            }
        }
    ]);
    systemConfig.Project[answers.action] = actionResult.configValue;
    fs.writeJsonSync("./config/system.json", systemConfig);
}
