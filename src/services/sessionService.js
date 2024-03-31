import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// export const fetchSessions = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/api/sessions`);
//     return response.data;
//   } catch (error) {
//     console.error("Could not fetch sessions:", error);
//     throw error;
//   }
// };

// export const fetchAggregatedSessions = async () => {
//     try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/aggregated-sessions`);
//         return response.data;
//     } catch (error) {
//         console.error("Could not fetch aggregated sessions:", error);
//         throw error;
//     }
// };

// export const fetchAggregatedSessions = async (dateRange) => {
//     let queryUrl = `${process.env.REACT_APP_API_URL}/api/aggregated-sessions`;
//     if (dateRange && dateRange.startDate && dateRange.endDate) {
//         queryUrl += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
//     }
//     console.log('Fetching Aggregated Sessions with URL:', queryUrl);
//     try {
//         const response = await axios.get(queryUrl);
//         return response.data;
//     } catch (error) {
//         console.error("Could not fetch aggregated sessions:", error);
//         throw error;
//     }
// };

export const fetchAggregatedSessions = async (dateRange) => {
    let queryUrl = `${process.env.REACT_APP_API_URL}/api/aggregated-sessions`;
    if (dateRange && dateRange.startDate && dateRange.endDate) {
        // Ensure startDate and endDate are formatted as "YYYY-MM-DD"
        const formattedStartDate = dateRange.startDate.toISOString().split('T')[0];
        const formattedEndDate = dateRange.endDate.toISOString().split('T')[0];
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


// export const fetchTopPages = async (dateRange) => {
//     let url = `${BASE_URL}/api/top-pages`;
//     if (dateRange && dateRange.startDate && dateRange.endDate) {
//         url += `?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
//     }
//     try {
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.error("Could not fetch top pages:", error);
//         throw error;
//     }
// };

export const fetchTopPages = async (dateRange) => {
    let queryUrl = `${process.env.REACT_APP_API_URL}/api/top-pages`;
    if (dateRange && dateRange.startDate && dateRange.endDate) {
        // Ensure startDate and endDate are formatted as "YYYY-MM-DD"
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




export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/sessions`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Could not create session:", error);
    throw error;
  }
};
