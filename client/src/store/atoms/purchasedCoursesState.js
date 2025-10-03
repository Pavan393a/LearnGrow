import { atom } from "recoil";

export const purchasedCoursesState = atom({
  key: "purchasedCoursesState",
  default: {
    isLoading: true,
    courses: null, // null means "not loaded yet"
  },
});
