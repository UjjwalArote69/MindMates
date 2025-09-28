import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/Icons/Back Arrow.svg";
import PasswordIcon from "../../assets/Icons/Security Lock Icon.svg";
import CalendarIcon from "../../assets/Icons/Calender Icon.svg";
import LocationIcon from "../../assets/Icons/Location Icon.svg";
import EditIcon from "../../assets/Icons/Edit Pencil Icon.svg";
import UserIcon from "../../assets/Icons/Profile Icon Outline.svg";
import WeightIcon from "../../assets/Icons/Weight Icon.svg";
import HeightIcon from "../../assets/Icons/Height Anatomy Spine Icon.svg";
import CheckIcon from "../../assets/Icons/Check Icon.svg";
import CloseIcon from "../../assets/Icons/Close Icon.svg";
import { updateUser } from "../../services/user.service";
import { useUserStore } from "../../store/userStore";

const PersonalInfo: React.FC = () => {

  const { user, loading, initialized } = useUserStore();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Editable states
  const [username, setUsername] = useState(user?.name || "");
  const [tempUsername, setTempUsername] = useState(username);
  const [isEditingName, setIsEditingName] = useState(false);

  const [password, setPassword] = useState("********");
  const [tempPassword, setTempPassword] = useState(password);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [weight, setWeight] = useState<number | undefined>(user?.weight);
  const [height, setHeight] = useState<number | undefined>(user?.height);
  const [birthDate, setBirthDate] = useState(
    user?.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : ""
  );
  const [selectedGender, setSelectedGender] = useState(user?.gender || "other");


  // Redirect if user is not logged in
  useEffect(() => {
    if (initialized && !loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, initialized, navigate]);

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9F5F2]">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-[#4E342E] border-t-transparent rounded-full animate-spin"></div>
          {/* Loading Text */}
          <p className="text-[#4E342E] font-semibold text-lg">
            Loading your MindMates...
          </p>
          {/* Subtext */}
          <p className="text-gray-500 text-sm text-center max-w-xs">
            Fetching your profile and personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  const saveName = () => {
    setUsername(tempUsername);
    setIsEditingName(false);
  };
  const cancelName = () => {
    setTempUsername(username);
    setIsEditingName(false);
  };
  const savePassword = () => {
    setPassword(tempPassword);
    setIsEditingPassword(false);
  };
  const cancelPassword = () => {
    setTempPassword(password);
    setIsEditingPassword(false);
  };

  const updateUserProfile = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await updateUser({
        updatedName: username,
        updatedPassword: password !== "********" ? password : undefined,
        updatedGender: selectedGender,
        updatedWeight: weight,
        updatedHeight: height,
        updatedBirthDate: birthDate ? new Date(birthDate) : undefined,
      });

      // Update global store
      setUser(res.user);
      navigate("/profile", { state: { updated: true } });
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] px-5 py-6 text-[#4B2E2B]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/profile")}>
          <img src={BackArrow} alt="Back" className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Personal Information</h1>
      </div>

      {/* Username */}
      <div className="mb-5">
        <label className="text-sm font-semibold mb-1 block">Username</label>
        <EditableField
          icon={UserIcon}
          value={isEditingName ? tempUsername : username}
          onChange={(e) => setTempUsername(e.target.value)}
          isEditing={isEditingName}
          onSave={saveName}
          onCancel={cancelName}
          onEdit={() => setIsEditingName(true)}
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="text-sm font-semibold mb-1 block">Password</label>
        <EditableField
          icon={PasswordIcon}
          value={isEditingPassword ? tempPassword : password}
          type={isEditingPassword ? "text" : "password"}
          onChange={(e) => setTempPassword(e.target.value)}
          isEditing={isEditingPassword}
          onSave={savePassword}
          onCancel={cancelPassword}
          onEdit={() => setIsEditingPassword(true)}
        />
      </div>

      {/* Date of Birth */}
      <div className="mb-5">
        <label className="text-sm font-semibold mb-1 block">
          Date of Birth
        </label>
        <InputWrapper icon={CalendarIcon}>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="bg-transparent text-sm outline-none w-full"
          />
        </InputWrapper>
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="text-sm font-semibold mb-1 block">Location</label>
        <InputWrapper icon={LocationIcon}>
          <select
            className="bg-transparent text-sm outline-none w-full"
            defaultValue="Delhi, India"
          >
            <option>Tokyo, Japan</option>
            <option>New York, USA</option>
            <option>Delhi, India</option>
          </select>
        </InputWrapper>
      </div>

      {/* Weight & Height */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="text-sm font-semibold mb-1 block">
            Weight (kg)
          </label>
          <InputWrapper icon={WeightIcon}>
            <input
              type="number"
              value={weight ?? ""}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="Weight (kg)"
              className="bg-transparent text-sm outline-none w-full"
            />
          </InputWrapper>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1 block">
            Height (cm)
          </label>
          <InputWrapper icon={HeightIcon}>
            <input
              type="number"
              value={height ?? ""}
              onChange={(e) => setHeight(Number(e.target.value))}
              placeholder="Height (cm)"
              className="bg-transparent text-sm outline-none w-full"
            />
          </InputWrapper>
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <label className="text-sm font-semibold mb-1 block">Gender</label>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">Choose only 1</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["male", "female", "transgender", "other"].map((g) => (
            <GenderOption
              key={g}
              label={g.charAt(0).toUpperCase() + g.slice(1)}
              active={selectedGender === g}
              onClick={() => setSelectedGender(g)}
            />
          ))}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Save */}
      <button
        onClick={updateUserProfile}
        disabled={saving}
        className="w-full py-3 rounded-full bg-[#4B2E2B] text-white font-semibold disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

// --- Reusable Components ---
const InputWrapper = ({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center bg-white rounded-full shadow-sm px-4 py-3 mb-5">
    <img src={icon} alt="icon" className="w-5 h-5 mr-2" />
    {children}
  </div>
);

const EditableField = ({
  icon,
  value,
  onChange,
  type = "text",
  isEditing,
  onSave,
  onCancel,
  onEdit,
}: {
  icon: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}) => (
  <div
    className={`flex items-center justify-between bg-white rounded-full shadow-sm px-4 py-3 mb-5 transition ${
      isEditing ? "ring-2 ring-amber-500 bg-amber-50" : ""
    }`}
  >
    <div className="flex items-center gap-3 w-full">
      <img src={icon} alt="icon" className="w-5 h-5" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        className={`bg-transparent text-sm outline-none w-full ${
          !isEditing && "cursor-not-allowed"
        }`}
      />
    </div>
    {isEditing ? (
      <div className="flex gap-2">
        <button onClick={onSave}>
          <img src={CheckIcon} alt="Save" className="w-5 h-5" />
        </button>
        <button onClick={onCancel}>
          <img src={CloseIcon} alt="Cancel" className="w-5 h-5" />
        </button>
      </div>
    ) : (
      <button onClick={onEdit}>
        <img src={EditIcon} alt="Edit" className="w-5 h-5" />
      </button>
    )}
  </div>
);

const GenderOption = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center justify-between px-4 py-3 rounded-full border transition cursor-pointer ${
      active ? "bg-[#f97316] text-white" : "bg-white text-[#4B2E2B] shadow-sm"
    }`}
  >
    <span className="text-sm font-medium">{label}</span>
    <span
      className={`w-4 h-4 rounded-full border-2 ${
        active ? "bg-amber-800" : "border-gray-400"
      }`}
    />
  </div>
);

export default PersonalInfo;
