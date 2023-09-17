import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getMeetingById,
    updateMeeting,
    getDays,
    getTypes,
    getGroupReps,
    getAreas,
    getDistricts,
    } from '../../managers/MeetingManager';

    export const EditMeetingForm = () => {
    const { meetingId } = useParams();
    const [user, setUser] = useState({});
    console.log('meetingId:', meetingId);
    const navigate = useNavigate();
    const [days, setDays] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [groupReps, setGroupReps] = useState([]);
    const [selectedGroupReps, setSelectedGroupReps] = useState([]);
    const [types, setTypes] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [currentType, setCurrentType] = useState(null);
    const [currentDays, setCurrentDays] = useState([]);
    const [currentGroupReps, setCurrentGroupReps] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [currentDistrict, setCurrentDistrict] = useState([]);
    const [areas, setAreas] = useState([]);
    const [currentArea, setCurrentArea] = useState([]);

//////////// GET ALL THE DATA

    useEffect(() => {
        // Fetch the meeting data and other required data here
        getMeetingData(meetingId);
        getDaysData();
        getTypesData();
        getGroupRepsData();
        getDistrictsData();
        getAreasData();
    }, [meetingId]);

    // useEffect(() => {
    //     console.log('days:', days);
    //     console.log('types:', types);
    //     getMeetingById(meetingId)
    //         .then(meeting => {
    //             setCurrentMeeting(meeting);
    //             setCurrentType(meeting.type);
    //             setCurrentDays(meeting.days);
    //             setCurrentGroupReps(meeting.group_reps);
    //             setCurrentDistrict(meeting.district);
    //             setCurrentArea(meeting.area);

    //         })
    //         .catch(error => {
    //             console.error("Error fetching meeting:", error);
    //         });

    //     getDays()
    //         .then(days => {
    //             setDays(days);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching days:", error);
    //         });

    //     getTypes()
    //         .then(types => {
    //             setTypes(types);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching types:", error);
    //         });

    //     getGroupReps()
    //         .then(groupReps => {
    //             console.log("Group Reps:", groupReps);
    //             setGroupReps(groupReps);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching group reps:", error);
    //         });

    //     getDistricts()
    //         .then(districts => {
    //             console.log("Districts:", districts);
    //             setDistricts(districts);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching districts:", error);
    //         });

    //     getAreas()
    //         .then(areas => {
    //             console.log("Areas:", areas);
    //             setAreas(areas);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching areas:", error);
    //         });

    // }, [meetingId]);

    const getMeetingData = (meetingId) => {
        getMeetingById(meetingId)
            .then((meeting) => {
                setCurrentMeeting(meeting);
                setCurrentType(meeting.type);
                setCurrentDays(meeting.days);
                setCurrentGroupReps(meeting.group_reps);
                setCurrentDistrict(meeting.district);
                setCurrentArea(meeting.area);

                console.log('meeting.days:', meeting.days);
                console.log('meeting.group_reps:', meeting.group_reps);
                console.log('meeting.type:', meeting.type);
                console.log('meeting.district:', meeting.district);
                console.log('meeting.area:', meeting.area);
            })
            .catch((error) => {
                console.error('Error fetching meeting:', error);
            });
    };

    const getDaysData = () => {
        getDays()
            .then((days) => {
                setDays(days);
            })
            .catch((error) => {
                console.error('Error fetching days:', error);
            });
    };

    const getTypesData = () => {
        getTypes()
            .then((types) => {
                setTypes(types);
            })
            .catch((error) => {
                console.error('Error fetching types:', error);
            });
    };

    const getGroupRepsData = () => {
        getGroupReps()
            .then((groupReps) => {
                console.log('Group Reps:', groupReps);
                setGroupReps(groupReps);
            })
            .catch((error) => {
                console.error('Error fetching group reps:', error);
            });
    };

    const getDistrictsData = () => {
        getDistricts()
            .then((districts) => {
                console.log('Districts:', districts);
                setDistricts(districts);
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    };

    const getAreasData = () => {
        getAreas()
            .then((areas) => {
                console.log('Areas:', areas);
                setAreas(areas);
            })
            .catch((error) => {
                console.error('Error fetching areas:', error);
            });
    };

//////////// HANDLERS

    const changeMeetingState = (event) => {
        const { id, value } = event.target;
        setCurrentMeeting(prevMeeting => ({
            ...prevMeeting,
            [id]: value
        }));
    }

    const handleDayChange = (event) => {
        const { value } = event.target;

        // Log the current value and selectedDays before the update
        console.log('Current value:', value);
        console.log('Before update - selectedDays:', selectedDays);

        // Check if the selected day is already in the list, and add/remove it accordingly
        setSelectedDays((prevSelectedDays) => {
            if (prevSelectedDays.includes(value)) {
                return prevSelectedDays.filter((day) => day !== value);
            } else {
                return [...prevSelectedDays, value];
            }
        });

        // Log the updated selectedDays after the update
        console.log('After update - selectedDays:', selectedDays);
    };

    const handleTypeChange = (selectedType) => {
        setSelectedType(selectedType.id);
    };

    const handleGroupRepChange = (event) => {
        const { value } = event.target;
        if (event.ctrlKey) {
            // Ctrl+click behavior: Add or remove the clicked group rep
            setSelectedGroupReps((prevSelectedGroupReps) => {
                if (prevSelectedGroupReps.includes(value)) {
                    return prevSelectedGroupReps.filter((rep) => rep !== value);
                } else {
                    return [...prevSelectedGroupReps, value];
                }
            });
        } else {
            // Dropdown selection behavior: Replace the selection with the clicked group rep
            setSelectedGroupReps([value]);
        }
    };

    const handleDistrictChange = (event) => {
        const { value } = event.target;
        if (event.ctrlKey) {
            // Ctrl+click behavior: Add or remove the clicked district
            setCurrentDistrict((prevCurrentDistrict) => {
                if (prevCurrentDistrict.includes(value)) {
                    return prevCurrentDistrict.filter((district) => district !== value);
                } else {
                    return [...prevCurrentDistrict, value];
                }
            });
        } else {
            // Dropdown selection behavior: Replace the selection with the clicked district
            setCurrentDistrict([value]);
        }
    };

    const handleAreaChange = (event) => {
        const { value } = event.target;
        if (event.ctrlKey) {
            // Ctrl+click behavior: Add or remove the clicked area
            setCurrentArea((prevCurrentArea) => {
                if (prevCurrentArea.includes(value)) {
                    return prevCurrentArea.filter((area) => area !== value);
                } else {
                    return [...prevCurrentArea, value];
                }
            });
        } else {
            // Dropdown selection behavior: Replace the selection with the clicked area
            setCurrentArea([value]);
        }
    };


    const handleSave = (evt) => {
        evt.preventDefault();

        const updatedMeeting = {
            // Use the currentMeeting state for updated data
            wso_id: currentMeeting.wso_id,
            district: currentMeeting.district,
            area: currentMeeting.area,
            meeting_name: currentMeeting.meeting_name,
            day: currentMeeting.day,
            start_time: currentMeeting.start_time,
            street_address: currentMeeting.street_address,
            city: currentMeeting.city,
            zip: currentMeeting.zip,
            location_details: currentMeeting.location_details,
            type: currentMeeting.type,
            zoom_login: currentMeeting.zoom_login,
            zoom_pass: currentMeeting.zoom_pass,
            email: currentMeeting.email,
            phone: currentMeeting.phone,
            group_rep: currentMeeting.group_rep,
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
                            <label>Days:</label>
                            {days.map(day => (
                                <label key={day.id}>
                                    <input
                                        type="checkbox"
                                        value={day.id}
                                        checked={currentMeeting.days.includes(day.id)}
                                        onChange={handleDayChange}
                                    />
                                    {day.day}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="start_time">Start Time:</label>
                            <input
                                type="time"
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
                            <label> Type:</label>
                            <div className="meeting-control">
                                {types.map((type) => (
                                    <label key={type.id}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type.id}
                                            checked={currentMeeting.type === type.id}
                                            onChange={() => handleTypeChange(type)}
                                        />
                                        {type.type_name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label> District:</label>
                            <div className="meeting-control">
                                {districts.map((district) => (
                                    <label key={district.id}>
                                        <input
                                            type="radio"
                                            name="district"
                                            value={district.id}
                                            checked={currentMeeting.district === district.id}
                                            onChange={() => handleTypeChange(district)}
                                        />
                                        {district.district_number}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label>Area:</label>
                            <select
                                single="true"
                                value={currentMeeting.area}
                                onChange={handleAreaChange}
                            >
                            </select>
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
                            <label htmlFor="street_address">Street Address:</label>
                            <input
                                type="text"
                                id="street_address"
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
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                required
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.city}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="zip">Zip:</label>
                            <input
                                type="number"
                                id="zip"
                                required
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.zip}
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
                                type="number"
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
                            <label htmlFor="zoom_pass">Zoom Password:</label>
                            <input
                                type="number"
                                id="zoom_pass"
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
                                type="text"
                                id="email"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.email}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                autoFocus
                                className="meeting-control"
                                value={currentMeeting.phone}
                                onChange={changeMeetingState}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label>Group Rep:</label>
                            <select
                                multiple
                                value={currentMeeting.group_reps.map((group_rep) => group_rep.id)}
                                onChange={handleGroupRepChange}
                            >
                                {groupReps.map((group_rep) => (
                                    <option key={group_rep.id} value={group_rep.id}>
                                        {group_rep.user.first_name} {group_rep.user.last_name}
                                    </option>
                                ))}
                            </select>
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