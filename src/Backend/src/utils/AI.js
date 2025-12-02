const { GoogleGenAI } = require('@google/genai');

const generateQuiz = async (pdfContent, numberOfQuestions) => {
    const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY || 'AIzaSyAmNBA-M7a9eDgNnF3RNrRVMhnCxKIJL7U' });

    try {
        const systemInstruction = `You are a quiz generator. You will be provided with content extracted from a PDF document. Your task is to generate quiz questions based on this content.

PDF Content:
"""
${pdfContent}
"""

Use the above content as the basis for all quiz questions.`;

        const prompt = `Generate exactly ${numberOfQuestions} quiz questions based on the PDF content provided in the system instruction.

Each question must have:
- question: the question text
- options: object with 4 possible answers (A, B, C, D)
- correctAnswer: the letter of the correct option (A, B, C, or D)
- explanation: brief explanation of the correct answer

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no additional text):

{
  "topic": "Content from PDF",
  "numberOfQuestions": ${numberOfQuestions},
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": {
        "A": "First option",
        "B": "Second option",
        "C": "Third option",
        "D": "Fourth option"
      },
      "correctAnswer": "A",
      "explanation": "Explanation here"
    }
  ]
}`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            config: {
                systemInstruction: systemInstruction
            }
        });

        let responseText = result.text.trim();
        
        // Clean up markdown code blocks if present
        responseText = responseText.replace(/```json\n?/g, '');
        responseText = responseText.replace(/```\n?/g, '');
        responseText = responseText.trim();
        
        // Parse and return JSON
        const quizData = JSON.parse(responseText);
        return quizData;

    } catch (error) {
        console.error('Quiz generation error:', error);
        throw new Error(`Failed to generate quiz: ${error.message}`);
    }
};

module.exports = generateQuiz;