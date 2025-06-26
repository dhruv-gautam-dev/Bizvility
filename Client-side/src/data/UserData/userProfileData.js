import axios from "axios";

export async function fetchUserProfile(userId,token) {


  if (!userId) {
    throw new Error('No userId found in localStorage. Please login.');
  }

  const data = {
    params: { userId },
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  try {
    const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`, data);
    return response.data; // { status, total?, listings, message? }
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || 'Failed to fetch listings';
    throw new Error(message);
  }
}