import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const CustomCalendarSm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null); // Reference for the calendar dropdown

  // Close the calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex flex-col items-center mb-20">
      {/* Button to Open Calendar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100"
      >
        {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
      </button>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div ref={calendarRef} className="absolute mt-2 bg-white p-4 rounded-lg shadow-md z-10">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setIsOpen(false); // Close calendar after selection
            }}
            className="w-full"
            showOutsideDays
            styles={{
              caption: { color: "#0d9488", fontWeight: "bold" }, // Month name
              head: { color: "#14b8a6" }, // Weekday headers
              day_selected: {
                backgroundColor: "#0ea5e9", // Selected date color
                color: "white",
                borderRadius: "50%",
              },
              day_today: {
                fontWeight: "bold",
                border: "2px solid #0ea5e9",
                color: "#0ea5e9",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomCalendarSm;
