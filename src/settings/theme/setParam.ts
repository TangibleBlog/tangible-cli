import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function setParam(systemConfig: any) {
    const themeConfigFile = `./config/template/${systemConfig.Theme}.json`;
    if (!fs.existsSync(themeConfigFile)) {
        console.error("The currently selected theme has no profile.");
        return;
    }
    const themeConfig = fs.readJSONSync(themeConfigFile);
    const keys = Object.keys(themeConfig);
    if (keys.length === 0) {
        console.error("The currently selected theme has no profile.");
        return;
    }
    const question = [
        {
            type: "list",
            name: "select",
            message: "Please select the item you want to set:",
            choices: keys
        }
    ];
    const answers = await inquirer.prompt(question);

    const actionResult = await inquirer.prompt([
        {
            type: "input",
            name: "configValue",
            message: `Please enter the ${answers.select}:`,
            default() {
                return themeConfig[answers.select];
            }
        }
    ]);
    themeConfig[answers.select] = actionResult.configValue;
    fs.writeJsonSync(themeConfigFile, themeConfig);
}
