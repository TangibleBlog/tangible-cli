import inquirer from "inquirer";
import * as fs from "fs-extra";
import {setAPIPassword} from "./apipwd";
import {projectSetting} from "./project";
import {authorSetting} from "./author";
import {otherSetting} from "./other";
import {serviceSetting} from "./extend";
import {themeSettings} from "./theme";
import {setRedis} from "./redis";
// noinspection ES6PreferShortImport
import {sleep} from "../common/sleep";

export async function main() {
    const systemConfig = await fs.readJson("./config/system.json");
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Please select the setting you would like to modify:",
            loop: false,
            choices: [
                "Modify project information",
                "Modify author information",
                "Modify other preferences",
                "Set cache service",
                "Set up extended services",
                "Set Theme",
                "Set management API password",
                new inquirer.Separator(),
                "Back"
            ]
        }
    ]);
    let loop = true;
    switch (answers.action) {
        case "Modify project information":
            await projectSetting(systemConfig);
            break;
        case "Modify author information":
            await authorSetting(systemConfig);
            break;
        case "Modify other preferences":
            await otherSetting(systemConfig);
            break;
        case "Set up extended services":
            await serviceSetting(systemConfig);
            break;
        case "Set management API password":
            await setAPIPassword();
            break;
        case "Set Theme":
            while (loop) {
                loop = !await themeSettings();
                console.log();
                await sleep(500);
            }
            break;
        case "Set cache service":
            while (loop) {
                loop = !await setRedis();
                console.log();
                await sleep(500);
            }
            break;
        default:
            return true;
    }
    console.log("The operation is complete, please restart the service to make the configuration take effect.");
    return false;
}
