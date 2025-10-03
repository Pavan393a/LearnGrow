import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { coursesListState } from "../store/atoms/course";
import {
  totalCoursesSelector,
  publishedCountSelector,
  isCourseLoading,
  courseDetails,
  allCoursesSelector,
} from "../store/selectors/course";
import { InputBox } from "../components/InputBox";
import { BASE_URL } from "../config";
import { Logout } from "../components/logout";
export function AdminDashboard() {
  // Step 5A: Connect to global state

  const [courseState, setCourseState] = useRecoilState(coursesListState);
  // Step 5B: Get computed values
  const totalCourses = useRecoilValue(totalCoursesSelector);
  const publishedCount = useRecoilValue(publishedCountSelector);
  const courseLoading = useRecoilValue(isCourseLoading);
  const allcourses = useRecoilValue(courseDetails);

  //   local state for form
  // Step 5C: Local state for form
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    published: false,
  });
  //  STEP 6: Implement API Integration
  //  STEP 6: Implement API Integration
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCourseState((prev) => ({ ...prev, isLoading: true }));
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/admin/courses`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Added space
        });

        setCourseState({
          isLoading: false,
          courses: res.data.courses || [],
        });
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourseState({ isLoading: false, courses: [] });
      }
    };
    fetchCourses();
  }, [setCourseState]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/admin/courses`, newCourse, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Added space
      });

      // ✅ Refetch all courses after creating
      const coursesRes = await axios.get(`${BASE_URL}/admin/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourseState({
        isLoading: false,
        courses: coursesRes.data.courses || [],
      });

      setNewCourse({
        title: "",
        description: "",
        image: "",
        price: "",
        published: false,
      });

      alert("Course created successfully!");
    } catch (err) {
      console.error("Error creating course:", err);
      alert(err.response?.data?.message || "Failed to create course");
    }
  };
  return (
    <div>
      <nav className="fixed top-0 z-[999] w-full border-b-2 border-gray/80 bg-gray/70 backdrop-md">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                  className="h-8 w-auto"
                />
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex justify-end space-x-4">
                  <Logout />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full  py-16 px-79">
        <div className="grid grid-cols-2 gap-4 mb-6   mt-6">
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-xl">Total Courses</p>
            <p className="font-bold">{totalCourses}</p> {/* From selector! */}
          </div>
          <div className="p-4 bg-gray-100 rounded shadow">
            <p className="text-xl">Published</p>
            <p className="font-bold">{publishedCount}</p> {/* From selector! */}
          </div>
        </div>
        {/* Form: */}
        {/* --- Create Course Form --- */}
        <div className="px-56">
          <h1 className="inline-flex items-center justify-center px-5 py-3 mb-6 text-lg font-semibold text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Create a Course
          </h1>
          <form
            onSubmit={handleCreate}
            className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4"
          >
            <InputBox
              label="Title"
              placeholder="Enter course title"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
            />
            <InputBox
              label="Description"
              placeholder="Enter description"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />
            <InputBox
              label="Image URL"
              placeholder="https://example.com/image.png"
              value={newCourse.image}
              onChange={(e) =>
                setNewCourse({ ...newCourse, image: e.target.value })
              }
            />
            <InputBox
              label="Price"
              type="number"
              placeholder="0 - 1000"
              value={newCourse.price}
              onChange={(e) =>
                setNewCourse({ ...newCourse, price: e.target.value })
              }
              min="0"
              step="0.01"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newCourse.published}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, published: e.target.checked })
                }
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-700">Publish immediately</span>
            </label>
            <button
              className="w-full px-5 py-3 text-base font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-green-300"
              type="submit"
            >
              Unleash the Course
            </button>
          </form>
        </div>
        <CourseList />
      </div>
    </div>
  );
}

function CourseList() {
  const isLoading = useRecoilValue(isCourseLoading);

  const allCourses = useRecoilValue(allCoursesSelector);
  const [editingCourse, setEditingCourse] = useState(null);
  const [coursesState, setCoursesState] = useRecoilState(coursesListState);

  const handleEdit = async (id, updatedCourse) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${BASE_URL}/admin/courses/${id}`,
        updatedCourse,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCoursesState((prev) => ({
        ...prev,
        courses: prev.courses.map((c) =>
          c._id === id ? { ...c, ...updatedCourse } : c
        ),
      }));
      setEditingCourse(null);
    } catch (err) {
      console.error("Error editing course:", err);
    }
  };
  if (isLoading) {
    return <p className="text-center mt-10">Loading courses...</p>;
  }
  return (
    <>
      {/* --- Course List (Grid Layout) --- */}
      <div className="mx-auto max-w-6xl mt-10">
        <h2 className="text-2xl font-semibold mb-6">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((course) => (
            <div
              key={course._id}
              className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* Image First */}
                  {course.image && (
                    <div className="mb-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="rounded border w-full h-32 object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                  <p className="mt-2 text-green-600 font-semibold">
                    ${course.price}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                      course.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.published ? "Published" : "Draft"}
                  </span>
                </div>
                <button
                  onClick={() => setEditingCourse(course)}
                  className="ml-3 text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Edit modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opactiy-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-2xl font-semibold mb-4">Edit Course</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEdit(editingCourse._id, editingCourse);
              }}
            >
              <InputBox
                label={"Title"}
                placeholder="Course Title"
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    title: e.target.value,
                  })
                }
                className="w-full mb-3 p-3 border rounded"
              />
              <InputBox
                label={"Description"}
                placeholder="Description"
                value={editingCourse.description}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    description: e.target.value,
                  })
                }
                className="w-full mb-3 p-3 border rounded"
              />
              <InputBox
                type="url"
                label={"url"}
                placeholder="Image URL"
                value={editingCourse.image}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    image: e.target.value,
                  })
                }
                className="w-full mb-3 p-3 border rounded"
              />
              <InputBox
                type="number"
                label={"price"}
                placeholder="price"
                value={editingCourse.price}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    price: e.target.value,
                  })
                }
                min="0"
                step="0.01"
                className="w-full mb-3 p-3 border rounded"
              />
              <label className="flex items-center mb-4">
                <InputBox
                  type="checkbox"
                  label={"Published"}
                  placeholder="yes/no"
                  value={editingCourse.published}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      published: e.target.checked,
                    })
                  }
                  className="w-full mb-3 p-3 border rounded"
                />
              </label>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
