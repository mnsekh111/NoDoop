/**
 * Created by mnsekh111 on 2/17/2016.
 */
console.log("Content script loaded");


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.type == "notification"){
        showNotification(message.msg);
        console.log("Message received "+message.msg);
    }
});


function showNotification(message) {
    toastr.info(message);
}
