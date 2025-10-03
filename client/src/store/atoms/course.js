import { atom } from "recoil";
export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: null,
  },
});
export const coursesListState = atom({
  key: "coursesListState",
  default: {
    isLoading: true,
    courses: [], // Fixed: changed from "course" to "courses" to match AdminDashboard usage
  },
});
