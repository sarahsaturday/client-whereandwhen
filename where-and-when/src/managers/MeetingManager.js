// This function fetches a list of meetings from the server.
export const getMeetings = () => {
    // Check if there is a token in local storage.
    const token = localStorage.getItem("lu_token");

    // Define headers with a default value (no Authorization header).
    const headers = {};

    // If there is a token in local storage, add an Authorization header with the token value.
    // This header is used for authentication.
    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    // Send a GET request to the server's endpoint for meetings.
    return fetch("http://localhost:8000/meetings", {
        headers: headers
    })
    // Parse the response as JSON and return it.
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
    return fetch("http://localhost:8000/days", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch days");
        }
        return response.json();
    });
}

export const getTypes = () => {
    return fetch("http://localhost:8000/types", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch types");
        }
        return response.json();
    });
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

export const getDistricts = () => {
    return fetch("http://localhost:8000/districts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch districts");
        }
        return response.json();
    }
    );
}

export const getAreas = () => {
    return fetch("http://localhost:8000/areas", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch areas");
        }
        return response.json();
    }
    );
}