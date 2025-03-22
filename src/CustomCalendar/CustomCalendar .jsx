import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import moment from "moment";

const CustomCalendar = ({selectedDate,setSelectedDate}) => {
 

  return (
    <div className="hero text-left bg-gray-50 mb-5">
      <div className=" sm:w-full flex flex-col items-start">
        <div className="p-5 bg-white rounded-lg shadow-lg">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            // Optional: add styles prop to override specific parts of the calendar
            styles={{
              caption: { color: "#0d9488", fontWeight: "bold" }, // Tailwind teal-600
              head: { color: "#14b8a6" }, // Tailwind teal-500
              day_selected: {
                backgroundColor: "#0ea5e9", // Tailwind sky-500
                color: "white"
              },
              day_today: {
                fontWeight: "bold",
                border: "1px solid #0ea5e9",
                color: "#0ea5e9"
              }
            }}
            // Optional: show outside days or not
            showOutsideDays
          />
        </div>
        <div className="mt-4 text-lg font-semibold text-teal-700">
          Selected Date: {selectedDate?.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
