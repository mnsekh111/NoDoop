function save_options() {
    var keepTab;
    if(document.getElementById("oldest").checked)
        keepTab = "oldest"
    else
        keepTab = 'recent'


    chrome.storage.sync.set({
        KEEP_TAB: keepTab,
    }, function () {
        // Update status to let user know options were saved.
        alert("Settings saved")
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        KEEP_TAB: 'oldest',
    }, function (items) {
        alert(items)
    });
}
