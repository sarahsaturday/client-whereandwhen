export const getMeetings = () => {
    return fetch("http://localhost:8000/meetings", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json());
}

export const createMeeting = (meeting) => {
    return fetch("http://localhost:8000/meetings", {
        method: "POST", // Set the request method to POST
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json" // Specify content type
        },
        body: JSON.stringify(meeting) // Send the meeting data in the request body
    })
    .then(response => response.json());
}

export const getMeetingById = (meetingId) => {
    return fetch(`http://localhost:8000/meetings/${meetingId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch meeting details");
        }
        return response.json();
    });
}

export const updateMeeting = (meetingId, meetingData) => {
    return fetch(`http://localhost:8000/meetings/${meetingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(meetingData)
    })
    .then(response => {
        if (response.status === 204) {
            return; // No need to parse response, just return
        }
        if (!response.ok) {
            throw new Error("Failed to update meeting");
        }
        return response.json();
    });
}

export const deleteMeeting = (meetingId) => {
    return fetch(`http://localhost:8000/meetings/${meetingId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(() => getMeetings()); // Fetch the updated meetings list after deletion
}
