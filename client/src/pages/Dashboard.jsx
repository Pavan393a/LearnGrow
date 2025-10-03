import { purchasedCoursesState } from "../store/atoms/purchasedCoursesState";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { coursesListState } from "../store/atoms/course";
import {
  allCoursesSelector,
  isCourseLoading,
  purchasedCoursesSelector,
  isPurchasedCoursesLoading,
} from "../store/selectors/course";
import { BASE_URL } from "../config";
import { Logout } from "../components/logout";
export function Dashboard() {
  // state for view toggle
  const [currentView, setCurrentView] = useState("all-courses");
  const [purchaseLoading, setPurchaseLoading] = useState({});

  // using the atoms for setting the state
  const [purchasedState, setpurchasedState] = useRecoilState(
    purchasedCoursesState
  );
  const [courseState, setCourseState] = useRecoilState(coursesListState);

  // using the selectors for

  const Allcourses = useRecoilValue(allCoursesSelector);
  const PurchasedCourse = useRecoilValue(purchasedCoursesSelector);

  const isLoadingCourses = useRecoilValue(isCourseLoading);
  const isLoadingPurchased = useRecoilValue(isPurchasedCoursesLoading);
  // fetch data using the current view
  useEffect(() => {
    if (currentView === "all-courses") {
      fetchAllCourses();
    } else {
      fetchPruchasedCourses();
    }
  }, [currentView]);
  const fetchAllCourses = async () => {
    setCourseState((prev) => ({ ...prev, isloading: true }));
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${BASE_URL}/user/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourseState({
        isLoading: false,
        courses: res.data.course || [],
      });
    } catch {
      console.error("Error Fetching courses");
      setCourseState({ isLoading: false, courses: [] });
    }
  };
  const fetchPruchasedCourses = async () => {
    setpurchasedState((prev) => ({ ...prev, isLoading: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/user/purchasedCourses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setpurchasedState({
        isLoading: false,
        courses: res.data.purchasedCourses,
      });
    } catch {
      console.error("Erroor Fetching purchased courses");
      setpurchasedState({ isLoading: false, course: [] });
    }
  };
  const purchaseCourse = async (courseId) => {
    setPurchaseLoading((prev) => ({ ...prev, [courseId]: true }));
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/user/courses/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Course purchased successfullly");
      fetchAllCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    } finally {
      setPurchaseLoading((prev) => ({ ...prev, [courseId]: false }));
    }
  };
  const renderCourseCard = (course, isPurchased = false) => (
    <div
      key={course._id}
      className="rounded-lg border border-border bg-card text-card-foreground shadow-sm duration-200 w-full max-w-sm overflow-hidden transition-all hover:shadow-lg cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={
            course.image ||
            "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          }
          className="h-48 w-full object-cover md:h-full"
        />
        {isPurchased && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            owned
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-2 text-gray-500 line-clamp-3">{course.description}</p>
        <div className="flex items-center justify-between whitespace-nowrap rounded-md text-lg font-semibold ring-offset-background transition-colors h-10 px-4 py-2">
          <h2>${course.price}</h2>
          {isPurchased ? (
            <button className="ml-4 text-green-600 font-medium">
              Start Learning
            </button>
          ) : (
            <button
              disabled={purchaseLoading[course._id]}
              className="inline-flex items-center whitespace-nowrap text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-6 disabled:opacity-50"
              onClick={() => purchaseCourse(course._id)}
            >
              {purchaseLoading[course._id] ? "Purchasing" : "Buy Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
  const loading =
    currentView === "all-courses" ? isLoadingCourses : isLoadingPurchased;
  const coursesToDisplay =
    currentView === "all-courses" ? Allcourses : PurchasedCourse;
  return (
    <div>
      <div>
        <nav className="fixed top-0 z-[999] w-full border-b-2 border-gray/80 bg-gray/70 backdrop-md">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Left side - Logo and nav buttons */}
              <div className="flex items-center space-x-4">
                <div className="flex shrink-0 items-center">
                  <img
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                    className="h-8 w-auto"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentView("all-courses")}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      currentView === "all-courses"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    All Courses
                  </button>
                  <button
                    onClick={() => setCurrentView("my-courses")}
                    className={`rounded-md px-3 py-2 text-sm font-medium ${
                      currentView === "my-courses"
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    My Courses
                  </button>
                </div>
              </div>

              {/* Right side - Logout */}
              <div className="flex items-center">
                <Logout />
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full py-16 px-79">
          <main className="flex flex-col gap-4 pb-16 pt-8">
            <div className="flex flex-col gap-4 lg:flex-row mt-25 ">
              <h1 className="text-wrap text-3xl font-extrabold capitalize tracking-tighter md:text-4xl">
                {currentView === "all-course"
                  ? "Discover Courses "
                  : "My Learning Journey s"}
              </h1>
            </div>

            <div className="flex h-full flex-col gap-4 rounded-2xl py-4">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-xl">Loading courses...</div>
                </div>
              ) : (
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {coursesToDisplay.length > 0 ? (
                    coursesToDisplay.map((course) =>
                      renderCourseCard(course, currentView === "my-courses")
                    )
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-6xl mb-4">
                        {currentView === "all-courses" ? "📚" : "🎓"}
                      </div>
                      <p className="text-gray-600 text-lg mb-4">
                        {currentView === "all-courses"
                          ? "No Courses available at this moment"
                          : "You haven't purchased any Courses"}
                      </p>
                      {currentView === "my-courses" && (
                        <button
                          onClick={() => setCurrentView("all-courses")}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md"
                        >
                          Browse Courses
                        </button>
                      )}
                    </div>
                  )}
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
