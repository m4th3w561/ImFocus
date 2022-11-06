let URL = window.location.hostname

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if (request.hide) {
        hide()
    } else {
        unHide()
    }
    
});

const hide = () => {
    //send url to background script to black list this url
    blackList(URL)
    addHider()
}

const unHide = () => {
    const blocked = document.getElementById('hider');
    blocked.remove();
    whiteList(URL)
}

const blackList = (url) => {
    chrome.runtime.sendMessage({blockSite: url}, function(response) {
        console.log('call back from content');
    });
}
const whiteList = (url) => {
    chrome.runtime.sendMessage({unBlockSite: url}, function(response) {
        console.log('call back from content');
    });
}

const addHider = () => {
    const blocked = document.createElement('div');
    blocked.id = 'hider'
    blocked.className = 'blocked';
    document.body.appendChild(blocked)
}
// this script is called on load
const checkBlackList = (url) => {
    chrome.runtime.sendMessage({checkBlackList: url}, function(response) { 
        if (!response.isBlackListed) {
            unHide()
        }
        if (response.isBlackListed){
            addHider()
        }
    });
}

checkBlackList(URL)
