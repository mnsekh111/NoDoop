/*
 modules to store and retrieve from chrome.storage
 */

/*
 options is of type Object
 */
function save_options(options) {
        chrome.storage.sync.set({
                TAB_KEEP: options["TAB_KEEP"]
        }, function () {
                // Update status to let user know options were saved.
                alert("Settings saved")
        });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options(callback) {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
                TAB_KEEP: 'oldest'
        }, function (items) {
                var options = {};
                options["TAB_KEEP"] = items.TAB_KEEP;
                callback(options);
        });
}
