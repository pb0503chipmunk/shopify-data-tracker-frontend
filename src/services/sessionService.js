import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const fetchSessions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/sessions`);
    return response.data;
  } catch (error) {
    console.error("Could not fetch sessions:", error);
    throw error;
  }
};

export const fetchAggregatedSessions = async (dateRange) => {
    let queryUrl = `${BASE_URL}/api/aggregated-sessions`;
    if (dateRange && dateRange.startDate && dateRange.endDate) {
        const formattedStartDate = new Date(dateRange.startDate).toISOString();
        const formattedEndDate = new Date(dateRange.endDate).toISOString();
        queryUrl += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    }
    console.log('Fetching Aggregated Sessions with URL:', queryUrl);
    try {
        const response = await axios.get(queryUrl);
        return response.data;
    } catch (error) {
        console.error("Could not fetch aggregated sessions:", error);
        throw error;
    }
};

export const fetchTopPages = async (dateRange) => {
    let queryUrl = `${BASE_URL}/api/top-pages`;
    if (dateRange && dateRange.startDate && dateRange.endDate) {
        const formattedStartDate = dateRange.startDate.toISOString().split('T')[0];
        const formattedEndDate = dateRange.endDate.toISOString().split('T')[0];
        queryUrl += `?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    }
    console.log('Fetching Top Pages with URL:', queryUrl);
    try {
        const response = await axios.get(queryUrl);
        return response.data;
    } catch (error) {
        console.error("Could not fetch top pages:", error);
        throw error;
    }
};

export const toggleStarStatus = async (visitorId) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/sessions/toggle-star`, { visitorId });
    return response.data;
  } catch (error) {
    console.error("Could not toggle star status:", error);
    throw error;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/sessions`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Could not create session:", error);
    throw error;
  }
};
