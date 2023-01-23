import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function setTheme(systemConfig:any) {
    const question = [
        {
            type: "list",
            name: "select",
            message: "Please select the theme you want to use:",
            choices: getLocationDir(),
            default() {
                return systemConfig.Theme;
            }
        }
    ];
    const answers = await inquirer.prompt(question);
    systemConfig.Theme = answers.select;
    fs.writeJsonSync("./config/system.json", systemConfig);
}

function getLocationDir() {
    const dir: string[] = [];
    const files = fs.readdirSync("./templates/");
    files.forEach((item) => {
        const stat = fs.lstatSync(`./templates/${item}`);
        if (stat.isDirectory()) {
            dir.push(item);
        }
    });
    return dir;
}
