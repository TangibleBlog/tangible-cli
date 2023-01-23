export function getTitleList(pageJsonList: any[]) {
    const pageList = [];
    // eslint-disable-next-line guard-for-in
    for (const item in pageJsonList) {
        pageList.push({
            name: pageJsonList[item].Title,
            value: item
        });
    }
    return pageList;
}

export async function requestToClearCache(systemConfig: any) {
    let port = "9000";
    if (systemConfig.ServerAddr) {
        const splitServAddr = systemConfig.ServerAddr.split(":");
        // eslint-disable-next-line prefer-destructuring
        port = splitServAddr[1];
    }
    const requestLocation = `http://127.0.0.1:${port}`;
    try {
        // eslint-disable-next-line no-undef
        await fetch(`${requestLocation}/cache/rss`, {method: "DELETE"});
        console.log("The cache is refreshed.");
    } catch ({message}) {
        console.log(message);
        console.log("Unable to refresh cache.");
    }
}
