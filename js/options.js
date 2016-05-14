var glob_options = {
        TAB_KEEP: "oldest",
        SCHEME:"sameurl"
};

$(document).ready(function () {
        restore_options(function(options){
                glob_options = options;
                if (glob_options["TAB_KEEP"] == "recent")
                                document.getElementById("recent").checked = true;
                if (glob_options["SCHEME"] == "samedomain")
                        document.getElementById("samedomain").checked = true;
        });
        $("#btnSave").click(function () {

                if (document.getElementById("recent").checked) {
                        glob_options["TAB_KEEP"] = "recent";
                }

                if(document.getElementById("samedomain").checked)
                        glob_options["SCHEME"] = "samedomain";

                save_options(glob_options);
        });
});


