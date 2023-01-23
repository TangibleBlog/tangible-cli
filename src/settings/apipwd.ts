import * as fs from "fs-extra";
import inquirer from "inquirer";
import * as CryptoJS from "crypto-js";

export async function setAPIPassword() {
    const controlConfig = await fs.readJson("./config/control.json");
    const requireLetterAndNumber = (value: string) => {
        if (/\w/.test(value) && /\d/.test(value)) {
            return true;
        }

        return "Password need to have at least a letter and a number";
    };

    const question = [
        {
            type: "password",
            message: "Please enter the control api password: ",
            name: "password",
            validate: requireLetterAndNumber
        }
    ];
    const answers = await inquirer.prompt(question);
    controlConfig.Password = CryptoJS.HmacSHA512(answers.password, "T1mg1bl4bl0g").toString(CryptoJS.enc.Hex);
    await fs.writeJson("./config/control.json", controlConfig);
}
