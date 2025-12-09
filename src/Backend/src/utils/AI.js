const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleAIFileManager } = require('@google/generative-ai/server');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const officeParser = require('officeparser');
const XLSX = require('xlsx');

const MAX_TEXT_LENGTH = 80000;


const generateQuizFromDocument = async (filePath,difficulty, numberOfQuestions) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.pdf': 'application/pdf',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.txt': 'text/plain',
        '.doc': 'application/msword',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.xls': 'application/vnd.ms-excel',
        
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.bmp': 'image/bmp'
    };

    const mimeType = mimeTypes[ext];
    if (!mimeType) {
        throw new Error(`Unsupported file type: ${ext}. Supported types: ${Object.keys(mimeTypes).join(', ')}`);
    }


    const isImage = mimeType.startsWith('image/');

    try {

        console.log(`Uploading ${isImage ? 'image' : 'document'}: ${filePath}...`);
        const uploadResult = await fileManager.uploadFile(filePath, {
            mimeType: mimeType,
            displayName: path.basename(filePath)
        });

        console.log(`File uploaded successfully: ${uploadResult.file.uri}`);


        const prompt = isImage 
            ? `Analyze this image carefully and generate exactly ${numberOfQuestions} ${difficulty} quiz questions based on its content.

        For this image, focus on:
        - Visual elements, diagrams, charts, or graphs shown
        - Text content visible in the image
        - Concepts, processes, or relationships illustrated
        - Any labels, annotations, or explanations present
        - Scientific, mathematical, or technical information displayed

        Requirements:
        - Make questions specific to what's shown in the image
        - Ensure all options are plausible but only one is correct
        - Provide clear explanations referencing the image content
        - Test understanding of the visual information presented

        Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no additional text):

        {
            "title": "Brief description of the image content",
            "numberOfQuestions": ${numberOfQuestions},
            "difficulty": "${difficulty}",
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
        }`
            : `Analyze the content of this document and generate exactly ${numberOfQuestions} ${difficulty} quiz questions based on it.

        Requirements:
        - Focus on the most important concepts and information from the document
        - Make questions clear, specific, and unambiguous
        - Ensure all options are plausible but only one is correct
        - Provide helpful and educational explanations
        - Cover different sections of the document if possible
        - Vary the difficulty level appropriately

        Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no additional text):

        {
            "title": "Brief description of the document topic",
            "numberOfQuestions": ${numberOfQuestions},
            "difficulty": "${difficulty}",
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


        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResult.file.mimeType,
                    fileUri: uploadResult.file.uri
                }
            },
            { text: prompt }
        ]);

        const response = await result.response;
        let responseText = response.text().trim();
        

        responseText = responseText.replace(/```json\n?/g, '');
        responseText = responseText.replace(/```\n?/g, '');
        responseText = responseText.trim();
        
        const quizData = JSON.parse(responseText);


        if (!quizData.questions || !Array.isArray(quizData.questions)) {
            throw new Error('Invalid quiz data structure returned');
        }

        if (quizData.questions.length !== numberOfQuestions) {
            console.warn(`Warning: Generated ${quizData.questions.length} questions instead of ${numberOfQuestions}`);
        }

        console.log(`Successfully generated ${quizData.questions.length} quiz questions from ${isImage ? 'image' : 'document'}`);

        fs.unlinkSync(filePath)
        console.log("Deleted File")

        return quizData;

    } catch (error) {
        console.error('Quiz generation error:', error);
        
        if (error instanceof SyntaxError) {
            throw new Error(`Failed to parse quiz response: ${error.message}`);
        }
        
        throw new Error(`Failed to generate quiz from file: ${error.message}`);
    }
};


async function extractPDFText(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}

async function extractDOCXText(filePath) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

async function extractPPTXText(filePath) {
    try {
        const text = await officeParser.parseOfficeAsync(filePath);
        return text || '';
    } catch (error) {
        throw new Error(`Failed to extract PPTX text: ${error.message}`);
    }
}

async function extractDOCText(filePath) {
    try {
        const text = await officeParser.parseOfficeAsync(filePath);
        return text || '';
    } catch (error) {
        throw new Error(`Failed to extract DOC text: ${error.message}`);
    }
}

function extractXLSXText(filePath) {
    const workbook = XLSX.readFile(filePath);
    let text = '';
    
    workbook.SheetNames.forEach(sheetName => {
        text += `\n--- Sheet: ${sheetName} ---\n`;
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_csv(worksheet);
        text += sheetData + '\n';
    });
    
    return text;
}

function extractTXTText(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

async function extractTextFromFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    switch (ext) {
        case '.pdf':
            return await extractPDFText(filePath);
        case '.docx':
            return await extractDOCXText(filePath);
        case '.doc':
            return await extractDOCText(filePath);
        case '.pptx':
        case '.ppt':
            return await extractPPTXText(filePath);
        case '.xlsx':
        case '.xls':
            return extractXLSXText(filePath);
        case '.txt':
            return extractTXTText(filePath);
        default:
            throw new Error(`Unsupported file type for turbo mode: ${ext}. Supported: .pdf, .docx, .doc, .pptx, .ppt, .xlsx, .xls, .txt`);
    }
}

const generateQuizFromDocumentTurbo = async (filePath, difficulty, numberOfQuestions) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    try {

        console.log(`Extracting text from: ${filePath}...`);
        const extractedText = await extractTextFromFile(filePath);

        if (!extractedText || extractedText.trim().length < 50) {
            throw new Error('Document content is too short to generate meaningful quiz questions.');
        }


        if (extractedText.length > MAX_TEXT_LENGTH) {
            throw new Error(
                `Document is too large for turbo mode (${extractedText.length} characters). ` +
                `Maximum allowed: ${MAX_TEXT_LENGTH} characters. ` +
                `Please use the slow mode (/api/ai/upload/slow) for large documents.`
            );
        }

        console.log(`Extracted ${extractedText.length} characters of text`);


        const prompt = `Based on the following document content, generate exactly ${numberOfQuestions} ${difficulty} quiz questions.

Document Content:
"""
${extractedText}
"""

Requirements:
- Focus on the most important concepts and information from the document
- Make questions clear, specific, and unambiguous
- Ensure all options are plausible but only one is correct
- Provide helpful and educational explanations
- Cover different sections of the document if possible
- Vary the difficulty level appropriately

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no additional text):

{
    "title": "Brief description of the document topic",
    "numberOfQuestions": ${numberOfQuestions},
    "difficulty": "${difficulty}",
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

        
        console.log('Generating quiz questions (turbo mode)...');
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash"
        });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text().trim();
        
        
        responseText = responseText.replace(/```json\n?/g, '');
        responseText = responseText.replace(/```\n?/g, '');
        responseText = responseText.trim();
        
        const quizData = JSON.parse(responseText);

        if (!quizData.questions || !Array.isArray(quizData.questions)) {
            throw new Error('Invalid quiz data structure returned');
        }

        if (quizData.questions.length !== numberOfQuestions) {
            console.warn(`Warning: Generated ${quizData.questions.length} questions instead of ${numberOfQuestions}`);
        }

        console.log(`Successfully generated ${quizData.questions.length} quiz questions (turbo mode)`);
        fs.unlinkSync(filePath)
        console.log("Deleted File")

        return quizData;

    } catch (error) {
        console.error('Quiz generation error (turbo):', error);
        
        if (error instanceof SyntaxError) {
            throw new Error(`Failed to parse quiz response: ${error.message}`);
        }
        
        throw error; 
    }
};

const generateQuizWithoutDocument = async (title, description, difficulty, numberOfQuestions) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    try {
        const prompt = `Based on the following title and description, generate exactly ${numberOfQuestions} ${difficulty} quiz questions.

Title: ${title}
Description: ${description}

Requirements:
- Focus on the most important concepts and information from the document
- Make questions clear, specific, and unambiguous
- Ensure all options are plausible but only one is correct
- Provide helpful and educational explanations
- Cover different sections of the document if possible
- Vary the difficulty level appropriately

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no additional text):

{
    "title": "Brief description of the ${title}",
    "numberOfQuestions": ${numberOfQuestions},
    "difficulty": "${difficulty}",
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
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash"
        });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let responseText = response.text().trim();
        
        
        responseText = responseText.replace(/```json\n?/g, '');
        responseText = responseText.replace(/```\n?/g, '');
        responseText = responseText.trim();
        
        const quizData = JSON.parse(responseText);

        if (!quizData.questions || !Array.isArray(quizData.questions)) {
            throw new Error('Invalid quiz data structure returned');
        }

        if (quizData.questions.length !== numberOfQuestions) {
            console.warn(`Warning: Generated ${quizData.questions.length} questions instead of ${numberOfQuestions}`);
        }

        return quizData;

    } catch (error) {
        console.error('Quiz generation error (NoFile):', error);
        
        if (error instanceof SyntaxError) {
            throw new Error(`Failed to parse quiz response: ${error.message}`);
        }
        
        throw error;
}
}




module.exports = {
    generateQuizFromDocument,
    generateQuizFromDocumentTurbo,
    generateQuizWithoutDocument
};