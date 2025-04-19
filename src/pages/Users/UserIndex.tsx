import React from "react";
import BasicTabComponent from "../../components/Tab/Tab";
import UsersList from "./UsersList";
import UserEntry from "./UserEntry";

export default function UserIndex() {
  interface TabData {
    label: string;
    value: number;
    component: any;
  }

  const tabData: TabData[] = [
    {
      label: "User Entry",
      value: 0,
      component: <UserEntry />,
    },
    {
      label: "User List ",
      value: 1,
      component: <UsersList />,
    },
  ];

  return (
    <React.Fragment>
      <BasicTabComponent tabData={tabData} />
    </React.Fragment>
  );
}
