(()=>{
    const frontend = "index.html";
    const isAndroid = navigator.userAgent.includes("Android");
    const isEdge = navigator.userAgent.includes("Edg/");
    const isFirefox = navigator.userAgent.includes("Firefox/");
    if (isAndroid) {
        location.href = frontend;
        return
    }
    chrome.storage.sync.get(["redirectNewTab"], result=>{
        if (result.redirectNewTab) {
            if (isFirefox) {
                chrome.tabs.getCurrent(tab=>{
                    chrome.tabs.create({
                        url: frontend
                    }, ()=>{
                        chrome.tabs.remove(tab.id)
                    }
                    )
                }
                )
            } else {
                location.href = frontend
            }
        }
    }
    );
    const iconLink = document.createElement("link");
    iconLink.rel = "icon";
    iconLink.href = isEdge ? "images/favicon-newtabpage.png" : "images/Lime_Icon_256x.png";
    document.head.appendChild(iconLink)
}
)();
