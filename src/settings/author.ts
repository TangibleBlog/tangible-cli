import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function authorSetting(systemConfig: any) {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please select the item you want to set:",
            choices: [
                "Name", "Introduction", "Avatar"
            ]
        }
    ]);
    if (answers.action !== "Avatar") {
        systemConfig = await changeValue(systemConfig, answers);
    } else {
        const actionResult = await inquirer.prompt([{
            type: "confirm",
            name: "confirm",
            message: "Use Gravatar?",
            default: false
        }]);
        if (actionResult.confirm) {
            systemConfig = await getGravatar(systemConfig);
        } else {
            systemConfig = await changeValue(systemConfig, answers);
        }
    }

    fs.writeJsonSync("./config/system.json", systemConfig);
}

async function changeValue(systemConfig: any, answers: any) {
    const actionResult = await inquirer.prompt([
        {
            type: "input",
            name: "configValue",
            message: `Please enter the ${answers.action}:`,
            default() {
                return systemConfig.Author[answers.action];
            }
        }
    ]);
    systemConfig.Author[answers.action] = actionResult.configValue;
    return systemConfig;
}

async function getGravatar(systemConfig: any) {
    const actionResult = await inquirer.prompt([
        {
            type: "input",
            name: "email",
            message: "Please enter your email address:"
        }
    ]);
    console.log("Getting Gravatar image address, please wait...");
    // eslint-disable-next-line no-undef
    const response = await fetch(`https://en.gravatar.com/${actionResult.email}.json`);
    const responseJson = await response.json();
    systemConfig.Author.Avatar = responseJson.entry[0].thumbnailUrl;
    return systemConfig;
}
