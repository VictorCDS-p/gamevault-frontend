import api from "./api.js";

export const userService = {
  
  async getProfile() {
    const response = await api.get("/users/me/profile");
    return response.data;
  },

  async updateProfile(data) {
    const response = await api.put("/users/me", data);
    return response.data;
  },

  async deleteProfile() {
    const response = await api.delete("/users/me");
    return response.data;
  }

};