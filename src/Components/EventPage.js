import React, {useEffect, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import Profile from "./Profile";
import {getUser} from "../user";

export default function EventPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const user = getUser();

    const get = useCallback(() => {
        const events = JSON.parse(localStorage.getItem("events"));
        setEvents(events?.filter(o => o.userId === user?.id) || []);
    }, [user?.id]);

    useEffect(() => {
        get();
    }, [get]);

    const deleteEvent = (id) => {
        const data = [];
        const events = JSON.parse(localStorage.getItem("events"));
        data.push(...events.filter(e => e.id !== id));
        localStorage.setItem("events", JSON.stringify(data));
        get();
    }

    return (
        <div>
            <Profile children={
                <button 
                    style={{
                        backgroundColor: "#3498db",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        minWidth: "140px",
                        justifyContent: "center",
                        whiteSpace: "nowrap"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#2980b9";
                        e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#3498db";
                        e.target.style.transform = "translateY(0)";
                    }}
                    onClick={() => navigate("/events/new")}
                >
                    <span>➕</span>
                    Add Event
                </button>
            }/>
            <div className="eventPage">
                <div className="table-container table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th width="6%">
                                Sr No.
                            </th>
                            <th>
                                Event Name
                            </th>
                            <th>
                                Event Description
                            </th>
                            <th>
                                Event Date
                            </th>
                            <th>
                                Start Time
                            </th>
                            <th>
                                End Time
                            </th>
                            <th>
                                Event Price
                            </th>
                            <th>
                                Event Type
                            </th>
                            <th width="10%" colSpan="2">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            events?.map((item, i) => (
                                <tr key={i}>
                                    <td data-label="Sr No">
                                        {i + 1}
                                    </td>
                                    <td data-label="Event Name">
                                        {item.name}
                                    </td>
                                    <td data-label="Event Description">
                                        {item.description}
                                    </td>
                                    <td data-label="Event Date">
                                        {item.date}
                                    </td>
                                    <td data-label="Start Time">
                                        {item.startTime}
                                    </td>
                                    <td data-label="End Time">
                                        {item.endTime}
                                    </td>
                                    <td data-label="Event Price">
                                        ${item.price}
                                    </td>
                                    <td data-label="Event Type">
                                        {item.type}
                                    </td>
                                    <td data-label="Actions">
                                        <button onClick={() => navigate(`/events/${item.id}`)}>Edit</button>
                                        <button onClick={() => deleteEvent(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
                {
                    !events.length &&
                    <p style={{textAlign: "center", marginTop: "15px", fontSize: "18px", color: "#666"}}>No events found. Create your first event!</p>
                }
            </div>
        </div>
    )
}