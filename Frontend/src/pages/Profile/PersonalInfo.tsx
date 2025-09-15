// import React from "react";
import BackArrow from "../../assets/Icons/Back Arrow.svg";
import PasswordIcon from "../../assets/Icons/Security Lock Icon.svg";
import CalendarIcon from "../../assets/Icons/Calender Icon.svg";
import LocationIcon from "../../assets/Icons/Location Icon.svg";
import EditIcon from "../../assets/Icons/Edit Pencil Icon.svg";
import { useNavigate } from "react-router-dom";

const PersonalInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] px-5 py-6 text-[#4B2E2B]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/profile")}
        >
          <img src={BackArrow} alt="Back" className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Personal Information</h1>
      </div>

      {/* Password */}
      <div className="flex items-center justify-between bg-white rounded-full shadow-sm px-4 py-3 mb-5">
        <div className="flex items-center gap-3">
          <img src={PasswordIcon} alt="Password" className="w-5 h-5" />
          <input
            type="password"
            value="********************"
            disabled
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
        <img src={EditIcon} alt="Edit" className="w-5 h-5" />
      </div>

      {/* Date of Birth */}
      <div className="flex items-center justify-between bg-white rounded-full shadow-sm px-4 py-3 mb-5">
        <div className="flex items-center gap-3">
          <img src={CalendarIcon} alt="Calendar" className="w-5 h-5" />
          <input
            type="text"
            value="Jun 24, 2005"
            disabled
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
        <img src={EditIcon} alt="Edit" className="w-5 h-5" />
      </div>

      {/* Location */}
      <div className="flex items-center justify-between bg-white rounded-full shadow-sm px-4 py-3 mb-5">
        <div className="flex items-center gap-3 w-full">
          <img src={LocationIcon} alt="Location" className="w-5 h-5" />
          <select
            className="bg-transparent text-sm outline-none w-full"
            defaultValue="Tokyo, Japan"
          >
            <option>Tokyo, Japan</option>
            <option>New York, USA</option>
            <option>Delhi, India</option>
          </select>
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold">Gender</span>
          <span className="text-xs text-gray-500">Choose only 1</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <GenderOption label="Male" />
          <GenderOption label="Female" active />
          <GenderOption label="Transgender" activeColor="bg-[#f97316]" />
          <GenderOption label="Other" />
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full py-3 rounded-full bg-[#4B2E2B] text-white font-semibold">
        Save Settings
      </button>
    </div>
  );
};

// Gender option component
const GenderOption = ({
  label,
  active,
  activeColor,
}: {
  label: string;
  active?: boolean;
  activeColor?: string;
}) => {
  return (
    <label
      className={`flex items-center justify-between px-4 py-3 rounded-full border transition cursor-pointer ${
        active
          ? `${activeColor || "bg-[#f97316] text-white"}`
          : "bg-white text-[#4B2E2B] shadow-sm"
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <input type="radio" name="gender" className="hidden" defaultChecked={active} />
      <span
        className={`w-4 h-4 rounded-full border ${
          active ? "border-white bg-white" : "border-gray-400"
        }`}
      />
    </label>
  );
};

export default PersonalInfo;
