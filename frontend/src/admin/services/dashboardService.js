// src/admin/services/dashboardService.js

import { dashboardData } from "../data/mockDashboardData";

/**
 * Simulates fetching dashboard analytics from the backend.
 * Later, replace the implementation with a real API call.
 */

export const getDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardData);
    }, 800); // Simulate network delay
  });
};

/**
 * Future Backend Version
 *
 * import axios from "axios";
 *
 * export const getDashboardData = async () => {
 *   const response = await axios.get("/api/admin/analytics");
 *   return response.data;
 * };
 */