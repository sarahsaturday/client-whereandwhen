import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMeetingById } from "../../managers/MeetingManager";

export const MeetingDetail = () => {
    const { meetingId } = useParams();
    const [meeting, setMeeting] = useState({});

    useEffect(() => {
        getMeetingById(meetingId)
            .then(data => setMeeting(data))
            .catch(error => console.error("Error fetching meeting:", error));
    }, [meetingId]);

    if (!meeting) {
        return <div>Loading...</div>;
    }

    return (
        <section className="meeting">
            <h3 className="meeting__name">Name: {meeting.name}</h3>
            <div className="meeting__days">Day: {meeting.days}</div>
            <div className="meeting__start-time">Start Time: {meeting.start_time}</div>
            <div className="meeting__name">Meeting Name: {meeting.meeting_name}</div>
            <div className="meeting__type">Type: {meeting.type}</div>
            <div className="meeting__district">District: {meeting.district}</div>
            <div className="meeting__area">Area: {meeting.area}</div>
            <div className="meeting__wso-id">WSO ID: {meeting.wso_id}</div>
            <div className="meeting__address">Address: {meeting.street_address}</div>
            <div className="meeting__city">City: {meeting.city}</div>
            <div className="meeting__zip">Zip: {meeting.zip}</div>
            <div className="meeting__location-details">Location Details: {meeting.location_details}</div>
            <div className="meeting__zoom-login">Zoom Login: {meeting.zoom_login}</div>
            <div className="meeting__zoom-pass">Zoom Password: {meeting.zoom_pass}</div>
            <div className="meeting__email">Email: {meeting.email}</div>
            <div className="meeting__phone">Phone: {meeting.phone}</div>
            <div className="meeting__email">Email: {meeting.email}</div>
        </section>
    );
};