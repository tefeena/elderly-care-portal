const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getHealthPrediction = async (formData) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Based on the following health data:
  - Blood Pressure: ${formData.blood_pressure}
  - Heart Rate: ${formData.heart_rate} BPM
  - Cholesterol: ${formData.cholesterol} mg/dL
  - Glucose Level: ${formData.glucose_level} mg/dL
  - Temperature: ${formData.temperature} °C

  What is the potential health condition? Provide a short, medically relevant prediction with safety advice if needed.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    return "Unable to predict health condition at the moment.";
  }
};
