const events = [];

function createEventCard(eventDetails) {
    const eventElement = document.createElement('div');
    eventElement.className = 'event row border rounded m-1 py-1';
    var heading = eventDetails.name;
    var time = eventDetails.time;
    var attendees = eventDetails.attendees;
    var loc;
    if(eventDetails.location != null){
        loc = eventDetails.location;
        mode = `<b>Location: </b>`;
    }else{
        loc = eventDetails.remote_url;
        mode = `<b>Remote URL: </b>`;
    }

    var color = eventDetails.category;
    if(color == "academic"){
        eventElement.style.backgroundColor = '#c0e4a6';
    }else if(color == "work"){
        eventElement.style.backgroundColor = '#8dcde9';
    }else if(color == "personal"){
        eventElement.style.backgroundColor = '#ecca7f';
    }
    eventElement.innerHTML = `<h4><b>${heading}</b></h4> <br>${time} <br>${mode}${loc} <br><b>Attendees:</b> ${attendees}`;
    eventElement.addEventListener('click', () => {
        const modalElement = document.getElementById('event_modal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        document.getElementById("event_name").value = eventDetails.name;
        document.getElementById("event_weekday").value = eventDetails.weekday;
        document.getElementById("event_time").value = eventDetails.time;
        document.getElementById("event_modality").value = eventDetails.modality;
        document.getElementById("category").value = eventDetails.category;
        document.getElementById("event_attendees").value = eventDetails.attendees;
        document.getElementById("event_location").value = eventDetails.location;
        document.getElementById("event_remote_url").value = eventDetails.remote_url;
        modal.show();
        eventElement.remove();
    });
    document.body.appendChild(eventElement);
    return eventElement;
}

function addEventToCalendarUI(eventInfo) {
    var date = eventInfo.weekday;
    document.getElementById(date).appendChild(createEventCard(eventInfo));
}

function editEvent(eventDetails){
    const modalElement = document.getElementById('event_modal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
}

function saveEvent() {
    //nullify
    var mod = document.getElementById("event_modality").value;
    var url = document.getElementById("event_remote_url").value;
    var loc = document.getElementById("event_location").value;
    if(mod == "remote"){
        loc = null;
    }else{
        url = null;
    }

    const eventDetails = {
        name: document.getElementById("event_name").value,
        weekday: document.getElementById("event_weekday").value,
        time: document.getElementById("event_time").value,
        category: document.getElementById("category").value,
        modality: mod,
        location: loc,
        remote_url: url,
        attendees: document.getElementById("event_attendees").value
    };
    
    console.log(document.getElementById("event_name").checkValidity())

    var form = document.getElementById('event_form'); 
    if (!document.getElementById("event_name").checkValidity() || (loc != null && !document.getElementById("event_location").checkValidity()) || (url != null && !document.getElementById("event_remote_url").checkValidity())) {
        form.classList.add('was-validated');
        return;
    }

    events.push(eventDetails);
    addEventToCalendarUI(eventDetails);
    document.getElementById("event_form").reset(); 
    form.classList.remove('was-validated');
    const modalElement = document.getElementById('event_modal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();
}

function updateLocationOptions(modality)
{
    if("in-person" == modality.value){
        document.getElementById("in_person").style.display = "block";
        document.getElementById("remote").style.display = "none";
    }
    else{
        document.getElementById("in_person").style.display = "none";
        document.getElementById("remote").style.display = "block";
    }
}
