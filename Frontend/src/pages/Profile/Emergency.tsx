import { useState } from "react";
import BackIcon from "../../assets/Icons/Back Arrow.svg";
import { useNavigate } from "react-router-dom";

interface Contact {
  id: number;
  name: string;
  relation: string;
  phone: string;
}

const countries = [
  { code: "+91", name: "India" },
  { code: "+1", name: "USA" },
  { code: "+81", name: "Japan" },
];

const Emergency = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: "John Doe", relation: "Father", phone: "+91 9876543210" },
    { id: 2, name: "Jane Smith", relation: "Friend", phone: "+91 9123456780" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    name: "",
    relation: "",
    phone: "+91 ",
  });

  const handleSaveContact = () => {
    if (!newContact.name || !newContact.relation || !newContact.phone) return;

    if (editingContactId) {
      // Editing existing contact
      setContacts(
        contacts.map((c) =>
          c.id === editingContactId ? { ...newContact, id: editingContactId } : c
        )
      );
    } else {
      // Adding new contact
      const updatedContact = { ...newContact, id: contacts.length + 1 };
      setContacts([...contacts, updatedContact]);
    }

    setShowModal(false);
    setEditingContactId(null);
    setNewContact({ id: 0, name: "", relation: "", phone: "+91 " });
  };

  const handleRemove = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleEdit = (contact: Contact) => {
    setEditingContactId(contact.id);
    setNewContact(contact);
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#fdfcfb] text-[#4B2E2B] flex flex-col">
      {/* Header */}
      <div className="bg-[#A8C56A] rounded-b-3xl p-5 flex items-center gap-3 shadow">
        <button onClick={() => navigate("/profile")}>
          <img src={BackIcon} alt="Back" className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold">Emergency Contacts</h1>
      </div>

      {/* Contacts List */}
      <div className="flex flex-col px-6 mt-6 space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div>
              <h2 className="font-semibold text-base">{contact.name}</h2>
              <p className="text-sm text-gray-600">{contact.relation}</p>
              <p className="text-sm text-gray-500">{contact.phone}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(contact)}
                className="text-sm font-medium text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemove(contact.id)}
                className="text-sm font-medium text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Contact Button */}
      <div className="mt-auto px-6 pb-10">
        <button
          onClick={() => {
            setEditingContactId(null);
            setNewContact({ id: 0, name: "", relation: "", phone: "+91 " });
            setShowModal(true);
          }}
          className="w-full bg-[#4B2E2B] text-white py-3 rounded-full font-semibold hover:bg-[#3b2320] transition"
        >
          + Add Emergency Contact
        </button>
      </div>

      {/* Modal for Adding/Editing Contact */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-6">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-[#4B2E2B]">
              {editingContactId ? "Edit Contact" : "Add New Contact"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C56A]"
            />
            <input
              type="text"
              placeholder="Relation"
              value={newContact.relation}
              onChange={(e) =>
                setNewContact({ ...newContact, relation: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C56A]"
            />
            <div className="flex gap-2 mb-4">
              <select
                value={newContact.phone.slice(0, 3)}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    phone: e.target.value + newContact.phone.slice(newContact.phone.indexOf(" ") + 1),
                  })
                }
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C56A]"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.name})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.phone.slice(newContact.phone.indexOf(" ") + 1)}
                onChange={(e) =>
                  setNewContact({
                    ...newContact,
                    phone: newContact.phone.slice(0, newContact.phone.indexOf(" ") + 1) + e.target.value,
                  })
                }
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8C56A]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveContact}
                className="flex-1 py-2 rounded-full bg-[#4B2E2B] text-white font-semibold hover:bg-[#3b2320]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
