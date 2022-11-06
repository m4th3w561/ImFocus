console.log('I am at popup.js');
const block = document.getElementById('block');
const unblock = document.getElementById('unblock');

block.addEventListener('click', () => {
    hideContent()
});
unblock.addEventListener('click', () => unHideContent());

//hide content
const hideContent = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        console.log(window.location.hostname)
        chrome.tabs.sendMessage(tabs[0].id, {hide: true}, function(response) {
            console.log(response?.result);
        });
    });
}
const unHideContent = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {hide: false}, function(response) {
            console.log(response?.result);
        });
    });
}
