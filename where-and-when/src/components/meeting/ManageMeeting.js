// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { deleteMeeting, updateMeeting } from "../../managers/MeetingManager";

// export const ManageMeeting = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const queryParams = new URLSearchParams(location.search);
//     const action = queryParams.get("action");
//     const meetingId = queryParams.get("id");

//     const [editedMeetingData, setEditedMeetingData] = useState({});

//     const handleSave = () => {
//         updateMeeting(meetingId, editedMeetingData)
//             .then(() => {
//                 // Meeting updated successfully
//                 navigate("/"); // Redirect back to the meeting list
//             })
//             .catch((error) => {
//                 console.error("Error updating meeting:", error);
//             });
//     };

//     const handleDelete = () => {
//         deleteMeeting(meetingId)
//             .then(() => {
//                 // Meeting deleted successfully
//                 navigate("/"); // Redirect back to the meeting list
//             })
//             .catch((error) => {
//                 console.error("Error deleting meeting:", error);
//             });
//     };

//     return (
//         <div className="manage-meeting">
//             <h2>{action === "edit" ? "Edit Meeting" : "Delete Meeting"}</h2>
//             <div className="editable-fields">
//                 {action === "edit" && (
//                     <>
//                         <div className="form-group">
//                             <label htmlFor="day">Day:</label>
//                             <input
//                                 type="number"
//                                 id="day"
//                                 value={editedMeetingData.day || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         day: parseInt(e.target.value) || null,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="start_time">Start Time:</label>
//                             <input
//                                 type="text"
//                                 id="start_time"
//                                 value={editedMeetingData.start_time || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         start_time: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="meeting_name">Meeting Name:</label>
//                             <input
//                                 type="text"
//                                 id="meeting_name"
//                                 value={editedMeetingData.meeting_name || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         meeting_name: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="type">Type:</label>
//                             <input
//                                 type="number"
//                                 id="type"
//                                 value={editedMeetingData.type || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         type: parseInt(e.target.value) || null,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="district">District:</label>
//                             <input
//                                 type="number"
//                                 id="district"
//                                 value={editedMeetingData.district || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         district: parseInt(e.target.value) || null,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="area">Area:</label>
//                             <input
//                                 type="number"
//                                 id="area"
//                                 value={editedMeetingData.area || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         area: parseInt(e.target.value) || null,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="wso_id">WSO ID:</label>
//                             <input
//                                 type="number"
//                                 id="wso_id"
//                                 value={editedMeetingData.wso_id || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         wso_id: parseInt(e.target.value) || null,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="address">Address:</label>
//                             <input
//                                 type="text"
//                                 id="address"
//                                 value={editedMeetingData.address || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         address: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="location_details">Location Details:</label>
//                             <input
//                                 type="text"
//                                 id="location_details"
//                                 value={editedMeetingData.location_details || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         location_details: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="zoom_login">Zoom Login:</label>
//                             <input
//                                 type="text"
//                                 id="zoom_login"
//                                 value={editedMeetingData.zoom_login || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         zoom_login: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="zoom_password">Zoom Password:</label>
//                             <input
//                                 type="text"
//                                 id="zoom_password"
//                                 value={editedMeetingData.zoom_password || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         zoom_password: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="email">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={editedMeetingData.email || ""}
//                                 onChange={(e) =>
//                                     setEditedMeetingData({
//                                         ...editedMeetingData,
//                                         email: e.target.value,
//                                     })
//                                 }
//                             />
//                         </div>


//                         <button onClick={handleSave}>Save</button>
//                     </>
//                 )}

//                 {/* Confirmation for delete action */}
//                 {action === "delete" && (
//                     <>
//                         <p>Are you sure you want to delete this meeting?</p>
//                         <button onClick={handleDelete}>Delete</button>
//                     </>
//                 )}
//             </div>
//         </div >
//     );
// };
