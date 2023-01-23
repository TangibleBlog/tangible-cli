import inquirer from "inquirer";
import * as process from "process";
import * as fs from "fs-extra";
import * as articles from "./articles/main";
import * as menu from "./menu/main";
import * as settings from "./settings/main";
import * as pages from "./page/main";
import {sleep} from "./common/sleep";

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                "Manage articles",
                "Manage individual pages",
                "Manage menu items",
                "System settings",
                new inquirer.Separator(),
                "Exit"
            ]
        }
    ]);
    let loop = true;
    switch (answers.action) {
        case "Manage articles":
            while (loop) {
                // eslint-disable-next-line no-await-in-loop
                loop = !await articles.main();
            }
            break;
        case "Manage individual pages":
            while (loop) {
                // eslint-disable-next-line no-await-in-loop
                loop = !await pages.main();
            }
            break;
        case "Manage menu items":
            while (loop) {
                // eslint-disable-next-line no-await-in-loop
                loop = !await menu.main();
            }
            break;
        case "System settings":
            while (loop) {
                loop = !await settings.main();
            }
            break;
        default:
            process.exit(0);
            break;
    }
}

if (process.env.NODE_ENV === "DEBUG") {
    process.chdir("./runtime/");
}

async function main() {
    if (!fs.existsSync("./config/system.json")) {
        console.log("Please initialize TangibleBlog before starting this program.");
        return;
    }
    // noinspection InfiniteLoopJS
    while (true) {
        await mainMenu();
        console.log();
        await sleep(500);
    }
}

// noinspection JSIgnoredPromiseFromCall
main();
