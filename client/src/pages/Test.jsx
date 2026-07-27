import React from "react";




const sample = {
    "managerId": "6a4e63e1962482906d47814c",
    "restaurantName": "Manohar Dairy & Restaurant Vidhya Nagar",
    "address": "",
    "city": "",
    "state": "",
    "pinCode": "",
    "country": "",
    "servingHours": {
        "openingTime": "08:30",
        "closingTime": "22:30",
        "_id": "6a5f8186d627b1452cd5693d"
    },
    "isOpen": false,
    "status": "inactive",
    "averageRating": 0,
    "cuisineTypes": [
        "North Indian",
        "South Indian",
        "Italian",
        "Chinese",
        "Bakery",
        "Dairy",
        "Sweets",
        "Desserts"
    ],
    "description": "Manohar Dairy serves the widest range of delicacies in town.\n\nWe manufacture more than 250 products each day across three categories – Sweets and savouries, Indian fast food, & and Bakery",
    "restaurantType": "veg",
    "_id": "6a5f8186d627b1452cd5693c",
    "restaurantImage": [],
    "socialMediaLinks": [],
    "createdAt": "2026-07-21T14:26:14.980Z",
    "updatedAt": "2026-07-21T14:26:14.980Z",
    "__v": 0
}

const Test = () => {


    

  if ("geolocation" in navigator) {
    console.log("Location Avaliable");
  } else {
    console.log("Location NOT Avaliable");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });

  return (
    <>
      <div className="h-screen">Test</div>
    </>
  );
};

export default Test;