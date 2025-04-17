import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  activeLabel: string;
  activeLink: string;
  activeBreadcrumbLabel: string;
};

type Action = {
  setActiveLabel: (activeLabel: State["activeLabel"]) => void;
  setActiveLink: (activeLink: State["activeLink"]) => void;
  setActiveBreadCrumbLabel: (
    activeBreadcrumbLabel: State["activeBreadcrumbLabel"]
  ) => void;
};

export const useNavStore = create<State & Action>()(
  persist(
    (set) => ({
      activeLabel: "Dashboard",
      activeLink: "",
      activeBreadcrumbLabel: "",
      setActiveLabel: (activeLabel: string) => set(() => ({ activeLabel })),
      setActiveLink: (activeLink: string) => set(() => ({ activeLink })),
      setActiveBreadCrumbLabel: (activeBreadcrumbLabel: string) =>
        set(() => ({ activeBreadcrumbLabel })),
    }),
    {
      name: "navbar-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
