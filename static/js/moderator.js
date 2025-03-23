document.addEventListener("DOMContentLoaded", function () {
    function showActionForm() {
        let action = document.getElementById("actionSelect").value;
        
        let enableDisableForm = document.getElementById("enableDisableForm");
        let viewStudentForm = document.getElementById("viewStudentForm");
        let studentInfo = document.getElementById("studentInfo");

        enableDisableForm.style.display = "none";
        viewStudentForm.style.display = "none";
        studentInfo.style.display = "none";

        if (action === "enable_disable") {
            enableDisableForm.style.display = "block";
        } else if (action === "view") {
            viewStudentForm.style.display = "block";
        }
    }

    document.getElementById("actionSelect").addEventListener("change", showActionForm);
});
