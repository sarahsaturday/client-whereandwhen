import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeetings, deleteMeeting } from "../../managers/MeetingManager";
import "../../Generic.css";

export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getMeetings()
            .then(data => {
                console.log("Received data:", data);
                if (Array.isArray(data)) {
                    setMeetings(data);
                    setSearchQuery("");
                } else {
                    console.error("Error: Meetings data is not an array");
                }
            })
            .catch(error => {
                console.error("Error fetching meetings:", error);
            });
    }, []);

    const handleDelete = (meetingId) => {
        // Prompt the user for confirmation before deleting the meeting
        if (window.confirm("Are you sure you want to delete this meeting?")) {
            // If the user confirms, call the deleteMeeting function
            deleteMeeting(meetingId)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting meeting:", error);
            });
    }
};

    const handleEdit = (meetingId) => {
        // Navigate to the edit page for the specific meeting
        navigate(`/manage/edit/${meetingId}`);
    };

    const filteredMeetings = meetings.filter((meeting) =>
    (meeting.meeting_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (meeting.day?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (meeting.start_time?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (meeting.city?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (typeof meeting.zip === 'number' && String(meeting.zip).includes(searchQuery)) || 
    (meeting.location_details?.toLowerCase() || '').includes(searchQuery.toLowerCase())
);

    const renderValueOrNa = (value) => (value ? value : "N/A");

    const renderValueOrMissing = (value) => (value ? value : "[Missing]");

    const isUserLoggedIn = () => {
        const token = localStorage.getItem("lu_token");
        return token !== null;
    };

    const userLoggedIn = isUserLoggedIn();

    return (
        <article>
            <h2 className="form-title">Where & When: Meetings in Middle TN</h2>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search meetings"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                />
            </div>
            <div className="meetings-grid">
                {filteredMeetings.map((meeting, index) => (
                    <section key={`meeting--${meeting.id}`} className="meetings-container">
                        <div>
                            <p className="form-label">Day: {meeting.days}</p>
                            <p className="form-label">Start Time: {meeting.start_time}</p>
                            <p className="form-label">Meeting Name: {meeting.meeting_name}</p>
                            <p className="form-label">Type: {meeting.type}</p>
                            <p className="form-label">District: {meeting.district}</p>
                            <p className="form-label">Area: {meeting.area}</p>
                            <p className="form-label">WSO ID: {renderValueOrMissing(meeting.wso_id)}</p>
                            <p className="form-label">Address: {renderValueOrNa(meeting.street_address)}</p>
                            <p className="form-label">City: {meeting.city}</p>
                            <p className="form-label">Zip: {meeting.zip}</p>
                            <p className="form-label">Location Details: {meeting.location_details}</p>
                            <p className="form-label">Zoom Login: {renderValueOrNa(meeting.zoom_login)}</p>
                            <p className="form-label">Zoom Password: {renderValueOrNa(meeting.zoom_pass)}</p>
                            <p className="form-label">Email: {meeting.email}</p>
                            <p className="form-label">Phone: {meeting.phone}</p>
                        </div>
                        <div>
                            {userLoggedIn ? (
                                <>
                                    <button onClick={() => handleEdit(meeting.id)} className="button">Edit</button>
                                    <button onClick={() => handleDelete(meeting.id)} className="button">Delete</button>
                                </>
                            ) : null}
                        </div>
                    </section>
                ))}
            </div>
        </article>
    );
};