// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./Reducer/authReducer";
import {classReducer} from "./Reducer/classReducer";
import {userReducer} from "./Reducer/userReducer";
import {teacherClassReducer, teacherReducer} from "./Reducer/teacherReducer";
import {studentEnrolledClassReducer, studentReducer} from "./Reducer/studentReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer, // yahan aur reducers add kar sakte ho
    classes: classReducer,
    userList: userReducer,
    teacherClasses: teacherClassReducer,
    teachers: teacherReducer,
    students: studentReducer,
    studentEnrolledClass: studentEnrolledClassReducer
  },
});

export default store;
