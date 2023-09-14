import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeetings, deleteMeeting } from "../../managers/MeetingManager";

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
                    // Meeting deleted successfully
                    // You may want to update the state or reload the meetings list here
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
        meeting.meeting_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.start_time.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.zip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.location_details.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderValueOrNa = (value) => (value ? value : "N/A");

    const renderValueOrMissing = (value) => (value ? value : "[Missing]");

    const isUserLoggedIn = () => {
        const token = localStorage.getItem("lu_token");
        return token !== null;
    };

    const userLoggedIn = isUserLoggedIn();

    return (
        <article className="meetings">
            <h2 className="eventForm__title">Meetings in Middle TN</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search meetings"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredMeetings.map((meeting) => (
                <section key={`meeting--${meeting.id}`} className="meeting">
                    <div className="meeting__days">Day: {meeting.days}</div>
                    <div className="meeting__start-time">Start Time: {meeting.start_time}</div>
                    <div className="meeting__name">Meeting Name: {meeting.meeting_name}</div>
                    <div className="meeting__type">Type: {meeting.type}</div>
                    <div className="meeting__district">District: {meeting.district}</div>
                    <div className="meeting__area">Area: {meeting.area}</div>
                    <div className="meeting__wso-id">WSO ID: {renderValueOrMissing(meeting.wso_id)}</div>
                    <div className="meeting__address">Address: {renderValueOrNa(meeting.street_address)}</div>
                    <div className="meeting__city">City: {meeting.city}</div>
                    <div className="meeting__zip">Zip: {meeting.zip}</div>
                    <div className="meeting__location-details">Location Details: {meeting.location_details}</div>
                    <div className="meeting__zoom-login">Zoom Login: {renderValueOrNa(meeting.zoom_login)}</div>
                    <div className="meeting__zoom-pass">Zoom Password: {renderValueOrNa(meeting.zoom_pass)}</div>
                    <div className="meeting__email">Email: {meeting.email}</div>
                    <div className="meeting__actions">
                        {userLoggedIn ? (
                            <>
                                <button onClick={() => handleEdit(meeting.id)}>Edit</button>
                                <button onClick={() => handleDelete(meeting.id)}>Delete</button>
                            </>
                        ) : null}
                        </div>
                </section>
            ))}
        </article>
    );
};