export const getMeetings = () => {

    const token = localStorage.getItem("lu_token");

    const headers = {};

    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    return fetch("http://localhost:8000/meetings", {
        headers: headers
    })

    .then(response => response.json());

    // If there is no token in local storage, the user is not logged in,
    // so we don't add the Authorization header to the request.
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

export const getDays = () => {
    const token = localStorage.getItem("lu_token");

    const headers = {};

    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    return fetch("http://localhost:8000/days", {
        headers: headers
    })

    .then(response => response.json());
}

export const getTypes = () => {
    const token = localStorage.getItem("lu_token");

    const headers = {};
    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    return fetch("http://localhost:8000/types", {
        headers: headers
    })

    .then(response => response.json());

    // If there is no token in local storage, the user is not logged in,
    // so we don't add the Authorization header to the request.
}

export const getGroupReps = () => {
    return fetch("http://localhost:8000/groupreps", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch group reps");
        }
        return response.json();
    });
}

export const getGroupRepById = (groupRepId) => {
    return fetch(`http://localhost:8000/groupreps/${groupRepId}`, { 
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch group rep details");
        }
        return response.json();
    });
}

export const getDistricts = () => {
    const token = localStorage.getItem("lu_token");

    const headers = {};

    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    return fetch("http://localhost:8000/districts", {
        headers: headers
    })

    .then(response => response.json());

    // If there is no token in local storage, the user is not logged in,
    // so we don't add the Authorization header to the request.
}

export const getAreas = () => {
    const token = localStorage.getItem("lu_token");

    const headers = {};

    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    return fetch("http://localhost:8000/areas", {
        headers: headers
    })

    .then(response => response.json());

    // If there is no token in local storage, the user is not logged in,
    // so we don't add the Authorization header to the request.
}