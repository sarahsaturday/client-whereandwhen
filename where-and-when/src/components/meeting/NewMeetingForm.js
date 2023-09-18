import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    createMeeting,
    getMeetings,
    getDays,
    getTypes,
    getDistricts,
    getAreas,
    getGroupReps,
} from '../../managers/MeetingManager.js';

export const NewMeetingForm = () => {
    const navigate = useNavigate();
    const [groupRepId, setGroupRepId] = useState(null);
    const [updatedDays, setUpdatedDays] = useState([]);
    const [updatedGroupReps, setUpdatedGroupReps] = useState([]);

    const [newMeeting, setNewMeeting] = useState({
        days: [],
        startTime: "",
        meetingName: "",
        type: 0,
        district: 0,
        area: 1,
        wsoId: 0,
        address: "",
        city: "",
        zip: 0,
        locationDetails: "",
        zoomLogin: 0,
        zoomPassword: 0,
        email: "",
        phone: "",
        groupReps: [{ id: groupRepId, is_home_group: false }],
    });

    const [days, setDays] = useState([]);
    const [types, setTypes] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [areas, setAreas] = useState([]);
    const [groupReps, setGroupReps] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const loggedInUserId = localStorage.getItem("lu_token");

                setNewMeeting((prevMeeting) => ({
                    ...prevMeeting,
                    groupReps: [
                        {
                            id: loggedInUserId,
                            is_home_group: false,
                        },
                    ],
                }));

                const daysData = await getDays();
                const typesData = await getTypes();
                const districtsData = await getDistricts();
                const groupRepsData = await getGroupReps();

                setDays(daysData);
                setTypes(typesData);
                setDistricts(districtsData);
                setGroupReps(groupRepsData);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        console.log('data entered:', event.target.name, event.target.value);
        const { name, value, type } = event.target;
        setNewMeeting((prevMeeting) => ({
            ...prevMeeting,
            [name]: type === "number" ? parseInt(value) : value,
        }));
    };

    // const handleDayChange = (event) => {
    //     console.log('Checkbox clicked:', event.target.checked, event.target.value, event.target.name);

    //     /// when a day box is checked, add to the array of days
    //     /// when a day box is unchecked, remove from the array of days


    const handleHomeGroupChange = (event) => {
        console.log('Checkbox clicked:', event.target.checked, event.target.value, event.target.name);
    
        const isChecked = event.target.checked;
    
        setNewMeeting((prevMeeting) => ({
            ...prevMeeting,
            groupReps: isChecked
                ? [{ id: loggedInUserId, is_home_group: true }]
                : [],
        }));
    };

    const handleRadioChange = (event) => {
        console.log('Radio button changed:', event.target.name, event.target.value);
        const { name, value } = event.target;

        setNewMeeting((prevMeeting) => ({
            ...prevMeeting,
            [name]: parseInt(value),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Data to be sent:', newMeeting);

        const newMeetingData = {
            wso_id: newMeeting.wsoId,
            district: newMeeting.district,
            area: newMeeting.area,
            meeting_name: newMeeting.meetingName,
            start_time: newMeeting.startTime,
            street_address: newMeeting.address,
            city: newMeeting.city,
            zip: newMeeting.zip,
            location_details: newMeeting.locationDetails,
            type: newMeeting.type,
            zoom_login: newMeeting.zoomLogin,
            zoom_pass: newMeeting.zoomPassword,
            email: newMeeting.email,
            phone: newMeeting.phone,
            days: updatedDays,
            group_reps: updatedGroupReps,
        };

        createMeeting(newMeetingData);
        navigate("/");

    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Create New Meeting</h2>

            <div className="form-input">
                Meeting Day(s): {Array.isArray(newMeeting.days) && (
                    <div>
                        {days.map((day) => (
                            <div key={day.id}>
                                <input
                                    type="checkbox"
                                    name="days"
                                    value={day.id}
                                    checked={newMeeting.days.includes(day.id)}
                                    onChange={handleDayChange}
                                />
                                {day.day}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="form-input">
                Start time: <input
                    type="time"
                    name="startTime"
                    required
                    autoFocus
                    value={newMeeting.startTime}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Meeting Name: <input
                    type="text"
                    name="meetingName"
                    required
                    autoFocus
                    value={newMeeting.meetingName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Meeting Type: {types.map((type) => (
                    <div key={type.id}>
                        <input
                            type="radio"
                            name="type"
                            value={type.id}
                            checked={newMeeting.type === type.id}
                            onChange={handleRadioChange}
                        />
                        {type.type_name}
                    </div>
                ))}
            </div>

            <div className="form-input">
                District: {districts.map((district) => (
                    <div key={district.id}>
                        <input
                            type="radio"
                            name="district"
                            value={district.id}
                            checked={newMeeting.district === district.id}
                            onChange={handleRadioChange}
                        />
                        {district.district_number}
                    </div>
                ))}
            </div>

            <div className="form-input">
                WSO ID: <input
                    type="number"
                    name="wsoId"
                    required
                    autoFocus
                    value={newMeeting.wsoId}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Street Address (if applicable): <input
                    type="text"
                    name="address"
                    autoFocus
                    value={newMeeting.address}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                City: <input
                    type="text"
                    name="city"
                    required
                    autoFocus
                    value={newMeeting.city}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Zipcode: <input
                    type="number"
                    name="zip"
                    required
                    autoFocus
                    value={newMeeting.zip}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Location Details (if applicable): <input
                    type="text"
                    name="locationDetails"
                    autoFocus
                    value={newMeeting.locationDetails}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Zoom Login ID (if applicable): <input
                    type="number"
                    name="zoomLogin"
                    autoFocus
                    value={newMeeting.zoomLogin}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Zoom Password (if applicable): <input
                    type="number"
                    name="zoomPassword"
                    autoFocus
                    value={newMeeting.zoomPassword}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Meeting Email: <input
                    type="text"
                    name="email"
                    autoFocus
                    value={newMeeting.email}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                Meeting Phone Number: <input
                    type="text"
                    name="phone"
                    autoFocus
                    value={newMeeting.phone}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-input">
                <div>
                    <input
                        type="checkbox"
                        name="is_home_group"
                        checked={newMeeting.groupReps.some((groupRep) => groupRep.id === loggedInUserId && groupRep.is_home_group)}
                        onChange={handleHomeGroupChange}
                    />
                    This is my home group
                </div>
            </div>

            <button type="submit" className="form-button">
                Add Meeting
            </button>
        </form>
    );
};      