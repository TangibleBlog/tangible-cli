import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function removeTheme(systemConfig: any) {
    const themeList: any[] = getLocationDir();
    if (themeList.includes(systemConfig.Theme)) {
        themeList[themeList.indexOf(systemConfig.Theme)] = {
            name: systemConfig.Theme,
            disabled: "Currently in use"
        };
    }
    const question = [
        {
            type: "list",
            name: "select",
            message: "Please select the theme you want to remove:",
            choices: themeList
        }
    ];
    const answers = await inquirer.prompt(question);
    const themeConfigFile = `./config/template/${answers.select}.json`;
    const themePath = `./templates/${answers.select}`;
    if (fs.existsSync(themeConfigFile)) {
        fs.rmSync(themeConfigFile);
    }
    fs.rmSync(themePath, {recursive: true});
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
