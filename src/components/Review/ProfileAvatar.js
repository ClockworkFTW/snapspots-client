import React from "react";
import Avatar from "react-avatar";

const ProfileAvatar = ({ name, size }) => (
  <Avatar
    name={name}
    size={size}
    round={true}
    colors={[
      "#FC8181",
      "#F6AD55",
      "#F6E05E",
      "#68D391",
      "#4FD1C5",
      "#63B3ED",
      "#7F9CF5",
      "#B794F4",
      "#F687B3",
    ]}
  />
);

export default ProfileAvatar;
