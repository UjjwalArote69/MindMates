import {
  useState,
  useCallback,
} from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";
import {
  Phone,
  UserPlus,
  Edit2,
  Trash2,
  X,
  Check,
  Users,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string; // Format: "+CC number"
}

const countries = [
  {
    code: "+91",
    name: "India",
    flag: "🇮🇳",
  },
  {
    code: "+1",
    name: "USA",
    flag: "🇺🇸",
  },
  {
    code: "+81",
    name: "Japan",
    flag: "🇯🇵",
  },
  {
    code: "+44",
    name: "UK",
    flag: "🇬🇧",
  },
  {
    code: "+61",
    name: "Australia",
    flag: "🇦🇺",
  },
];

// Helper to split phone into country code and number parts safely
const splitPhone = (
  phone: string
): [string, string] => {
  const parts = phone.split(" ");
  return [
    parts[0] || "+91",
    parts.slice(1).join(" ") || "",
  ];
};

const Emergency = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] =
    useState<Contact[]>([
      {
        id: 1,
        name: "Police",
        relation: "Police",
        phone: "100",
      },
      {
        id: 2,
        name: "Fire Services",
        relation: "Fire Police",
        phone: "101",
      },
      {
        id: 3,
        name: "Ambulance",
        relation: "Hospital",
        phone: "108",
      },
      {
        id: 4,
        name: "Women in distress",
        relation: "Police",
        phone: "1091",
      },
      {
        id: 5,
        name: "Children in distress",
        relation: "Police",
        phone: "1098",
      },
    ]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [
    editingContactId,
    setEditingContactId,
  ] = useState<number | null>(null);
  const [contactForm, setContactForm] =
    useState<Contact>({
      id: 0,
      name: "",
      relation: "",
      phone: "+91 ",
    });

  const openAddModal =
    useCallback(() => {
      setEditingContactId(null);
      setContactForm({
        id: 0,
        name: "",
        relation: "",
        phone: "+91 ",
      });
      setIsModalOpen(true);
    }, []);

  const openEditModal = useCallback(
    (contact: Contact) => {
      setEditingContactId(contact.id);
      setContactForm(contact);
      setIsModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingContactId(null);
    setContactForm({
      id: 0,
      name: "",
      relation: "",
      phone: "+91 ",
    });
  }, []);

  const handleInputChange = (
    field: keyof Contact,
    value: string
  ) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhoneCountryChange = (
    countryCode: string
  ) => {
    const [, number] = splitPhone(
      contactForm.phone
    );
    setContactForm((prev) => ({
      ...prev,
      phone: `${countryCode} ${number}`,
    }));
  };

  const handlePhoneNumberChange = (
    number: string
  ) => {
    const [countryCode] = splitPhone(
      contactForm.phone
    );
    setContactForm((prev) => ({
      ...prev,
      phone: `${countryCode} ${number}`,
    }));
  };

  const handleSaveContact = () => {
    if (
      !contactForm.name.trim() ||
      !contactForm.relation.trim()
    )
      return;

    const [countryCode, phoneNumber] =
      splitPhone(contactForm.phone);
    if (!phoneNumber.trim()) return; // phone number required

    const normalizedPhone = `${countryCode} ${phoneNumber.trim()}`;

    if (editingContactId) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === editingContactId
            ? {
                ...contactForm,
                phone: normalizedPhone,
                id: editingContactId,
              }
            : c
        )
      );
    } else {
      setContacts((prev) => [
        ...prev,
        {
          ...contactForm,
          phone: normalizedPhone,
          id: Date.now(),
        },
      ]);
    }

    closeModal();
  };

  const handleRemoveContact = (
    id: number
  ) => {
    if (
      window.confirm(
        "Are you sure you want to delete this contact?"
      )
    ) {
      setContacts((prev) =>
        prev.filter((c) => c.id !== id)
      );
    }
  };

  const handleCall = (
    phone: string
  ) => {
    window.location.href = `tel:${phone}`;
  };

  // Validation checks for save button disabled state
  const isSaveDisabled =
    !contactForm.name.trim() ||
    !contactForm.relation.trim() ||
    !splitPhone(
      contactForm.phone
    )[1].trim();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f8f5f2] text-[#4B2E2B] md:pl-[100px] overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A3B763]/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-blob-slow animation-delay-2s" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-b-3xl md:rounded-3xl md:mx-6 md:mt-6 p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() =>
                navigate("/profile")
              }
              aria-label="Back to Profile"
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
            >
              <img
                src={BackIcon}
                alt="Back"
                className="w-5 h-5 brightness-0 invert"
              />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Phone
                  size={28}
                  aria-hidden="true"
                />
                Emergency Contacts
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {contacts.length}{" "}
                contact
                {contacts.length !== 1
                  ? "s"
                  : ""}{" "}
                saved
              </p>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="px-5 md:px-8 mt-6 pb-32 max-w-4xl mx-auto space-y-4">
          {contacts.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 text-center shadow-lg border border-white/20">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users
                  size={40}
                  className="text-red-500"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E2B] mb-2">
                No Emergency Contacts
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Add your first emergency
                contact to get started
              </p>
            </div>
          ) : (
            contacts.map(
              (contact, index) => (
                <div
                  key={contact.id}
                  className="group bg-white/90 backdrop-blur-xl rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-xl border border-white/20 transition-all"
                  style={{
                    animationDelay: `${
                      index * 100
                    }ms`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <span
                            className="text-white font-bold text-lg"
                            aria-label={`Avatar for ${contact.name}`}
                          >
                            {contact.name
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-bold text-lg text-[#4B2E2B] truncate">
                            {
                              contact.name
                            }
                          </h2>
                          <p className="text-sm text-gray-600">
                            {
                              contact.relation
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-15 pl-0.5">
                        <Phone
                          size={16}
                          className="text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="text-sm text-gray-700 font-medium">
                          {
                            contact.phone
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() =>
                          handleCall(
                            contact.phone
                          )
                        }
                        className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center hover:bg-green-600 active:scale-95 transition-all shadow-md"
                        title="Call"
                        aria-label={`Call ${contact.name}`}
                      >
                        <Phone
                          size={18}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() =>
                          openEditModal(
                            contact
                          )
                        }
                        className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 active:scale-95 transition-all shadow-md"
                        title="Edit"
                        aria-label={`Edit ${contact.name}`}
                      >
                        <Edit2
                          size={16}
                          className="text-white"
                        />
                      </button>
                      <button
                        onClick={() =>
                          handleRemoveContact(
                            contact.id
                          )
                        }
                        className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center hover:bg-red-600 active:scale-95 transition-all shadow-md"
                        title="Remove"
                        aria-label={`Remove ${contact.name}`}
                      >
                        <Trash2
                          size={16}
                          className="text-white"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>

        {/* Add Contact Button */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 px-5 md:px-0">
          <button
            onClick={openAddModal}
            className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl active:scale-95 transition-all"
            aria-label="Add new emergency contact"
          >
            <UserPlus size={22} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-5 z-50 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-heading"
        >
          <div className="bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2
                id="modal-heading"
                className="text-2xl font-bold text-[#4B2E2B]"
              >
                {editingContactId
                  ? "Edit Contact"
                  : "Add New Contact"}
              </h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 active:scale-95 transition-all"
                aria-label="Close modal"
              >
                <X
                  size={20}
                  className="text-gray-600"
                />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isSaveDisabled)
                  handleSaveContact();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name-input"
                  className="text-sm font-bold text-[#4B2E2B] block mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Enter full name"
                  value={
                    contactForm.name
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 transition-colors font-medium"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="relation-input"
                  className="text-sm font-bold text-[#4B2E2B] block mb-2"
                >
                  Relation *
                </label>
                <input
                  id="relation-input"
                  type="text"
                  placeholder="e.g., Father, Friend, Spouse"
                  value={
                    contactForm.relation
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "relation",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 transition-colors font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-bold text-[#4B2E2B] block mb-2">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Select country code"
                    value={
                      splitPhone(
                        contactForm.phone
                      )[0]
                    }
                    onChange={(e) =>
                      handlePhoneCountryChange(
                        e.target.value
                      )
                    }
                    className="px-3 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 transition-colors font-medium bg-white"
                  >
                    {countries.map(
                      (c) => (
                        <option
                          key={c.code}
                          value={c.code}
                        >
                          {c.flag}{" "}
                          {c.code}
                        </option>
                      )
                    )}
                  </select>
                  <input
                    type="tel"
                    aria-label="Phone number"
                    placeholder="Phone number"
                    value={
                      splitPhone(
                        contactForm.phone
                      )[1]
                    }
                    onChange={(e) =>
                      handlePhoneNumberChange(
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-red-500 transition-colors font-medium"
                    required
                    pattern="[0-9\s\-]+"
                    title="Please enter a valid phone number"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 active:scale-98 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSaveDisabled
                  }
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  <span>
                    {editingContactId
                      ? "Update"
                      : "Save"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
