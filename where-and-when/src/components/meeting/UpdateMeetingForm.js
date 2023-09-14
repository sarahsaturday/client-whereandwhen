import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMeetingById, updateMeeting, getDays, getTypes } from '../../managers/MeetingManager';

export const EditMeetingForm = () => {
    const { meetingId } = useParams();
    console.log('meetingId:', meetingId);
    const navigate = useNavigate();
    const [days, setDays] = useState([]); 
    const [selectedDay, setSelectedDay] = useState(null); 
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [currentMeeting, setCurrentMeeting] = useState(null)

    useEffect(() => {
        getMeetingById(meetingId)
            .then(meeting => {
                setCurrentMeeting(meeting);
                setSelectedDay(meeting.day); // Assuming 'day' is the correct property name
            })
            .catch(error => {
                console.error("Error fetching meeting:", error);
            });
        getDays()
            .then(days => {
                setDays(days);
            })
            .catch(error => {
                console.error("Error fetching days:", error);
            });
        getTypes()
            .then(types => {
                setTypes(types);
            })
            .catch(error => {
                console.error("Error fetching types:", error);
            });
    }, [meetingId]);

    const changeMeetingState = (domMeeting) => {
        const { name, value } = domMeeting.target;
        setCurrentMeeting(prevMeeting => ({
            ...prevMeeting,
            [name]: value
        }));
    }

    const handleDayChange = (evt) => {
        const selectedDayId = evt.target.value;
        setSelectedDay(selectedDayId);
    }

    const handleTypeChange = (evt) => {
        const selectedTypeId = evt.target.value;
        setSelectedType(selectedTypeId);
    }

    const handleSave = (evt) => {
        evt.preventDefault();

        const updatedMeeting = {
            // Use the currentMeeting state for updated data
            wso_id: currentMeeting.wso_id,
            district: currentMeeting.district,
            area: currentMeeting.area,
            meeting_name: currentMeeting.meeting_name,
            day: selectedDay,
            start_time: currentMeeting.start_time,
            street_address: currentMeeting.street_address,
            city: currentMeeting.city,
            zip: currentMeeting.zip,
            location_details: currentMeeting.location_details,
            type: selectedType,
            zoom_login: currentMeeting.zoom_login,
            zoom_pass: currentMeeting.zoom_pass,
            email: currentMeeting.email,
            phone: currentMeeting.phone,
        };

        updateMeeting(meetingId, updatedMeeting)
            .then(() => {
                navigate(`/meetings/${meetingId}`); // Redirect to meeting's detail page
            })
            .catch(error => {
                console.error("Error updating meeting:", error);
            });
    }


    return (
        <form className="form">
            <h2>Edit Meeting</h2>
            {currentMeeting ? (
                <>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="day">Day:</label>
                            <select
                                id="day"
                                required
                                autoFocus
                                className="meeting-control"
                                value={selectedDay}
                                onChange={handleDayChange}
                            >
                                <option value="">Select a Day</option>
                                {days.map(day => (
                                    <option key={day.id} value={day.id}>{day.day}</option>
                                ))}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="start_time">Start Time:</label>
                            <input
                                type="text"
                                id="start_time"
                                required
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.start_time}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="meeting_name">Meeting Name:</label>
                            <input
                                type="text"
                                id="meeting_name"
                                required
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.meeting_name}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="type">Type:</label>
                            <select
                                id="type"
                                required
                                autoFocus
                                className="meeting-control"
                                value={selectedType}
                                onChange={handleTypeChange}
                            >
                                <option value="">Select a Type</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.type_name}</option>
                                ))}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="district">District:</label>
                            <input
                                type="number"
                                id="district"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.district}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="area">Area:</label>
                            <input
                                type="number"
                                id="area"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.area}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="wso_id">WSO ID:</label>
                            <input
                                type="number"
                                id="wso_id"
                                required
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.wso_id}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="address">Street Address:</label>
                            <input
                                type="text"
                                id="address"
                                required
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.street_address}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="location_details">Location Details:</label>
                            <input
                                type="text"
                                id="location_details"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.location_details}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="zoom_login">Zoom Login:</label>
                            <input
                                type="text"
                                id="zoom_login"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.zoom_login}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="zoom_password">Zoom Password:</label>
                            <input
                                type="text"
                                id="zoom_password"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.zoom_pass}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.email}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <button type="submit" onClick={handleSave} className="button">Save</button>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </form>
    );
};