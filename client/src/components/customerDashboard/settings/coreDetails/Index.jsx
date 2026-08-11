import React, { useEffect, useState } from "react";
import { MdEdit, MdOutlineAddLocationAlt } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";
import api from "../../../../config/Apiconfig";
import toast from "react-hot-toast";

const emptyForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  country: "",
  addressType: "home",
  isDefault: false,
  geoLat: "",
  geoLon: "",
};

const Index = () => {
  const [addressBook, setAddressBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  // null = closed, "add" = adding new, address._id = editing that address
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchAddressBook = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/customer/address-book");
      setAddressBook(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load address book");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAddressBook(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setFormData((prev) => ({ ...prev, geoLat: coords.latitude, geoLon: coords.longitude }));
        setIsFetchingLocation(false);
      },
      () => setIsFetchingLocation(false),
    );
  };

  const handleStartAdd = () => { setFormData(emptyForm); setEditingId("add"); };

  const handleStartEdit = (addr) => {
    setFormData({
      name: addr.name || "",
      address: addr.address || "",
      city: addr.city || "",
      state: addr.state || "",
      pinCode: addr.pinCode || "",
      country: addr.country || "",
      addressType: addr.addressType || "home",
      isDefault: addr.isDefault || false,
      geoLat: addr.geoLocation?.lat || "",
      geoLon: addr.geoLocation?.lon || "",
    });
    setEditingId(addr._id);
  };

  const handleCancel = () => { setEditingId(null); setFormData(emptyForm); };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let res;
      if (editingId === "add") {
        res = await api.post("/customer/address-book", formData);
      } else {
        res = await api.put(`/customer/address-book/${editingId}`, formData);
      }
      setAddressBook(res.data.data);
      toast.success(res.data.message);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const res = await api.delete(`/customer/address-book/${addressId}`);
      setAddressBook(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete address");
    }
  };

  const typeColors = { home: "bg-green-100 text-green-700", work: "bg-blue-100 text-blue-700", other: "bg-gray-100 text-gray-700" };

  return (
    <div className="bg-(--color-base-100) rounded-lg p-3">
      <div className="flex justify-between items-center border-b border-(--color-secondary) pb-2 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-(--color-primary)">Address Book</h3>
        </div>
        {editingId === null ? (
          <button
            onClick={handleStartAdd}
            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
          >
            <MdOutlineAddLocationAlt /> Add Address
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleGetLocation}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
              disabled={isFetchingLocation}
            >
              {isFetchingLocation ? <RiLoader4Fill className="animate-spin" /> : null}
              {isFetchingLocation ? "Getting Location..." : "Get Current Location"}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-(--color-secondary) text-(--color-secondary-content) px-2 py-0.5 rounded text-xs"
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Form */}
      {editingId !== null && (
        <div className="mb-3 pb-3 border-b border-(--color-secondary)/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="w-full">
              <label className="text-xs font-semibold">Label / Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                placeholder="e.g. Home, Mom's house"
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange}
                placeholder="Street address"
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange}
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange}
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">Pin Code</label>
              <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange}
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange}
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" />
            </div>
            <div className="w-full">
              <label className="text-xs font-semibold">Address Type</label>
              <select name="addressType" value={formData.addressType} onChange={handleChange}
                className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded">
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold">Latitude</label>
                <input type="text" name="geoLat" value={formData.geoLat} onChange={handleChange}
                  placeholder="e.g. 28.6139"
                  className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" readOnly />
              </div>
              <div>
                <label className="text-xs font-semibold">Longitude</label>
                <input type="text" name="geoLon" value={formData.geoLon} onChange={handleChange}
                  placeholder="e.g. 77.2090"
                  className="w-full px-1.5 py-1 border border-(--color-secondary) bg-white rounded" readOnly />
              </div>
            </div>
            <div className="w-full flex items-center gap-2 mt-3">
              <input type="checkbox" name="isDefault" id="isDefault" checked={formData.isDefault}
                onChange={handleChange} className="w-4 h-4 accent-(--color-primary)" />
              <label htmlFor="isDefault" className="text-xs font-semibold cursor-pointer">
                Set as Default Address
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Address List */}
      {isLoading ? (
        <div className="flex justify-center py-4">
          <RiLoader4Fill className="animate-spin text-(--color-primary) text-xl" />
        </div>
      ) : addressBook.length === 0 ? (
        <p className="text-xs text-(--color-secondary) py-2">
          No saved addresses. Click "Add Address" to add one.
        </p>
      ) : (
        <div className="space-y-2">
          {addressBook.map((addr) => (
            <div key={addr._id}
              className={`flex justify-between items-start rounded px-2 py-2 border ${addr.isDefault ? "border-(--color-primary)/40 bg-(--color-primary)/5" : "border-(--color-secondary)/30 bg-(--color-base-200)"}`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{addr.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${typeColors[addr.addressType] || typeColors.other}`}>
                    {addr.addressType}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-(--color-primary)/20 text-(--color-primary)">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-(--color-secondary)">
                  {addr.address}, {addr.city}, {addr.state} – {addr.pinCode}, {addr.country}
                </p>
              </div>
              <div className="flex gap-2 shrink-0 ml-2">
                <button onClick={() => handleStartEdit(addr)}
                  className="flex items-center gap-1 bg-(--color-primary) text-(--color-primary-content) px-2 py-0.5 rounded text-xs">
                  <MdEdit /> Edit
                </button>
                <button onClick={() => handleDelete(addr._id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-2 py-0.5 rounded text-xs hover:bg-red-600">
                  <IoMdClose /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;