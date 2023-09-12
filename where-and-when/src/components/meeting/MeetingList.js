import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeetings, deleteMeeting } from "../../managers/MeetingManager";

export const MeetingList = () => {
    const [meetings, setMeetings] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getMeetings().then(data => setMeetings(data));
    }, [deleted]);

    const handleDelete = (meetingId) => {
        deleteMeeting(meetingId)
            .then(() => {
                setDeleted(!deleted); // Toggle the deleted state
            })
            .catch(error => {
                console.error("Error deleting meeting:", error);
            });
    };

    const filteredMeetings = meetings.filter((meeting) =>
        meeting.meeting_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const canAddMeeting = user && user.role === "group_rep";

    return (
        <article className="meetings">
            <h2 className="eventForm__title">Meetings List</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search meetings"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {canAddMeeting && (
                <button className="add-meeting-button" onClick={() => navigate("/add-meeting")}>
                    Add Meeting
                </button>
            )}
            {filteredMeetings.map(meeting => {
                return (
                    <section key={`meeting--${meeting.id}`} className="meeting">
                        <Link to={`/update-meeting/${meeting.id}`}>Update</Link>
                        <div className="meeting__title">Title: {meeting.meeting_name}</div>
                        <div className="meeting__type">Type: {meeting.type}</div>
                        <div className="meeting__district">District: {meeting.district_id}</div>
                        <div className="meeting__area">Area: {meeting.area_id}</div>
                        <div className="meeting__days">Days: {meeting.days}</div>
                        <div className="meeting__start-time">Start Time: {meeting.start_time}</div>
                        <div className="meeting__address">Address: {meeting.street_address}, {meeting.city}, {meeting.zip}</div>
                        <div className="meeting__location-details">Location Details: {meeting.location_details}</div>
                        <div className="meeting__zoom-login">Zoom Login: {meeting.zoom_login}</div>
                        <div className="meeting__zoom-pass">Zoom Password: {meeting.zoom_pass}</div>
                        <div className="meeting__email">Email: {meeting.email}</div>
                        <button onClick={() => handleDelete(meeting.id)}>Delete</button>
                    </section>
                );
            })}
        </article>
    );
};