var FindProxyForURL = function(init, profiles) {
    return function(url, host) {
        "use strict";
        var result = init, scheme = url.substr(0, url.indexOf(":"));
        do {
            result = profiles[result];
            if (typeof result === "function") result = result(url, host, scheme);
        } while (typeof result !== "string" || result.charCodeAt(0) === 43);
        return result;
    };
}("+auto", {
    "+auto": function(url, host, scheme) {
        "use strict";
        if (/\.granbluefantasy\.jp$/.test(host)) return "+proxy";
        if (/\.granbluefantasy\.akamaized\.net$/.test(host)) return "+proxy"; //https://prd-game-a1-granbluefantasy.akamaized.net/assets_en/img_mid/sp/assets/npc/m/3040251000_02.jpg
        if (/^gbf\.game-a\.mbga\.jp$/.test(host)) return "+proxy";
        return "DIRECT";
    },
    "+proxy": function(url, host, scheme) {
        "use strict";
        if (/^127\.0\.0\.1$/.test(host) || /^::1$/.test(host) || /^localhost$/.test(host)) return "DIRECT";
        return "HTTPS gbf-proxy.kogane.moe:443";
    }
});
