import React from "react";
import BasicTabComponent from "../../components/Tab/Tab";
import ArtistEntry from "./ArtistForm";
import ArtistsList from "./ArtistsList";

export default function ArtistIndex() {
  interface TabData {
    label: string;
    value: number;
    component: any;
  }

  const tabData: TabData[] = [
    {
      label: "Artist Entry",
      value: 0,
      component: <ArtistEntry />,
    },
    {
      label: "Artist List ",
      value: 1,
      component: <ArtistsList />,
    },
  ];

  return (
    <React.Fragment>
      <BasicTabComponent tabData={tabData} />
    </React.Fragment>
  );
}
