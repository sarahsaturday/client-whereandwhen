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
                const areasData = await getAreas();
                const groupRepsData = await getGroupReps();

                setDays(daysData);
                setTypes(typesData);
                setDistricts(districtsData);
                setAreas(areasData);
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

    const handleCheckboxChange = (event) => {
        console.log('Checkbox clicked:', event.target.checked, event.target.value, event.target.name);

        const { name, value } = event.target;
        const isChecked = event.target.checked;

        if (name === "is_home_group") {
            setNewMeeting((prevMeeting) => ({
                ...prevMeeting,
                groupReps: isChecked
                    ? [{ id: loggedInUserId, is_home_group: true }]
                    : [],

            }));
        } else {
            if (isChecked) {
                setNewMeeting((prevMeeting) => ({
                    ...prevMeeting,
                    days: [...prevMeeting.days, parseInt(value)],
                }));
            } else {
                setNewMeeting((prevMeeting) => ({
                    ...prevMeeting,
                    days: prevMeeting.days.filter((dayId) => dayId !== parseInt(value)),
                }));
            }
        }
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
        <form className="meetingForm" onSubmit={handleSubmit}>
            <h2 className="meetingForm__title">Create New Meeting</h2>

            <fieldset>
                <div className="form-group">
                    <label>Days:</label>
                    {Array.isArray(newMeeting.days) && (
                        <div>
                            {days.map((day) => (
                                <div key={day.id} className="checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="days"
                                            value={day.id}
                                            checked={newMeeting.days.includes(day.id)}
                                            onChange={handleCheckboxChange}
                                        />
                                        {day.day}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="time"
                        name="startTime"
                        required
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.startTime}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="meetingName">Meeting Name:</label>
                    <input
                        type="text"
                        name="meetingName"
                        required
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.meetingName}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label> Type:</label>
                    {types.map((type) => (
                        <div key={type.id} className="meeting-control">
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
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label> District:</label>
                    {districts.map((district) => (
                        <div key={district.id} className="meeting-control">
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
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="wsoId">WSO ID:</label>
                    <input
                        type="number"
                        name="wsoId"
                        required
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.wsoId}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Street Address:</label>
                    <input
                        type="text"
                        name="address"
                        required
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.address}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        name="city"
                        required
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.city}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="zip">Zip:</label>
                    <input
                        type="number"
                        name="zip"
                        required
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.zip}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationDetails">Location Details:</label>
                    <input
                        type="text"
                        name="locationDetails"
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.locationDetails}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="zoomLogin">Zoom Login:</label>
                    <input
                        type="number"
                        name="zoomLogin"
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.zoomLogin}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="zoomPassword">Zoom Password:</label>
                    <input
                        type="number"
                        name="zoomPassword"
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.zoomPassword}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.email}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        autoFocus
                        className="meeting-control"
                        value={newMeeting.phone}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="is_home_group"
                                checked={newMeeting.groupReps.some((groupRep) => groupRep.id === loggedInUserId && groupRep.is_home_group)}
                                onChange={handleCheckboxChange}
                            />
                            This is my home group
                        </label>
                    </div>
                </div>
            </fieldset>

            <button type="submit" className="btn btn-primary">
                Add Meeting
            </button>
        </form>
    );
};
