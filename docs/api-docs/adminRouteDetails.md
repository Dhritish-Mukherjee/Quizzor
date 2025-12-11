# Admin Routes Documentation Not Done

Route to Create Quiz as an Admin -> /api/admin/quiz
Required JSON Body Sample -> 
```json
{
  "title": "Indian Polity - Comprehensive Quiz",
  "description": "A comprehensive quiz covering fundamental concepts of Indian Constitution, governance, political system, fundamental rights, directive principles, and key constitutional provisions.",
  "category": "Indian Polity",
  "difficulty": "medium",
  "duration": 45,
  "createdBy": "507f1f77bcf86cd799439011",
  "isActive": true,
  "questions": [
    {
      "questionText": "Which part of the Indian Constitution deals with Fundamental Rights?",
      "options": ["Part II", "Part III", "Part IV", "Part V"],
      "correctAnswer": 1,
      "points": 1,
      "explanation": "Part III of the Indian Constitution (Articles 12-35) deals with Fundamental Rights."
    },
    {
      "questionText": "Who is known as the 'Father of the Indian Constitution'?",
      "options": ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Vallabhbhai Patel"],
      "correctAnswer": 2,
      "points": 1,
      "explanation": "Dr. B.R. Ambedkar was the Chairman of the Drafting Committee and is widely regarded as the Father of the Indian Constitution."
    }
  ]
}
