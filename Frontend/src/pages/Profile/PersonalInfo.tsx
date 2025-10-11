import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/Icons/Back Arrow.svg";
import PasswordIcon from "../../assets/Icons/Security Lock Icon.svg";
import CalendarIcon from "../../assets/Icons/Calender Icon.svg";
import LocationIcon from "../../assets/Icons/Location Icon.svg";
import UserIcon from "../../assets/Icons/Profile Icon Outline.svg";
import WeightIcon from "../../assets/Icons/Weight Icon.svg";
import HeightIcon from "../../assets/Icons/Height Anatomy Spine Icon.svg";
import { updateUser } from "../../services/user.service";
import { useUserStore } from "../../store/userStore";
import { Check, X, Edit2, Save } from "lucide-react";

const PersonalInfo: React.FC = () => {
  const { user, loading, initialized } = useUserStore();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  useEffect(() => {
    if (initialized && !loading && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, initialized, navigate]);

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#A3B763] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#4E342E] font-semibold text-lg">Loading...</p>
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
    setSuccess(false);
    
    try {
      const res = await updateUser({
        updatedName: username,
        updatedPassword: password !== "********" ? password : undefined,
        updatedGender: selectedGender,
        updatedWeight: weight,
        updatedHeight: height,
        updatedBirthDate: birthDate ? new Date(birthDate) : undefined,
      });

      setUser(res.user);
      setSuccess(true);
      
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] md:pl-[100px] overflow-hidden pb-safe">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#A3B763]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8676E2]/10 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 md:px-5 py-6 md:py-8 pb-24 md:pb-8">
        {/* ✅ Enhanced Mobile Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="w-12 h-12 rounded-full bg-white backdrop-blur-sm shadow-lg flex items-center justify-center active:scale-95 transition-all touch-manipulation"
          >
            <img src={BackArrow} alt="Back" className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-[#4B2E2B]">Personal Info</h1>
            <p className="text-xs md:text-sm text-gray-500">Update your details</p>
          </div>
        </div>

        {/* ✅ Mobile-Optimized Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-5 md:p-8 border border-white/20 space-y-5">
          {/* Username */}
          <FormSection label="Username">
            <EditableField
              icon={UserIcon}
              value={isEditingName ? tempUsername : username}
              onChange={(e) => setTempUsername(e.target.value)}
              isEditing={isEditingName}
              onSave={saveName}
              onCancel={cancelName}
              onEdit={() => setIsEditingName(true)}
              placeholder="Enter username"
            />
          </FormSection>

          {/* Password */}
          <FormSection label="Password">
            <EditableField
              icon={PasswordIcon}
              value={isEditingPassword ? tempPassword : password}
              type={isEditingPassword ? "text" : "password"}
              onChange={(e) => setTempPassword(e.target.value)}
              isEditing={isEditingPassword}
              onSave={savePassword}
              onCancel={cancelPassword}
              onEdit={() => setIsEditingPassword(true)}
              placeholder="Enter password"
            />
          </FormSection>

          {/* Date of Birth */}
          <FormSection label="Date of Birth">
            <InputWrapper icon={CalendarIcon}>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="bg-transparent text-sm md:text-base outline-none w-full text-[#4B2E2B] font-medium touch-manipulation"
              />
            </InputWrapper>
          </FormSection>

          {/* Location */}
          <FormSection label="Location">
            <InputWrapper icon={LocationIcon}>
              <select
                className="bg-transparent text-sm md:text-base outline-none w-full text-[#4B2E2B] font-medium touch-manipulation"
                defaultValue="Delhi, India"
              >
                <option>Tokyo, Japan</option>
                <option>New York, USA</option>
                <option>Delhi, India</option>
                <option>London, UK</option>
                <option>Sydney, Australia</option>
              </select>
            </InputWrapper>
          </FormSection>

          {/* ✅ Mobile-Optimized Weight & Height */}
          <div className="grid grid-cols-2 gap-3">
            <FormSection label="Weight (kg)">
              <MobileInput
                icon={WeightIcon}
                type="number"
                value={weight ?? ""}
                onChange={(e) => setWeight(Number(e.target.value))}
                placeholder="70"
              />
            </FormSection>

            <FormSection label="Height (cm)">
              <MobileInput
                icon={HeightIcon}
                type="number"
                value={height ?? ""}
                onChange={(e) => setHeight(Number(e.target.value))}
                placeholder="175"
              />
            </FormSection>
          </div>

          {/* ✅ Mobile-Optimized Gender Selection */}
          <FormSection label="Gender">
            <div className="grid grid-cols-2 gap-2.5">
              {["male", "female", "transgender", "other"].map((g) => (
                <GenderOption
                  key={g}
                  label={g.charAt(0).toUpperCase() + g.slice(1)}
                  active={selectedGender === g}
                  onClick={() => setSelectedGender(g)}
                />
              ))}
            </div>
          </FormSection>

          {/* Error/Success - Mobile Optimized */}
          {error && (
            <div className="flex items-start gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl border border-red-200">
              <X size={18} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-600 rounded-xl border border-green-200">
              <Check size={18} className="flex-shrink-0" />
              <p className="text-sm font-medium">Profile updated!</p>
            </div>
          )}

          {/* ✅ Mobile-Optimized Save Button */}
          <button
            onClick={updateUserProfile}
            disabled={saving || success}
            className="w-full py-4 md:py-5 rounded-2xl bg-gradient-to-r from-[#A3B763] to-[#8fa054] text-white text-base md:text-lg font-bold shadow-lg active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 touch-manipulation"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : success ? (
              <>
                <Check size={22} />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save size={22} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Mobile-Optimized Components

const FormSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-xs md:text-sm font-bold text-[#4B2E2B] px-1">
      {label}
    </label>
    {children}
  </div>
);

const InputWrapper = ({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center bg-white rounded-2xl shadow-md px-3 md:px-4 py-3.5 md:py-4 border border-gray-100 active:shadow-lg transition-all">
    <div className="w-10 h-10 bg-gradient-to-br from-[#F8F6F3] to-[#F0EBE6] rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
      <img src={icon} alt="" className="w-5 h-5" />
    </div>
    {children}
  </div>
);

const MobileInput = ({
  icon,
  type,
  value,
  onChange,
  placeholder,
}: {
  icon: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div className="flex items-center bg-white rounded-2xl shadow-md px-3 py-3.5 border border-gray-100">
    <div className="w-9 h-9 bg-gradient-to-br from-[#F8F6F3] to-[#F0EBE6] rounded-xl flex items-center justify-center mr-2 flex-shrink-0">
      <img src={icon} alt="" className="w-4 h-4" />
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-transparent text-sm outline-none w-full text-[#4B2E2B] font-medium touch-manipulation"
    />
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
  placeholder,
}: {
  icon: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  placeholder?: string;
}) => (
  <div
    className={`flex items-center justify-between rounded-2xl shadow-md px-3 md:px-4 py-3.5 md:py-4 border transition-all ${
      isEditing
        ? "bg-[#A3B763]/5 ring-2 ring-[#A3B763] border-[#A3B763]/50"
        : "bg-white border-gray-100"
    }`}
  >
    <div className="flex items-center gap-2.5 md:gap-3 w-full">
      <div className="w-10 h-10 bg-gradient-to-br from-[#F8F6F3] to-[#F0EBE6] rounded-xl flex items-center justify-center flex-shrink-0">
        <img src={icon} alt="" className="w-5 h-5" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={!isEditing}
        placeholder={placeholder}
        className={`bg-transparent text-sm md:text-base font-medium outline-none w-full text-[#4B2E2B] touch-manipulation ${
          !isEditing && "opacity-70"
        }`}
      />
    </div>

    {isEditing ? (
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onSave}
          className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-md touch-manipulation"
        >
          <Check size={18} className="text-white" />
        </button>
        <button
          onClick={onCancel}
          className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-md touch-manipulation"
        >
          <X size={18} className="text-white" />
        </button>
      </div>
    ) : (
      <button
        onClick={onEdit}
        className="w-10 h-10 bg-gradient-to-br from-[#A3B763] to-[#8fa054] rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-md flex-shrink-0 touch-manipulation"
      >
        <Edit2 size={16} className="text-white" />
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
  <button
    onClick={onClick}
    className={`relative flex items-center justify-between px-4 py-3.5 md:py-4 rounded-2xl border-2 transition-all overflow-hidden active:scale-98 touch-manipulation ${
      active
        ? "bg-gradient-to-r from-[#A3B763] to-[#8fa054] border-[#A3B763] text-white shadow-lg"
        : "bg-white border-gray-200 text-[#4B2E2B]"
    }`}
  >
    {active && (
      <div className="absolute inset-0 bg-white/10"></div>
    )}
    <span className="relative text-sm md:text-base font-bold z-10">{label}</span>
    <div
      className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 flex-shrink-0 ${
        active ? "bg-white border-white" : "border-gray-300"
      }`}
    >
      {active && <Check size={12} className="text-[#A3B763]" />}
    </div>
  </button>
);

export default PersonalInfo;
