// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


/*Set a browser action on click listener*/
chrome.browserAction.onClicked.addListener(function (tab) {
    var unique = [];

    /*Asynchronous call to retrieve the tabs opened in this window */

    chrome.tabs.query({currentWindow: true}, function (tabs) {
        var i,element;

        for(i=0;i<tabs.length;i++){
            element = tabs[i];
            if(unique.indexOf(element.url) == -1)
                unique.push(element.url);
            else
                chrome.tabs.remove(element.id,function(){});
        }
    });


});