// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


/*Set a browser action on click listener*/
chrome.browserAction.onClicked.addListener(function (tab) {
        if (glob_options["SCHEME"] == "samedomain")
                closeSameDomain();
        else
                closeDuplicate();

});


/*Sending a notification in the content script*/
function sendNotification(message) {

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {type: "notification", msg: message}, function (response) {
                });
                console.log("Sending the notification to content script");
        });
}


function closeDuplicate() {
        /*Asynchronous call to retrieve the tabs opened in this window */

        if (glob_options["TAB_KEEP"] == "oldest") {
                var unique = [];
                chrome.tabs.query({currentWindow: true}, function (tabs) {
                        var i, element;

                        for (i = 0; i < tabs.length; i++) {
                                element = tabs[i];
                                if (unique.indexOf(element.url) == -1)
                                        unique.push(element.url);
                                else
                                        chrome.tabs.remove(element.id, function () {
                                        });
                        }

                        setTimeout(function () {
                                sendNotification((tabs.length - unique.length) + " tabs closed ")
                        }, 1000);

                });
        } else if (glob_options["TAB_KEEP"] == "recent") {
                var unique = {}
                chrome.tabs.query({currentWindow: true}, function (tabs) {
                        var i, element;
                        for (i = 0; i < tabs.length; i++) {
                                element = tabs[i];
                                if (unique[element.url] == undefined)
                                        unique[element.url] = element;
                                else {
                                        var temp = unique[element.url].id
                                        if (element.id < temp) {
                                                unique[element.url] = element;
                                                chrome.tabs.remove(temp.id, function () {
                                                });
                                        } else {
                                                chrome.tabs.remove(element.id, function () {
                                                });
                                        }
                                }
                        }

                        setTimeout(function () {
                                sendNotification((tabs.length - unique.length) + " tabs closed ")
                        }, 1000);

                });
        }


}


function closeSameDomain() {

        /*Asynchronous call to retrieve the tabs opened in this window */
        if (glob_options["TAB_KEEP"] == "oldest") {
                var unique = [];
                chrome.tabs.query({currentWindow: true}, function (tabs) {
                        var i, element, domain;
                        for (i = 0; i < tabs.length; i++) {
                                element = tabs[i];
                                console.log(tabs[i].id + " " + tabs[i].title)
                                domain = extractDomain(element.url);
                                if (unique.indexOf(domain) == -1)
                                        unique.push(domain);
                                else
                                        chrome.tabs.remove(element.id, function () {
                                        });
                        }

                        setTimeout(function () {
                                sendNotification((tabs.length - unique.length) + " tabs closed ")
                        }, 1000);
                });
        } else if (glob_options["TAB_KEEP"] == "recent") {
                var unique = {}
                chrome.tabs.query({currentWindow: true}, function (tabs) {
                        var i, element, domain;
                        for (i = 0; i < tabs.length; i++) {
                                element = tabs[i];
                                domain = extractDomain(element.url);
                                if (unique[domain] == undefined)
                                        unique[domain] = element;
                                else {
                                        var temp = unique[domain].id
                                        if (element.id < temp) {
                                                unique[domain] = element;
                                                chrome.tabs.remove(temp.id, function () {
                                                });
                                        } else {
                                                chrome.tabs.remove(element.id, function () {
                                                });
                                        }
                                }
                        }

                        setTimeout(function () {
                                sendNotification((tabs.length - unique.length) + " tabs closed ")
                        }, 1000);

                });
        }

}


function extractDomain(url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) aFnd get domain
        if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
        }
        else {
                domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];
        return domain;
}


