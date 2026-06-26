// ===============================
// Dynamic QR System V2
// ===============================

// YOUR APPS SCRIPT URL
const sheetURL =
"https://script.google.com/macros/s/AKfycbz7i_0eSB34jsXN-r8aQurwulksa30ODpaEsM1LDESV4hbon8xEVLkSfVILZtQnTQ1fbA/exec";

// Get Employee ID from URL
const params = new URLSearchParams(window.location.search);
const employeeID = params.get("id");

// If ID is missing
if (!employeeID) {
    document.body.innerHTML = "<h2 style='text-align:center;color:red;'>Invalid QR Code</h2>";
}

// Load Data
fetch(sheetURL)
.then(res => res.json())
.then(data => {

    const person = data.find(row => row.ID === employeeID);

    if(!person){
        document.body.innerHTML="<h2 style='text-align:center;color:red;'>No Record Found</h2>";
        return;
    }

    // Basic Details

    document.getElementById("empName").innerText=person["Name"] || "";

    document.getElementById("empCompany").innerText=person["Company Name"] || "";

    document.getElementById("id").innerText=person["ID"] || "";

    document.getElementById("location").innerText=person["Location"] || "";

    document.getElementById("address").innerText=person["Address"] || "";

    document.getElementById("gp").innerText=person["GP No"] || "";

    document.getElementById("gender").innerText=person["Gender"] || "";

    document.getElementById("age").innerText=person["Age"] || "";



    // Medical

    document.getElementById("blood").innerText=person["Blood Group"] || "";

    document.getElementById("height").innerText=person["Height"] || "";

    document.getElementById("weight").innerText=person["Weight"] || "";

    document.getElementById("sugar").innerText=person["Blood Sugar"] || "";

    document.getElementById("bp").innerText=person["Blood Pressure"] || "";

    document.getElementById("operation").innerText=person["Major Operations"] || "None";



    // Emergency

    document.getElementById("emgName").innerText=person["Emergency Contact Name"] || "";

    document.getElementById("emgRelation").innerText=person["Emergency Contact Relation"] || "";

    document.getElementById("emgNumber").innerHTML=
    `<a href="tel:${person["Emergency Contact"]}">${person["Emergency Contact"]}</a>`;


    // Site Incharge

    document.getElementById("siteName").innerText=person["Site Incharge Name"] || "";

    document.getElementById("siteNumber").innerHTML=
    `<a href="tel:${person["Site Incharge Number"]}">${person["Site Incharge Number"]}</a>`;


    // Insurance

    document.getElementById("insurance").innerText=
    person["Insurance Number"] || "";

    document.getElementById("insuranceDate").innerText=
    person["Insurance Valid Till"] || "";


    // Training Table

    let tbody=document.getElementById("trainingTable");

    tbody.innerHTML="";

    let training=person["Training Details"];

    if(training){

        let items=training.split("|");

        items.forEach(item=>{

            let parts=item.split(":");

            let tr=document.createElement("tr");

            let name=parts[0];

            let status=parts[1];

            let icon=status &&
            status.trim().toLowerCase()=="yes"
            ? "<span class='yes'>✔ Attended</span>"
            : "<span class='no'>✘ Not Attended</span>";

            tr.innerHTML=`
                <td>${name}</td>
                <td>${icon}</td>
            `;

            tbody.appendChild(tr);

        });

    }

})

.catch(err=>{

    console.log(err);

    document.body.innerHTML="<h2 style='text-align:center;color:red;'>Unable to Load Data</h2>";

});