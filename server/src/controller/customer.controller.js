import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";

// GET /customer/address-book
export const GetAddressBook = async (req, res, next) => {
  try {
    const currentUser = req.user;

    let customer = await Customer.findOne({ customerId: currentUser._id });
    if (!customer) {
      customer = await Customer.create({ customerId: currentUser._id });
    }

    return res.status(200).json({
      message: "Address book fetched successfully",
      data: customer.addressBook,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// POST /customer/address-book
export const AddAddress = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      name,
      address,
      city,
      state,
      pinCode,
      country,
      addressType,
      isDefault,
      geoLat,
      geoLon,
    } = req.body;

    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !pinCode ||
      !country ||
      !addressType
    ) {
      const error = new Error("All required fields must be provided");
      error.statusCode = 400;
      return next(error);
    }

    let customer = await Customer.findOne({ customerId: currentUser._id });
    if (!customer) {
      customer = await Customer.create({ customerId: currentUser._id });
    }

    const newAddress = {
      name,
      address,
      city,
      state,
      pinCode,
      country,
      addressType,
      isDefault: isDefault === true || isDefault === "true",
      geoLocation: { lat: geoLat || "", lon: geoLon || "" },
    };

    // If new address is default, unset existing defaults
    if (newAddress.isDefault) {
      customer.addressBook.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    customer.addressBook.push(newAddress);
    await customer.save();

    return res.status(201).json({
      message: "Address added successfully",
      data: customer.addressBook,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// PUT /customer/address-book/:addressId
export const UpdateAddress = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { addressId } = req.params;
    const {
      name,
      address,
      city,
      state,
      pinCode,
      country,
      addressType,
      isDefault,
      geoLat,
      geoLon,
    } = req.body;

    const customer = await Customer.findOne({ customerId: currentUser._id });
    if (!customer) {
      const error = new Error("Customer profile not found");
      error.statusCode = 404;
      return next(error);
    }

    const existingAddress = customer.addressBook.id(addressId);
    if (!existingAddress) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    const shouldBeDefault = isDefault === true || isDefault === "true";
    if (shouldBeDefault) {
      customer.addressBook.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    if (name !== undefined) existingAddress.name = name;
    if (address !== undefined) existingAddress.address = address;
    if (city !== undefined) existingAddress.city = city;
    if (state !== undefined) existingAddress.state = state;
    if (pinCode !== undefined) existingAddress.pinCode = pinCode;
    if (country !== undefined) existingAddress.country = country;
    if (addressType !== undefined) existingAddress.addressType = addressType;
    if (isDefault !== undefined) existingAddress.isDefault = shouldBeDefault;
    if (geoLat !== undefined) existingAddress.geoLocation.lat = geoLat;
    if (geoLon !== undefined) existingAddress.geoLocation.lon = geoLon;

    customer.markModified("addressBook");
    await customer.save();

    return res.status(200).json({
      message: "Address updated successfully",
      data: customer.addressBook,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// DELETE /customer/address-book/:addressId
export const DeleteAddress = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { addressId } = req.params;

    const customer = await Customer.findOne({ customerId: currentUser._id });
    if (!customer) {
      const error = new Error("Customer profile not found");
      error.statusCode = 404;
      return next(error);
    }

    const addressIndex = customer.addressBook.findIndex(
      (addr) => addr._id.toString() === addressId,
    );
    if (addressIndex === -1) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }

    customer.addressBook.splice(addressIndex, 1);
    await customer.save();

    return res.status(200).json({
      message: "Address deleted successfully",
      data: customer.addressBook,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const GetAllOrders = async (req, res, next) => {
  try {
    const currentUser = req.user;

    // console.log("Fetching all orders for user:", currentUser._id); // Log the user ID for debugging

    const customer = await Customer.findOne({ customerId: currentUser._id });
    if (!customer) {
      const error = new Error("Customer profile not found");
      error.statusCode = 404;
      return next(error);
    }

    // console.log("Customer found:", customer); // Log the customer object for debugging

    const allOrder = await Order.find({ customerId: customer._id });

    // console.log("Orders", allOrder);

    res.status(200).json({ message: "All Order Fetched", data: allOrder });
  } catch (error) {
    console.log(error);
    next(error);
  }
};