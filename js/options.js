$(document).ready(function () {
        restore_options(function(options){
                if (options["TAB_KEEP"] == "recent")
                                document.getElementById("recent").checked = true;
        });
        $("#btnSave").click(function () {
                var options = {
                        TAB_KEEP: "oldest",
                }
                if (document.getElementById("oldest").checked) {
                        options["TAB_KEEP"] = "oldest";
                } else {
                        options["TAB_KEEP"] = "recent";
                }
                save_options(options);
        });
});


