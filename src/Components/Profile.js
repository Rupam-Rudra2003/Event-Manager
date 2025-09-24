import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUser} from "../user";

export default function Profile({children}) {
    const navigate = useNavigate();
    const user = getUser();
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(user?.name || "");
    
    const saveName = () => {
        if (tempName.trim()) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                users[userIndex].name = tempName.trim();
                localStorage.setItem("users", JSON.stringify(users));
                setIsEditing(false);
                // Force a re-render by navigating to the current page
                window.location.reload();
            }
        }
    };

    const cancelEdit = () => {
        setTempName(user?.name || "");
        setIsEditing(false);
    };

    const startEdit = () => {
        setIsEditing(true);
        setTempName(user?.name || "");
    };
    
    const logOut = () => {
        const users = [];

        users.push(...JSON.parse(localStorage.getItem("users")) || []);

        const user = users.find((u) => u.login);
        if (user) {
            user.login = undefined;
            localStorage.setItem("users", JSON.stringify(users));
            navigate("/");
        }
    }
    return (
        <div style={{
            backgroundColor: "#2c3e50",
            color: "white",
            padding: "15px 30px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginBottom: "20px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                maxWidth: "1200px",
                margin: "0 auto"
            }}>
                {/* Left side - App Title */}
                <div style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#ecf0f1"
                }}>
                    Event Manager
                </div>

                {/* Center - Navigation */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    {children}
                </div>

                {/* Right side - Profile Section */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                }}>
                    {/* Profile Name Section */}
                    {isEditing ? (
                        <div style={{
                            display: "flex", 
                            alignItems: "center", 
                            gap: "10px"
                        }}>
                            <input 
                                type="text" 
                                value={tempName} 
                                onChange={(e) => setTempName(e.target.value)}
                                style={{
                                    fontSize: "16px",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "4px",
                                    outline: "none",
                                    minWidth: "150px"
                                }}
                                onKeyPress={(e) => e.key === 'Enter' && saveName()}
                                autoFocus
                            />
                            <button 
                                onClick={saveName}
                                style={{
                                    backgroundColor: "#27ae60",
                                    color: "white",
                                    border: "none",
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    transition: "background-color 0.3s"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#2ecc71"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#27ae60"}
                            >
                                ✓
                            </button>
                            <button 
                                onClick={cancelEdit}
                                style={{
                                    backgroundColor: "#e74c3c",
                                    color: "white",
                                    border: "none",
                                    padding: "6px 12px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    transition: "background-color 0.3s"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#c0392b"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#e74c3c"}
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#34495e",
                            padding: "8px 15px",
                            borderRadius: "25px",
                            cursor: "pointer",
                            transition: "background-color 0.3s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#4a5f7a"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#34495e"}
                        >
                            <div style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "#3498db",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}>
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <span style={{
                                fontSize: "16px",
                                fontWeight: "500"
                            }}>
                                {user?.name || "User"}
                            </span>
                            <button 
                                onClick={startEdit}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "#bdc3c7",
                                    border: "none",
                                    padding: "4px",
                                    borderRadius: "3px",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                    transition: "color 0.3s"
                                }}
                                onMouseOver={(e) => e.target.style.color = "#ecf0f1"}
                                onMouseOut={(e) => e.target.style.color = "#bdc3c7"}
                            >
                                ✏️
                            </button>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button 
                        onClick={logOut}
                        style={{
                            backgroundColor: "#e74c3c",
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
                            minWidth: "120px",
                            justifyContent: "center",
                            whiteSpace: "nowrap"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "#c0392b";
                            e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "#e74c3c";
                            e.target.style.transform = "translateY(0)";
                        }}
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}