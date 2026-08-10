import React from "react";
import RestaurantAddress from "./RestaurantAddress";
import RestaurantBankingDocument from "./RestaurantBankingDocument";
import RestaurantSocialMediaLinks from "./RestaurantSocialMediaLinks";

const Index = () => {
  return (
    <>
      <div className="overflow-y-auto h-full p-2 space-y-2">
        <RestaurantAddress />
        <RestaurantBankingDocument />
        <RestaurantSocialMediaLinks />
      </div>
    </>
  );
};

export default Index;