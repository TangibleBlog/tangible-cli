import inquirer from "inquirer";
import * as fs from "fs-extra";

export async function setRedis() {
    const redisConfigFile = "./config/redis.json";
    const keys: any = ["Host", "Port", "Password", "DB"];
    let config: any;
    if (!fs.existsSync(redisConfigFile)) {
        config = {
            Host: "",
            Port: 6379,
            Password: "",
            DB: 0
        };
    } else {
        config = fs.readJSONSync(redisConfigFile);
    }
    keys.push(new inquirer.Separator());
    keys.push("Back");
    const question = [
        {
            type: "list",
            name: "select",
            message: "Please select the item you want to set:",
            choices: keys
        }
    ];
    const answers = await inquirer.prompt(question);
    if (answers.select === "Back") {
        return true;
    }
    const actionResult = await inquirer.prompt([
        {
            type: "input",
            name: "configValue",
            message: `Please enter the ${answers.select}:`,
            default() {
                return config[answers.select];
            }
        }
    ]);
    config[answers.select] = actionResult.configValue;
    fs.writeJsonSync(redisConfigFile, config);
    return false;
}
