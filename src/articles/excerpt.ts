import jsdom from "jsdom";
import {marked} from "marked";

export function getArticleExcerpt(rawMarkdown: string) {
    const {JSDOM} = jsdom;
    const dom = new JSDOM(`<div id='content'>${marked.parse(rawMarkdown)}</div>`);
    let plainText = dom.window?.document?.getElementById("content")?.textContent;
    if (plainText) {
        plainText = plainText.replaceAll("\n", "");
        return plainText.slice(0, 140);
    }
    return "";
}
