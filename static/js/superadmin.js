document.addEventListener("DOMContentLoaded", function () {
    const actionSelect = document.getElementById("actionSelect");
    const addModeratorForm = document.getElementById("addModeratorForm");
    const deleteModeratorForm = document.getElementById("deleteModeratorForm");
    const viewAdminsTable = document.getElementById("viewAdminsTable");

    function showActionForm() {
        const action = actionSelect.value;

        addModeratorForm.style.display = "none";
        deleteModeratorForm.style.display = "none";
        viewAdminsTable.style.display = "none";

        if (action === "add") {
            addModeratorForm.style.display = "block";
        } else if (action === "delete") {
            deleteModeratorForm.style.display = "block";
        } else if (action === "view") {
            viewAdminsTable.style.display = "block";
        }
    }

    actionSelect.addEventListener("change", showActionForm);
});
