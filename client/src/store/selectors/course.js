import { selector } from "recoil";
import { courseState } from "../atoms/course";
import { coursesListState } from "../atoms/course";
import { purchasedCoursesState } from "../atoms/purchasedCoursesState";
export const courseDetails = selector({
  key: "courseDetailState",
  get: ({ get }) => {
    const state = get(courseState);
    return state.course;
  },
});

export const courseTitle = selector({
  key: "courseTitleState",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.title;
    }
    return "";
  },
});

export const courseImage = selector({
  key: "courseImageState",
  get: ({ get }) => {
    const state = get(courseState);
    if (state.course) {
      return state.course.image;
    }
    return "";
  },
});
export const totalCoursesSelector = selector({
  key: "totalCoursesSelector",
  get: ({ get }) => {
    const s = get(coursesListState);
    return (s.courses || []).length;
  },
});

export const publishedCountSelector = selector({
  key: "publishedCountSelector",
  get: ({ get }) => {
    const s = get(coursesListState);
    return (s.courses || []).filter((c) => c.published).length;
  },
});
export const isCourseLoading = selector({
  key: "isCourseLoadingState",
  get: ({ get }) => {
    const state = get(coursesListState);
    return state.isLoading;
  },
});
export const allCoursesSelector = selector({
  key: "allCoursesSelector",
  get: ({ get }) => {
    const state = get(coursesListState); // ✅ Use coursesListState
    return state.courses || []; // ✅ Return courses array
  },
});
// Add this to store/selectors/course.js
export const purchasedCoursesSelector = selector({
  key: "purchasedCoursesSelector",
  get: ({ get }) => {
    const state = get(purchasedCoursesState);
    return state.courses || [];
  },
});

export const isPurchasedCoursesLoading = selector({
  key: "isPurchasedCoursesLoadingState",
  get: ({ get }) => {
    const state = get(purchasedCoursesState);
    return state.isLoading;
  },
});
