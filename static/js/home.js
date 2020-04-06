$("#Ptbody").ready(function () {
    Insert()
});
var SCHEDULES1
var SCHEDULES2
var CSCHEDULES1
var CSCHEDULES2
var FULL_DAYSCRAPED
var FinalDataForSchedule = []
var CFinalDataForSchedule = []
function myfunction(id, selected) {
    document.getElementById(id).value = selected['value']
}

function validateform() {
    var i = 11
    if (document.getElementById(i).value == "") {
        alert("Please Fill Name")
        return false;
    }
    i = 12
    if (document.getElementById(i).value == "") {
        alert("Please select Fill serviceSummary")
        return false;
    }
    i = 1
    if (document.getElementById(i).value == "") {
        alert("Please Fill address")
        return false;
    }
    console.log(FinalDataForSchedule)
    if (document.getElementById("contact").checked == false && FinalDataForSchedule.length == 0) {
        alert("Please select Schedule")
        return false;
    }
    return true;
}

function selecteditschedulechangemonth() {
    arr = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "LAST"]

    var i = 0
    console.log(document.getElementById('selecteditschedulemonth').value)
    string = Delete()
    string += "<div class='form-group'><select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control' value='WEEKLY' ><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY' selected>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select>"
    string += "<select id='selecteditschedulemonth' onchange='selecteditschedulechangemonth()' class='form-control'><option value='Select Period'>Select Period</option>"
    for (i = 0; i < arr.length; i++) {
        if (document.getElementById('selecteditschedulemonth').value.toUpperCase() == arr[i].toUpperCase()) {
            string += "<option value = '" + arr[i] + "' selected>" + arr[i] + "</option>"
        }
        else {
            string += "<option value = '" + arr[i] + "' >" + arr[i] + "</option>"
        }
    }
    string += "</select>"
    arr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]

    string += "<select id='selecteditscheduleday' class='form-control'>"
    for (i = 0; i < arr.length; i++) {
        if (document.getElementById('selecteditscheduleday').value.toUpperCase() == arr[i]) {
            string += "<option value = '" + arr[i] + "' selected>" + arr[i] + "</option>"
        }
        else {
            string += "<option value = '" + arr[i] + "' >" + arr[i] + "</option>"
        }
    }
    string += "</select>"

    string += "<input type='time' name='Start time' id='StartTime'><input type='time' name='End Time' id='EndTime'><input type='button' style='background-color:#6201ea;color:white;' name='Add To the Schedule' id='AddToTheSchedule' value='Add to the Schedule' onclick='add()' required></div>"
    // string += "<input type='button' style='background-color:#6201ea;' value='back' onclick=back()>"

    document.getElementById('EditTd').innerHTML = string
    document.getElementById("StartTime").defaultValue = "00:00";
    document.getElementById("EndTime").defaultValue = "24:00";
}
function closedselecteditschedulechangemonth() {
    arr = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "LAST"]
    var i = 0
    string = DeleteClosed()
    string += "<div class='form-group'><select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control' value='WEEKLY' ><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY' selected>MONTHLY</option><option value='PERMANENTLY_CLOSED'>PERMANENTLY_CLOSED</option></select>"
    string += "<select id='closedselecteditschedulemonth' onchange='closedselecteditschedulechangemonth()' class='form-control'><option value='Select Period'>Select Period</option>"
    for (i = 0; i < arr.length; i++) {
        if (document.getElementById('closedselecteditschedulemonth').value.toUpperCase() == arr[i].toUpperCase()) {
            string += "<option value = '" + arr[i] + "' selected>" + arr[i] + "</option>"
        }
        else {
            string += "<option value = '" + arr[i] + "' >" + arr[i] + "</option>"
        }
    }
    string += "</select>"

    arr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
    string += "<select id='closedselecteditscheduleday'  class='form-control'>"
    for (i = 0; i < arr.length; i++) {
        if (document.getElementById('closedselecteditscheduleday').value.toUpperCase() == arr[i]) {
            string += "<option value = '" + arr[i] + "' selected>" + arr[i] + "</option>"
        }
        else {
            string += "<option value = '" + arr[i] + "' >" + arr[i] + "</option>"
        }
    }
    string += "</select>"

    string += "<input type='time' name='Start time' id='closedStartTime'><input type='time' name='End Time' id='closedEndTime'><input type='button' style='background-color:#6201ea;color:white' name='Add To the Schedule' id='AddToTheSchedule' value='Add to the Schedule' onclick='closedadd()' required></div>"
    // string += "<input type='button' style='background-color:#6201ea;' value='back' onclick=back()>"
    document.getElementById('closedEditTd').innerHTML = string
    document.getElementById("StartTime").defaultValue = "00:00";
    document.getElementById("EndTime").defaultValue = "24:00";
}

function selecteditschedulechangeday() {
    if (document.getElementById('selecteditschedule').value == "MONTHLY") {
        return
    }
    arr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
    var i = 0
    string = Delete()
    string += "<div class='form-group'><select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control' value='WEEKLY' ><option value='WEEKLY' selected>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select>"
    string += "<select id='selecteditscheduleday' onchange='selecteditschedulechangeday()' class='form-control'>"
    for (i = 0; i < arr.length; i++) {
        if (document.getElementById('selecteditscheduleday').value.toUpperCase() == arr[i]) {
            string += "<option value = '" + arr[i] + "' selected>" + arr[i] + "</option>"
        }
        else {
            string += "<option value = '" + arr[i] + "' >" + arr[i] + "</option>"
        }
    }
    string += "</select>"
    string += "<input type='time' name='Start time' id='StartTime'><input type='time' name='End Time' id='EndTime'><input type='button' style='background-color:#6201ea;color:white;' name='Add To the Schedule' id='AddToTheSchedule' value='Add to the Schedule' onclick='add()' required></div>"
    // string += "<input type='button' style='background-color:#6201ea;' value='back' onclick=back()>"

    document.getElementById('EditTd').innerHTML = string
    document.getElementById("StartTime").defaultValue = "00:00";
    document.getElementById("EndTime").defaultValue = "24:00";
}
function add() {
    cntr = 0
    starttime = document.getElementById('StartTime').value
    endtime = document.getElementById('EndTime').value
    console.log(starttime)
    console.log(endtime)

    if (starttime == "" || endtime == "") {
        alert("empty time field")
        return
    }
    if (starttime > endtime) {
        console.log("!")
        alert("Startime should be less than Endtime")
        return
    }
    type = document.getElementById('selecteditschedule').value
    day = document.getElementById('selecteditscheduleday').value
    console.log(type)
    if (type != "OPEN 24/7") {
        console.log(FinalDataForSchedule)
        if (FinalDataForSchedule.length > 0 && FinalDataForSchedule[0][0] == "FULL_DAY") {
            FinalDataForSchedule = []
        }
        if (document.getElementById('selecteditschedulemonth')) {
            period = document.getElementById('selecteditschedulemonth').value
            for (i = 0; i < FinalDataForSchedule.length; i++) {
                if (FinalDataForSchedule[i].length != 4) {
                    if (FinalDataForSchedule[i][2].toUpperCase() == day.toUpperCase()) {
                        if (FinalDataForSchedule[i][1].toUpperCase() == period.toUpperCase()) {
                            cntr = 1
                            FinalDataForSchedule[i][3].push(convert(starttime))
                            FinalDataForSchedule[i][4].push(convert(endtime))
                        }
                    }
                }
            }
            if (cntr == 0) {
                FinalDataForSchedule.push([type, period, day.toUpperCase(), [convert(starttime)], [convert(endtime)]])
            }
        }
        else {
            console.log("1")
            for (i = 0; i < FinalDataForSchedule.length; i++) {
                if (FinalDataForSchedule[i].length != 4) {
                }
                else if (FinalDataForSchedule[i][1].toUpperCase() == day.toUpperCase()) {
                    FinalDataForSchedule[i][2].push(convert(starttime))
                    FinalDataForSchedule[i][3].push(convert(endtime))
                    cntr = 1
                }
            }
            if (cntr == 0) {
                FinalDataForSchedule.push([type, day.toUpperCase(), [convert(starttime)], [convert(endtime)]])
            }
        }
    }
    else {
        FinalDataForSchedule = ["FULL_DAY"]
    }
    console.log(FinalDataForSchedule)

    back()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function convertmultipletonormal() {
    return JSON.stringify(CFinalDataForSchedule)
}
function closedconvertmultipletonormal() {
    return JSON.stringify(FinalDataForSchedule)
}
function convert(starttime) {
    suffix = ""
    startfinal = ""
    startarr = starttime.split(":")
    startarr[0] = parseInt(startarr[0])
    if (startarr[0] >12) {
        startarr[0] -= 12
        suffix = " PM"
    }
    else if (startarr[0]==12)
    {
        suffix=" PM"
    }
    else {
        suffix = " AM"
    }
    startfinal = startarr[0].toString() + ":" + startarr[1] + suffix
    return startfinal
}
function closedadd() {
    cntr = 0
    starttime = document.getElementById('closedStartTime').value
    endtime = document.getElementById('closedEndTime').value
    console.log(starttime)
    console.log(endtime)
    if (starttime > endtime) {
        console.log("!")
        alert("Startime should be less than Endtime")
        return
    }
    if (starttime == "" && endtime == "") {
        starttime = "00:00"
        endtime = "23:59"
    }
    else if (starttime == "" && endtime != "") {
        alert("Please enter both time field")
        return
    }
    else if (starttime != "" && endtime == "") {
        alert("Please enter both time field")
        return
    }

    type = document.getElementById('closedselecteditschedule').value
    day = document.getElementById('closedselecteditscheduleday').value
    if (type != "CLOSED") {
        if (CFinalDataForSchedule.length > 0 && CFinalDataForSchedule[0] == "PERMANENTLY_CLOSED") {
            CFinalDataForSchedule = []
        }
        if (document.getElementById('closedselecteditschedulemonth')) {
            period = document.getElementById('closedselecteditschedulemonth').value
            for (i = 0; i < CFinalDataForSchedule.length; i++) {
                if (CFinalDataForSchedule[i].length != 4) {
                    if (CFinalDataForSchedule[i][2].toUpperCase() == day.toUpperCase()) {
                        if (CFinalDataForSchedule[i][1].toUpperCase() == period.toUpperCase()) {
                            cntr = 1
                            CFinalDataForSchedule[i][3].push(convert(starttime))
                            CFinalDataForSchedule[i][4].push(convert(endtime))
                        }
                    }
                }
            }
            if (cntr == 0) {
                CFinalDataForSchedule.push([type, period, day.toUpperCase(), [convert(starttime)], [convert(endtime)]])
            }
        }
        else {
            for (i = 0; i < CFinalDataForSchedule.length; i++) {
                if (CFinalDataForSchedule[i].length != 4) {
                }
                else if (CFinalDataForSchedule[i][1].toUpperCase() == day.toUpperCase()) {
                    CFinalDataForSchedule[i][2].push(convert(starttime))
                    CFinalDataForSchedule[i][3].push(convert(endtime))
                    cntr = 1
                }
            }
            if (cntr == 0) {
                CFinalDataForSchedule.push([type, day.toUpperCase(), [convert(starttime)], [convert(endtime)]])
            }
        }
    }
    else {
        CFinalDataForSchedule = ["PERMANENTLY_CLOSED"]
    }
    closedback()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function closedselecteditschedulechangeday() {
    if (document.getElementById('closedselecteditschedule').value.toUpperCase() == "MONTHLY") {
        return
    }
    arr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
    var i = 0
    string = DeleteClosed()
    string += "<div class='form-group'><select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control' value='WEEKLY' ><option value='WEEKLY' selected>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='PERMANENTLY_CLOSED'>PERMANENTLY_CLOSED</option></select>"
    string += "<select id='closedselecteditscheduleday' onchange='closedselecteditschedulechangeday()' class='form-control'>"
    for (i = 0; i < arr.length; i++) {
        if (document.getElementById('closedselecteditscheduleday').value.toUpperCase() == arr[i].toUpperCase()) {
            string += "<option value = '" + arr[i] + "' selected>" + arr[i] + "</option>"
        }
        else {
            string += "<option value = '" + arr[i] + "' >" + arr[i] + "</option>"
        }
    }
    string += "</select>"
    string += "<input type='time' name='Start time' id='closedStartTime'><input type='time' name='End Time' id='closedEndTime'><input type='button' style='background-color:#6201ea;color:white;' name='Add To the Schedule' id='AddToTheSchedule' value='Add to the Schedule' onclick='closedadd()' required ></div>"
    // string += "<input type='button' style='background-color:#6201ea;' value='back' onclick=back()>"

    document.getElementById('closedEditTd').innerHTML = string
    document.getElementById("StartTime").defaultValue = "00:00";
    document.getElementById("EndTime").defaultValue = "24:00";
}


function selecteditschedulechange() {
    string = ""
    if (document.getElementById('selecteditschedule').value.toUpperCase() == "WEEKLY") {
        document.getElementById('EditTd').innerHTML = Delete() + "<select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control' value='WEEKLY' ><option value='Select Type'>Select Type</option><option value='WEEKLY' selected>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select><div class='form-group'><select id='selecteditscheduleday' onchange='selecteditschedulechangeday()' class='form-control'><option value='SELECT DAY'>SELECT DAY</option><option value='MONDAY'>MONDAY</option><option value='TUESDAY'>TUESDAY</option><option value='WEDNESDAY'>WEDNESDAY</option><option value='THURSDAY'>THURSDAY</option><option value='FRIDAY'>FRIDAY</option><option value='SATURDAY'>SATURDAY</option><option value='SUNDAY'>SUNDAY</option></select></div>"
    }
    if (document.getElementById('selecteditschedule').value.toUpperCase() == "MONTHLY") {
        document.getElementById('EditTd').innerHTML = Delete() + "<select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control' value='MONTHLY'><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY' selected>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select><div class='form-group'><select id='selecteditschedulemonth' onchange='selecteditschedulechangemonth()' class='form-control'><option value='SELECT'>SELECT Period</option><option value='FIRST'>FIRST</option><option value='SECOND'>SECOND</option><option value='THIRD'>THIRD</option><option value='FOURTH'>FOURTH</option><option value='FIFTH'>FIFTH</option><option value='LAST'>LAST</option></select><select id='selecteditscheduleday' onchange='selecteditschedulechangeday()' class='form-control'><option value='SELECT DAY'>SELECT DAY</option><option value='MONDAY'>MONDAY</option><option value='TUESDAY'>TUESDAY</option><option value='WEDNESDAY'>WEDNESDAY</option><option value='THURSDAY'>THURSDAY</option><option value='FRIDAY'>FRIDAY</option><option value='SATURDAY'>SATURDAY</option><option value='SUNDAY'>SUNDAY</option></select></div>"
    }
    if (document.getElementById('selecteditschedule').value.toUpperCase() == "OPEN 24/7") {
        FinalDataForSchedule = [["FULL_DAY"], "", [""], [""]]
        document.getElementById('EditTd').innerHTML = Delete() + "<select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control' value='OPEN 24/7'><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select>"
    }
}
function closedselecteditschedulechange() {
    if (document.getElementById('closedselecteditschedule').value.toUpperCase() == "WEEKLY") {
        document.getElementById('closedEditTd').innerHTML = DeleteClosed() + "<select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control' value='WEEKLY' ><option value='Select Type'>Select Type</option><option value='WEEKLY' selected>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='CLOSED'>CLOSED</option></select><div class='form-group'><select id='closedselecteditscheduleday' onchange='closedselecteditschedulechangeday()' class='form-control'><option value='SELECT DAY'>SELECT DAY</option><option value='MONDAY'>MONDAY</option><option value='TUESDAY'>TUESDAY</option><option value='WEDNESDAY'>WEDNESDAY</option><option value='THURSDAY'>THURSDAY</option><option value='FRIDAY'>FRIDAY</option><option value='SATURDAY'>SATURDAY</option><option value='SUNDAY'>SUNDAY</option></select></div>"
    }
    if (document.getElementById('closedselecteditschedule').value.toUpperCase() == "MONTHLY") {
        document.getElementById('closedEditTd').innerHTML = DeleteClosed() + "<select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control' value='MONTHLY'><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY' selected>MONTHLY</option><option value='CLOSED'>CLOSED</option></select><div class='form-group'><select id='closedselecteditschedulemonth' onchange='closedselecteditschedulechangemonth()' class='form-control'><option value='SELECT'>SELECT Period</option><option value='FIRST'>FIRST</option><option value='SECOND'>SECOND</option><option value='THIRD'>THIRD</option><option value='FOURTH'>FOURTH</option><option value='FIFTH'>FIFTH</option><option value='LAST'>LAST</option></select><select id='closedselecteditscheduleday' onchange='closedselecteditschedulechangeday()' class='form-control'><option value='SELECT DAY'>SELECT DAY</option><option value='MONDAY'>MONDAY</option><option value='TUESDAY'>TUESDAY</option><option value='WEDNESDAY'>WEDNESDAY</option><option value='THURSDAY'>THURSDAY</option><option value='FRIDAY'>FRIDAY</option><option value='SATURDAY'>SATURDAY</option><option value='SUNDAY'>SUNDAY</option></select></div>"
    }
    if (document.getElementById('closedselecteditschedule').value.toUpperCase() == "CLOSED") {
        CFinalDataForSchedule = ["PERMANENTLY_CLOSED"]
        document.getElementById('closedEditTd').innerHTML = DeleteClosed() + "<select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control' value='CLOSED'><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='CLOSED'>CLOSED</option></select>"
    }
}
function back() {
    document.getElementById('EditTd').innerHTML = Delete() + "<select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control' ><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select>"
}
function closedback() {
    document.getElementById('closedEditTd').innerHTML = DeleteClosed() + "<select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control' ><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='CLOSED'>CLOSED</option></select>"
}
function ViewScrapedSchedule() {
    string = ""
    var i = 0
    cntr = 0
    console.log(SCHEDULES1)
    if (FULL_DAYSCRAPED == 1) {
        SCHEDULES1 = [["FULL_DAY", "", [], []]]
        console.log(SCHEDULES1)
        return "<br>FULL_DAY"
    }
    for (i = 0; i < SCHEDULES1.length; i++) {
        if (cntr == 0) {
            string += "<ul><li>WEEKLY"
            cntr = 1
        }
        string += "<ul><li>" + SCHEDULES1[i][0] + "<ul>"
        for (j = 0; j < SCHEDULES1[i][1].length; j++) {
            string += "<li>" + SCHEDULES1[i][1][j] + "-" + SCHEDULES1[i][2][j] + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntr == 1) {
        string += "</li></ul>"
    }
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
    console.log(FULL_DAYSCRAPED)
    return string
    // document.getElementById('ScrapedView').innerHTML = string
    // document.getElementById('ScrapedView').innerHTML += "<input type='button' style='background-color:#6201ea;' value='back' onclick=backtonotview()>"
}
function ViewDbSchedule() {
    string = ""
    weekly = []
    monthly = []
    for (i = 0; i < SCHEDULES2.length; i++) {
        if (SCHEDULES2[i][0].toUpperCase() == "WEEKLY") {
            weekly.push(SCHEDULES2[i])
            // console.log(weekly[i][1])
        }
    }
    for (i = 0; i < SCHEDULES2.length; i++) {
        if (SCHEDULES2[i][0].toUpperCase() == "MONTHLY") {
            monthly.push(SCHEDULES2[i])
        }
    }
    var cntw = 0
    for (i = 0; i < weekly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "WEEKLY"
            cntw = 1
        }
        console.log(weekly[i][1])
        string += "<ul><li>" + weekly[i][1] + "<ul>"
        for (j = 0; j < weekly[i][2].length; j++) {
            string += "<li>" + weekly[i][2][j] + "-" + weekly[i][3][j] + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
        cntw = 0
    }
    for (i = 0; i < monthly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "MONTHLY"
            cntw = 1
        }
        string += "<ul><li>" + monthly[i][1] + ": " + monthly[i][2] + "<ul>"
        for (j = 0; j < monthly[i][3].length; j++) {
            string += "<li>" + monthly[i][3][j] + "-" + monthly[i][4][j] + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
        cntw = 0
    }
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
    if (string == "") {
        if (SCHEDULES2.length == 0) {
            return "<br>No Open Schedule"
        }
        return "<br>FULL_DAY"
    }
    return string
    // document.getElementById('DbView').innerHTML = string
    // document.getElementById('DbView').innerHTML += "<input type='button' style='background-color:#6201ea;' value='back' onclick=backtonottoview()>"
}

function closedViewDbSchedule() {
    string = ""
    weekly = []
    monthly = []

    for (i = 0; i < CSCHEDULES2.length; i++) {
        if (CSCHEDULES2[i][0].toUpperCase() == "WEEKLY") {
            weekly.push(CSCHEDULES2[i])
        }
    }
    for (i = 0; i < CSCHEDULES2.length; i++) {
        if (CSCHEDULES2[i][0].toUpperCase() == "MONTHLY") {
            monthly.push(CSCHEDULES2[i])
        }
    }
    var cntw = 0
    for (i = 0; i < weekly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "WEEKLY"
            cntw = 1
        }
        string += "<ul><li>" + weekly[i][1] + "<ul>"
        for (j = 0; j < weekly[i][2].length; j++) {
            string += "<li>" + weekly[i][2][j] + "-" + weekly[i][3][j] + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
        cntw = 0
    }
    for (i = 0; i < monthly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "MONTHLY"
            cntw = 1
        }
        string += "<ul><li> " + monthly[i][1] + ": " + monthly[i][2] + "<ul>"
        for (j = 0; j < monthly[i][3].length; j++) {
            string += "<li>" + monthly[i][3][j] + "-" + monthly[i][4][j] + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
        cntw = 0
    }
    // document.getElementById('DbView').innerHTML = string
    // document.getElementById('DbView').innerHTML += "<input type='button' style='background-color:#6201ea;' value='back' onclick=backtonottoview()>"
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
    if (string == "") {
        if (CSCHEDULES2.length > 0) {
            CFinalDataForSchedule = ["PERMANENTLY_CLOSED"]
            // document.getElementById('selecteditschedule').disabled = true
            // document.getElementById('selecteditschedule').style.display = "none"
            return "<br>PERMANENTLY CLOSED"
        }
        return "<br>No CLOSED Schedule available"
    }
    CFinalDataForSchedule = CSCHEDULES2
    return string
}
function ClosedViewScrapedSchedule() {
    string = ""
    if (CSCHEDULES1 == 1) {
        // document.getElementById('ScrapedView').innerHTML = "<p>Open</p><input type='button' style='background-color:#6201ea;' value='back' onclick=backtonotview()>"
        string = ""
        CFinalDataForSchedule = []
    }
    else if (CSCHEDULES1 == 0) {
        string = "<br>PERMANENTLY CLOSED"
        // document.getElementById('ScrapedView').innerHTML = "<p>CLOSED</p><input type='button' style='background-color:#6201ea;' value='back' onclick=backtonotview()>"
        CFinalDataForSchedule = ["PERMANENTLY_CLOSED"]
    }
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()

    return string
}
function closedremove(type, day, j) {
    i = 0
    j = parseInt(j)
    for (i = 0; i < CFinalDataForSchedule.length; i++) {
        if (CFinalDataForSchedule[i][0] == type && CFinalDataForSchedule[i][1].toUpperCase() == day.toUpperCase()) {
            if (CFinalDataForSchedule[i].length == 4) {
                CFinalDataForSchedule[i][2].splice(j, 1)
                CFinalDataForSchedule[i][3].splice(j, 1)
            }
        }
    }
    closedback()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function closedremovemonth(type, period, day, j) {
    i = 0
    j = parseInt(j)
    for (i = 0; i < CFinalDataForSchedule.length; i++) {
        if (CFinalDataForSchedule[i][0] == type && CFinalDataForSchedule[i][1].toUpperCase() == period.toUpperCase() && CFinalDataForSchedule[i][2].toUpperCase() == day.toUpperCase()) {
            if (CFinalDataForSchedule[i].length == 5) {
                CFinalDataForSchedule[i][3].splice(j, 1)
                CFinalDataForSchedule[i][4].splice(j, 1)
            }
        }
    }
    closedback()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function remove(type, day, j) {
    i = 0
    j = parseInt(j)
    for (i = 0; i < FinalDataForSchedule.length; i++) {
        if (FinalDataForSchedule[i][0] == type && FinalDataForSchedule[i][1].toUpperCase() == day.toUpperCase()) {
            if (FinalDataForSchedule[i].length == 4) {
                FinalDataForSchedule[i][2].splice(j, 1)
                FinalDataForSchedule[i][3].splice(j, 1)
            }
        }
    }
    back()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function removemonth(type, period, day, j) {
    i = 0
    j = parseInt(j)
    console.log(j)
    for (i = 0; i < FinalDataForSchedule.length; i++) {
        console.log(FinalDataForSchedule[i])
        if (FinalDataForSchedule[i][0] == type && FinalDataForSchedule[i][1].toUpperCase() == period.toUpperCase() && FinalDataForSchedule[i][2].toUpperCase() == day.toUpperCase()) {
            if (FinalDataForSchedule[i].length == 5) {
                FinalDataForSchedule[i][4].splice(j, 1)
                FinalDataForSchedule[i][3].splice(j, 1)
            }
        }
    }
    back()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}

function DeleteClosed() {
    string = ""
    weekly = []
    monthly = []
    if (CFinalDataForSchedule.length > 0 && CFinalDataForSchedule[0] == "PERMANENTLY_CLOSED") {
        document.getElementById('closedschedule').value = convertmultipletonormal()
        document.getElementById('schedule').value = closedconvertmultipletonormal()
        return "<ul><li>PERMANENTLY_CLOSED <button style='background-color:white;border: none;color: #6201ea;padding: 12px 16px;font-size: 16px;cursor: pointer;' onclick='closedFULL_DAYremove()'><i class='fa fa-trash'></i></button></li></ul>"
    }
    for (i = 0; i < CFinalDataForSchedule.length; i++) {
        if (CFinalDataForSchedule[i][0].toUpperCase() == "WEEKLY" && CFinalDataForSchedule[i][2].length > 0) {
            weekly.push(CFinalDataForSchedule[i])
        }
    }
    for (i = 0; i < CFinalDataForSchedule.length; i++) {
        if (CFinalDataForSchedule[i][0].toUpperCase() == "MONTHLY" && CFinalDataForSchedule[i][3].length > 0) {
            monthly.push(CFinalDataForSchedule[i])
        }
    }
    var cntw = 0
    for (i = 0; i < weekly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "WEEKLY"
            cntw = 1
        }
        string += "<ul><li> " + weekly[i][1] + "<ul>"
        for (j = 0; j < weekly[i][2].length; j++) {
            string += "<li>" + weekly[i][2][j] + "-" + weekly[i][3][j] + "<button style='background-color:white;border: none;color: #6201ea;padding: 8px 12px;font-size: 12px;cursor: pointer;'  onclick='closedremove(\"" + weekly[i][0] + "\",\"" + weekly[i][1] + "\",\"" + j + "\")' ><i class='fa fa-trash'></i></button>" + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
        cntw = 0
    }
    for (i = 0; i < monthly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "MONTHLY"
            cntw = 1
        }
        string += "<ul><li>" + monthly[i][1] + ": " + monthly[i][2] + "<ul>"
        for (j = 0; j < monthly[i][3].length; j++) {
            string += "<li>" + monthly[i][3][j] + "-" + monthly[i][4][j] + "<button style='background-color:white;border: none;color: #6201ea;padding: 8px 12px;font-size: 12px;cursor: pointer;' onclick='closedremovemonth(\"" + monthly[i][0] + "\",\"" + monthly[i][1] + "\",\"" + monthly[i][2] + "\",\"" + j + "\")' ><i class='fa fa-trash'></i></button>" + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
    }
    // string += "<input type='button' style='background-color:#6201ea;' value='back' onclick=back()>"
    // document.getElementById('EditTd').innerHTML = string
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
    return string
}
function FULL_DAYremove() {
    FinalDataForSchedule = []
    back()
}
function closedFULL_DAYremove() {
    CFinalDataForSchedule = []
    closedback()
}
function Delete() {
    string = ""
    weekly = []
    monthly = []
    Fullday = []
    console.log(FinalDataForSchedule)
    if (FinalDataForSchedule.length > 0 && FinalDataForSchedule[0].length > 0 && FinalDataForSchedule[0][0].toUpperCase() == "FULL_DAY") {
        document.getElementById('closedschedule').value = convertmultipletonormal()
        document.getElementById('schedule').value = closedconvertmultipletonormal()
        return "<ul><li>FULL_DAY <button style='background-color:white;border: none;color: #6201ea;padding: 12px 16px;font-size: 16px;cursor: pointer;' onclick='FULL_DAYremove()'><i class='fa fa-trash'></i></button></li></ul>"
    }
    for (i = 0; i < FinalDataForSchedule.length; i++) {
        if (FinalDataForSchedule[i][0].toUpperCase() == "WEEKLY" && FinalDataForSchedule[i][2].length > 0) {
            weekly.push(FinalDataForSchedule[i])
        }
    }
    for (i = 0; i < FinalDataForSchedule.length; i++) {
        if (FinalDataForSchedule[i][0].toUpperCase() == "MONTHLY" && FinalDataForSchedule[i][3].length > 0) {
            monthly.push(FinalDataForSchedule[i])
        }
    }
    var cntw = 0
    for (i = 0; i < weekly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "WEEKLY"
            cntw = 1
        }
        string += "<ul><li> " + weekly[i][1] + "<ul>"
        for (j = 0; j < weekly[i][2].length; j++) {
            string += "<li>" + weekly[i][2][j] + "-" + weekly[i][3][j] + "<button style='background-color:white;border: none;color: #6201ea;padding: 12px 16px;font-size: 16px;cursor: pointer;'  onclick=remove(\"" + weekly[i][0] + "\",\"" + weekly[i][1] + "\",\"" + j + "\") ><i class='fa fa-trash'></i></button>" + "</li>"
        }
        string += "</ul></li></ul>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
        cntw = 0
    }

    for (i = 0; i < monthly.length; i++) {
        if (cntw == 0) {
            string += "<ul><li>" + "MONTHLY"
            cntw = 1
        }

        string += "<ul><li>" + monthly[i][1] + ": " + monthly[i][2] + "<ul>"
        for (j = 0; j < monthly[i][3].length; j++) {
            string += "<li>" + monthly[i][3][j] + "-" + monthly[i][4][j] + "<button style='background-color:white;border: none;color: #6201ea;padding: 12px 16px;font-size: 16px;cursor: pointer;' onclick='removemonth(\"" + monthly[i][0] + "\",\"" + monthly[i][1] + "\",\"" + monthly[i][2] + "\",\"" + j + "\")'><i class='fa fa-trash'></i></button>" + "</li>"
        }
        string += "</ul></li></ul></li>"
    }
    if (cntw == 1) {
        string += "</li></ul>"
    }
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
    return string
}
function SetFinalSchedule() {
    if (document.getElementsByName('finalschedule')[0].checked == true) {
        Temp = []
        for (i = 0; i < SCHEDULES1.length; i++) {
            if (FULL_DAYSCRAPED == 1) {
                FinalDataForSchedule = [["FULL_DAY", "", [], []]]
                console.log(FinalDataForSchedule)
                break
            }
            Temp.push(["WEEKLY", SCHEDULES1[i][0], SCHEDULES1[i][1], SCHEDULES1[i][2]])
            FinalDataForSchedule = Temp
        }
    }
    if (document.getElementsByName('finalschedule')[1].checked == true) {
        FinalDataForSchedule = SCHEDULES2
    }
    console.log(FinalDataForSchedule)
    back()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function closedSetFinalSchedule() {
    if (document.getElementsByName('closedfinalschedule')[0].checked == true) {
        CFinalDataForSchedule = CSCHEDULES2
    }
    console.log(CFinalDataForSchedule)
    closedback()
    document.getElementById('closedschedule').value = convertmultipletonormal()
    document.getElementById('schedule').value = closedconvertmultipletonormal()
}
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}
function Insert() {
    $.ajax({
        type: 'GET',
        url: '/dataS'
    })
        .done(function (data) {
            console.log(data)
            temp = data
            rand = temp['2'][9];
            temp['2'][9] = temp['2'][10];
            temp['2'][10] = rand;
            console.log(temp)
            var tablelist = '<div class="container-fluid"><div class="row"><div class="table-responsive-sm"><div align="center"><p class="btn-primary form-control" style="background-color:#6201ea;font-size:17px">Validate Resources</p></div><table id="Ptable" class="table table-dark table-bordered table-hover table-condensed"> <thead class="thead-dark"><th scope="col">Field</th><th scope="col">Crawled data</th><th scope="col">App data</th><th scope="col">Final data</th></thead><tbody id="Ptbody">'
            CurrentProject = []
            CurrentProject.push(temp['1']);
            CurrentProject.push(temp['2']);
            CurrentProject.push(temp['3']);
            temp=""
            for(i=0;i<CurrentProject[1][1].length;i++)
            {
                temp+=CurrentProject[1][1][i]+"|"
            }
            CurrentProject[1][1]=temp
            
            temp=""
            for(i=0;i<CurrentProject[2][1].length;i++)
            {
                temp+=CurrentProject[2][1][i]+"|"
            }
            CurrentProject[2][1]=temp
            
            FULL_DAYSCRAPED = CurrentProject[1][11]
            SCHEDULES1 = CurrentProject[1][9]
            CSCHEDULES1 = CurrentProject[1][10]
            SCHEDULES2 = CurrentProject[2][9]
            console.log(SCHEDULES2)
            CSCHEDULES2 = CurrentProject[2][10]

            var final = []
            final.push('0')
            console.log(CurrentProject[1][0]);
            var i = 1
            tablelist += "<div align='right'>" + CurrentProject[2][13] + "<a href='/LogOut'>(Logout)</a></div>"
            tablelist += "<tr><th scope='row'>Name</th><td style ='word-break:break-all;'>" + CurrentProject[2][11] + "</td><td style ='word-break:break-all;'>" + CurrentProject[2][11] + "</td><td style ='word-break:break-all;'><textarea oninput='auto_grow(this)' name = '" + "11" + "' id ='" + "11" + "'>" + "</textarea>" + "</td></tr>"
            tablelist += "<tr><th scope='row'>Service Summary</th><td style ='word-break:break-all;'>" + CurrentProject[2][12] + "</td><td style ='word-break:break-all;'>" + CurrentProject[2][12] + "</td><td style ='word-break:break-all;'><textarea oninput='auto_grow(this)' value = '' name = '" + "12" + "' id ='" + "12" + "'>" + "</textarea></td></tr>"
            for (i = 1; i < 10; i++) {
                if (i != 9) {
                    if (CurrentProject[1][i] == "") {
                        CurrentProject[1][i] = "-"
                        if (CurrentProject[2][i] == "") {
                            CurrentProject[2][i] = "-"
                        }
                        // console.log("3", CurrentProject[2][i])
                        final.push(CurrentProject[2][i])
                        if (i == 2 || i == 1 || i == 3) {
                            tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>" + CurrentProject[1][i] + "</td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                        }
                        else {
                            tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>" + CurrentProject[1][i] + "</td><td style ='word-break:break-all;'><a style='color:black' href=" + CurrentProject[1][i] + "target='_blank'>" + CurrentProject[2][i] + "</a></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                        }
                    }
                    else if (CurrentProject[2][i] == "") {
                        CurrentProject[2][i] = "-"
                        if (CurrentProject[1][i] == "") {
                            CurrentProject[1][i] = "-"
                        }
                        // console.log("4", CurrentProject[2][i])
                        // console.log(CurrentProject[1][i])
                        if (i == 1 || i == 3) {
                            final.push(CurrentProject[1][i])
                            tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>" + CurrentProject[1][i] + "</td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)'  value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                        }
                        else if (i == 2) {
                            if (CurrentProject[1][i].length <= 1) {
                                final.push(CurrentProject[1][i])
                                tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>" + CurrentProject[1][i] + "</td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)'  value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                            }
                            else {
                                final.push("")
                                tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>"
                                var j = 0
                                for (j = 0; j < CurrentProject[1][i].length; j++) {
                                    tablelist += "<input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i][j] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i][j] + "'><label for=" + CurrentProject[1][i][j] + ">" + CurrentProject[1][i][j] + "</label>"
                                    tablelist += "<br>"
                                }
                                tablelist += "</td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)'  value = '' placeholder='Please Confirm' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                            }
                        }
                        else {
                            if (i == 4) {
                                final.push(CurrentProject[1][i])
                                tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><a style='color:black' href=" + CurrentProject[1][i] + " target='_blank'>" + CurrentProject[1][i] + "</a></td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)'  value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                            }
                            else {
                                if (CurrentProject[1][i].length <= 1) {
                                    final.push(CurrentProject[1][i])
                                    tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'> <a style='color:black' href='" + CurrentProject[1][i] + "'target='_blank'>" + CurrentProject[1][i] + "</a></td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)'  value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                                }
                                else {
                                    final.push("")
                                    tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>"
                                    var j = 0
                                    for (j = 0; j < CurrentProject[1][i].length; j++) {
                                        tablelist += "<input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i][j] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i][j] + "'><label for=" + CurrentProject[1][i][j] + "><a style='color:black' href='" + CurrentProject[1][i][j] + "'target='_blank'> " + CurrentProject[1][i][j] + "</a></label>"
                                        tablelist += "<br>"
                                    }
                                    tablelist += "</td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                                }
                            }
                        }
                    }
                    else {
                        if (JSON.stringify(CurrentProject[1][i]) == JSON.stringify(CurrentProject[2][i])) {
                            final.push(CurrentProject[1][i])
                            // console.log(i, final[i], "1")
                            if (i == 2 || i == 1 || i == 3) {
                                tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>" + CurrentProject[1][i] + "</td><td style ='word-break:break-all;'>" + CurrentProject[2][i] + "</td><td style ='word-break:break-all;'><textarea oninput='auto_grow(this)'  value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                            }
                            else {
                                tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><a style='color:black' href=" + CurrentProject[1][i] + " target='_blank'>" + CurrentProject[1][i] + "</a></td><td style ='word-break:break-all;'><a style='color:black' href=" + CurrentProject[2][i] + " target='_blank'>" + CurrentProject[2][i] + "</a></td><td style ='word-break:break-all;'><textarea oninput='auto_grow(this)'  value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                            }
                        }
                        else {
                            final.push("")
                            // console.log(i, final[i], "2")
                            if (i == 1 || i == 3) {
                                tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i] + "'><label for=" + CurrentProject[1][i] + ">" + CurrentProject[1][i] + "</label></td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + ">" + CurrentProject[2][i] + "</label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                            }
                            else if (i == 2) {
                                if (CurrentProject[1][i].length <= 1) {
                                    tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i] + "'><label for=" + CurrentProject[1][i] + ">" + CurrentProject[1][i] + "</label></td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + ">" + CurrentProject[2][i] + "</label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "'>" + final[i] + "</textarea></td></tr>"
                                }
                                else {
                                    tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>"
                                    var j = 0
                                    for (j = 0; j < CurrentProject[1][i].length; j++) {
                                        tablelist += "<input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i][j] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i][j] + "'><label for=" + CurrentProject[1][i][j] + ">" + CurrentProject[1][i][j] + "</label>"
                                        tablelist += "<br>"
                                    }
                                    tablelist += "</td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + ">" + CurrentProject[2][i] + "</label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "' >" + final[i] + "</textarea></td></tr>"
                                }
                            }
                            else {
                                if (i == 4) {
                                    tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i] + "'><label for=" + CurrentProject[1][i] + "><a style='color:black' href='" + CurrentProject[1][i] + "'target='_blank'>" + CurrentProject[1][i] + "</a></label></td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + "><a style='color:black' href='" + CurrentProject[2][i] + "'target='_blank'>" + CurrentProject[2][i] + "</a></label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "' >" + final[i] + "</textarea></td></tr>"
                                }
                                else {
                                    // tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i] + "'><label for=" + CurrentProject[1][i] + "><a style='color:black' href='" + CurrentProject[1][i] + "'target='_blank'>" + CurrentProject[1][i] + "</a></label></td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + "><a style='color:black' href='" + CurrentProject[2][i] + "'target='_blank'>" + CurrentProject[2][i] + "</a></label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "' >" + final[i] + "</textarea></td></tr>"

                                    if (CurrentProject[1][i].length <= 1) {
                                        tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i] + "'><label for=" + CurrentProject[1][i] + "><a style='color:black' href='" + CurrentProject[1][i] + "'target='_blank'>" + CurrentProject[1][i] + "</a></label></td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + "><a style='color:black' href='" + CurrentProject[2][i] + "'target='_blank'>" + CurrentProject[2][i] + "</a></label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "' >" + final[i] + "</textarea></td></tr>"
                                    }
                                    else {
                                        tablelist += "<tr><th scope='row'>" + CurrentProject[0][i] + "</th><td style ='word-break:break-all;'>"
                                        var j = 0
                                        for (j = 0; j < CurrentProject[1][i].length; j++) {
                                            tablelist += "<input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[1][i][j] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[1][i][j] + "'><label for=" + CurrentProject[1][i][j] + "><a style='color:black' href='" + CurrentProject[1][i][j] + "'target='_blank'>" + CurrentProject[1][i][j] + "</a></label>"
                                            tablelist += "<br>"
                                        }
                                        tablelist += "</td><td style ='word-break:break-all;'><input type='radio'onchange='myfunction(" + i + "," + CurrentProject[0][i] + ")' value = '" + CurrentProject[2][i] + "' name = '" + CurrentProject[0][i] + "' id ='" + CurrentProject[2][i] + "'><label for=" + CurrentProject[2][i] + "> <a style='color:black' href='" + CurrentProject[2][i] + "'target='_blank'>" + CurrentProject[2][i] + "</a></label></td><td style ='word-break:break-all;'> <textarea oninput='auto_grow(this)' placeholder='Please Confirm' value = '' name = '" + i + "' id ='" + i + "' >" + final[i] + "</textarea></td></tr>"
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    final.push("")
                    tablelist += "<tr><th scope ='row'>" + CurrentProject[0][i] + "</th><td id='ScrapedView' style='word-break:break-all;'><input type='radio' id='ScrapedSchedule' name='finalschedule' value='" + CurrentProject[1][8] + "' onchange='SetFinalSchedule()'><label for='finalschedule' id='LabelScraped'>Select Scraped Open Schedule</label>" + ViewScrapedSchedule() + "</td><td id='DbView' style='word-break:break-all;'><input type='radio' id='DbSchedule' name='finalschedule' value='" + CurrentProject[2][8] + "' onchange='SetFinalSchedule()'><label for='finalschedule'>Select Db Open Schedule</label>" + ViewDbSchedule() + "</td><td id ='EditTd' style='word-break:break-all;'>" + Delete() + "<select id='selecteditschedule' onchange='selecteditschedulechange()' class='form-control'><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='OPEN 24/7'>OPEN 24/7</option></select></td></tr>"
                }
            }
            tablelist += "<tr><th scope ='row'>" + "CLOSED Schedule" + "</th><td id='closedScrapedView' style='word-break:break-all;'>" + ClosedViewScrapedSchedule() + "</td><td id='closedDbView' style='word-break:break-all;'>" + closedViewDbSchedule() + "</td><td id ='closedEditTd' style='word-break:break-all;'>" + DeleteClosed() + "<select id='closedselecteditschedule' onchange='closedselecteditschedulechange()' class='form-control'><option value='Select Type'>Select Type</option><option value='WEEKLY'>WEEKLY</option><option value='MONTHLY'>MONTHLY</option><option value='CLOSED'>CLOSED</option></select></td></tr>"
            tablelist += "<tr><th scope ='row'>" + "not sure about closing time or opening time" + "</th><td style='word-break:break-all;'>-</td><td style='word-break:break-all;'>" + CAll() + "</td><td style='word-break:break-all;'>" + CAll() + " in App" + "<br><label class ='form-group'><input type='checkbox' id='contact' name='contact'>Please contact this Service for hours</label></td></tr>"
            document.getElementById("org").innerText = "Shelter Web App Home Page"
            tablelist += '</tbody></table></div></div></div>'
            document.getElementById("loader").style.display = "none";
            document.getElementById("Ptbody").innerHTML = tablelist;
            document.getElementById("11").value = CurrentProject[2][11]
            document.getElementById("12").value = CurrentProject[2][12]
            if (CurrentProject[2][14] != false) {
                document.getElementById('contact').checked = true
            }
            string = ViewScrapedSchedule()
            console.log(string)
            if (string == "") {
                FinalDataForSchedule = SCHEDULES2
                document.getElementsByName('finalschedule')[1].checked = true
                SetFinalSchedule()
            }
            // if (CFinalDataForSchedule.length == 1 && CFinalDataForSchedule[0] == "PERMANENTLY_CLOSED") {
            //     document.getElementById('ScrapedSchedule').style.display = "none"
            //     document.getElementById('LabelScraped').style.display = "none"
            //     document.getElementById('selecteditschedule').style.display = "none"
            //     document.getElementById('selecteditschedule').disabled = true
            // }

            if (closedViewDbSchedule() == "<br>PERMANENTLY CLOSED") {
                document.getElementById('selecteditschedule').disabled = true
                document.getElementById('selecteditschedule').style.display = "none"

            }
        });
}
function CAll() {
    if (CurrentProject[2][14] == false) {
        return "Unchecked"
    }
    else {
        return "Checked"
    }
}
