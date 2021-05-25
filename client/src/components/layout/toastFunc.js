import React from "react";
import Toast from "./Toast";

export const toastHandler = arg => {
  console.log("In toast Function");
  return arg ? <Toast /> : "";
};
