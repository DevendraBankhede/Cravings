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


   
  const restaurantDetails = {
    "_id": "6a63831593a4dc01e86d041a",
    "restaurantId": {
        "_id": "6a637ef76c3f9edac3a95035",
        "managerId": "6a6369649e95908456d6b903",
        "restaurantName": "Manohar Dairy & Restaurant Vidhya Nagar",
        "address": "",
        "city": "",
        "state": "",
        "pinCode": "",
        "country": "",
        "contactDetails": {
            "email": "care@manohardairy.com",
            "phone": "9826225599",
            "_id": "6a637ef76c3f9edac3a95036"
        },
        "servingHours": {
            "openingTime": "08:30",
            "closingTime": "22:30",
            "_id": "6a637ef76c3f9edac3a95037"
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
        "description": "Very Good",
        "restaurantType": "veg",
        "restaurantImage": [],
        "socialMediaLinks": [],
        "createdAt": "2026-07-24T15:04:23.695Z",
        "updatedAt": "2026-07-24T15:04:23.695Z",
        "__v": 0
    },
    "menuItems": [
        {
            "itemName": "Fries",
            "description": "seasoned French fries are flavored with garlic salt, onion salt, paprika, and salt.",
            "price": 59,
            "category": "Starter",
            "foodType": "Vegetarian",
            "image": {
                "url": "https://res.cloudinary.com/dpl3xwf1z/image/upload/v1784906516/restaurant/9876543210/menuItems/wqzrk1ggaqrrg5kpue3u.jpg",
                "publicId": "restaurant/9876543210/menuItems/wqzrk1ggaqrrg5kpue3u",
                "_id": "6a63831593a4dc01e86d041c"
            },
            "status": "available",
            "isTopRated": true,
            "isRecommended": true,
            "isNew": false,
            "isDeleted": false,
            "_id": "6a63831593a4dc01e86d041b"
        },
        {
            "itemName": "Sweet Lassi",
            "description": "Sweet Punjabi Lassi",
            "price": 49,
            "category": "Drink",
            "foodType": "Vegetarian",
            "image": {
                "url": "https://res.cloudinary.com/dpl3xwf1z/image/upload/v1784985539/restaurant/9876543210/menuItems/banv3rq90tmddnmgfv88.webp",
                "publicId": "restaurant/9876543210/menuItems/banv3rq90tmddnmgfv88",
                "_id": "6a64b7c4e1d4d518f02dbe32"
            },
            "status": "available",
            "isTopRated": false,
            "isRecommended": false,
            "isNew": true,
            "isDeleted": false,
            "_id": "6a64b7c4e1d4d518f02dbe31"
        }
    ],
    "createdAt": "2026-07-24T15:21:57.546Z",
    "updatedAt": "2026-07-26T04:19:18.095Z",
    "__v": 12
}

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