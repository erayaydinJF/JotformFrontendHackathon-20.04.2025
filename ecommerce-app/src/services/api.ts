import axios from 'axios';

const API_KEY = '97bb8ade4fe36cbbd44164f2a2bf025c';
const FORM_ID = '251073656660963';
const BASE_URL = 'https://api.jotform.com';

// Get payment information from the form
export const getPaymentInfo = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/form/${FORM_ID}/payment-info?apiKey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching payment info:', error);
    throw error;
  }
};

// Get form submissions
export const getFormSubmissions = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/form/${FORM_ID}/submissions?apiKey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching form submissions:', error);
    throw error;
  }
};

// Get form questions (to understand the form structure)
export const getFormQuestions = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/form/${FORM_ID}/questions?apiKey=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching form questions:', error);
    throw error;
  }
}; 