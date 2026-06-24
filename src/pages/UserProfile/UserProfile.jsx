import React from "react";
import StatSection from "../../components/StatSection/StatSection";
import UserAccount from "../../components/UserAccount/UserAccount";
import "./UserProfile.css";
import { Helmet } from "react-helmet-async";
export default function UserProfile() {
  return (
    <div className="userprofile">
      <div className="layer2"></div>
      <StatSection />
    </div>
  );
}
