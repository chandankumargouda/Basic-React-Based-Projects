const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

// =====================================================
// Gemini API Configuration
// =====================================================

if (!process.env.GOOGLE_GENAI_API_KEY) {
    throw new Error("GOOGLE_GENAI_API_KEY is not defined");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


// =====================================================
// ZOD SCHEMAS
// =====================================================

// -----------------------------
// Technical / Behavioral Question
// -----------------------------

const questionSchema = z.object({
    question: z.string().min(1),
    intention: z.string().min(1),
    answer: z.string().min(1),
});


// -----------------------------
// Skill Gap
// -----------------------------

const skillGapSchema = z.object({
    skill: z.string().min(1),

    severity: z.enum([
        "low",
        "medium",
        "high",
    ]),
});


// -----------------------------
// Preparation Day
// -----------------------------

const preparationDaySchema = z.object({
    day: z.number().int().min(1),

    focus: z.string().min(1),

    tasks: z
        .array(z.string().min(1))
        .min(3),
});


// =====================================================
// COMPLETE INTERVIEW REPORT SCHEMA
// =====================================================

const interviewReportSchema = z.object({

    // Job title
    title: z
        .string()
        .min(1),

    // Candidate-job match score
    matchScore: z
        .number()
        .min(0)
        .max(100),

    // Exactly 5 technical questions
    technicalQuestions: z
        .array(questionSchema)
        .length(5),

    // Exactly 3 behavioral questions
    behavioralQuestions: z
        .array(questionSchema)
        .length(3),

    // At least 5 skill gaps
    skillGaps: z
        .array(skillGapSchema)
        .min(5),

    // Exactly 7 preparation days
    preparationPlan: z
        .array(preparationDaySchema)
        .length(7),
});


// =====================================================
// GEMINI JSON SCHEMA
// =====================================================
//
// We explicitly define the JSON schema instead of relying
// on automatic Zod -> JSON conversion.
//
// This makes the expected Gemini response very clear.
// =====================================================

const interviewReportJsonSchema = {

    type: "object",

    properties: {

        title: {
            type: "string",
        },

        matchScore: {
            type: "number",
            minimum: 0,
            maximum: 100,
        },

        technicalQuestions: {
            type: "array",

            minItems: 5,
            maxItems: 5,

            items: {
                type: "object",

                properties: {

                    question: {
                        type: "string",
                    },

                    intention: {
                        type: "string",
                    },

                    answer: {
                        type: "string",
                    },
                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        behavioralQuestions: {
            type: "array",

            minItems: 3,
            maxItems: 3,

            items: {
                type: "object",

                properties: {

                    question: {
                        type: "string",
                    },

                    intention: {
                        type: "string",
                    },

                    answer: {
                        type: "string",
                    },
                },

                required: [
                    "question",
                    "intention",
                    "answer",
                ],
            },
        },

        skillGaps: {
            type: "array",

            minItems: 5,

            items: {
                type: "object",

                properties: {

                    skill: {
                        type: "string",
                    },

                    severity: {
                        type: "string",

                        enum: [
                            "low",
                            "medium",
                            "high",
                        ],
                    },
                },

                required: [
                    "skill",
                    "severity",
                ],
            },
        },

        preparationPlan: {
            type: "array",

            minItems: 7,
            maxItems: 7,

            items: {
                type: "object",

                properties: {

                    day: {
                        type: "integer",
                    },

                    focus: {
                        type: "string",
                    },

                    tasks: {
                        type: "array",

                        minItems: 3,

                        items: {
                            type: "string",
                        },
                    },
                },

                required: [
                    "day",
                    "focus",
                    "tasks",
                ],
            },
        },
    },

    required: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
};


// =====================================================
// GENERATE INTERVIEW REPORT
// =====================================================

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {

    try {

        // ---------------------------------------------
        // Validate input
        // ---------------------------------------------

        if (!resume || !resume.trim()) {
            throw new Error("Resume content is empty");
        }

        if (!selfDescription || !selfDescription.trim()) {
            throw new Error("Self description is empty");
        }

        if (!jobDescription || !jobDescription.trim()) {
            throw new Error("Job description is empty");
        }


        // ---------------------------------------------
        // Prompt
        // ---------------------------------------------

        const prompt = `

You are an expert technical recruiter, hiring manager,
and interview preparation coach.

Your task is to analyze a candidate's resume,
self-description, and target job description.

Then generate a complete interview preparation report.

====================================================
CANDIDATE RESUME
====================================================

${resume}


====================================================
CANDIDATE SELF DESCRIPTION
====================================================

${selfDescription}


====================================================
TARGET JOB DESCRIPTION
====================================================

${jobDescription}


====================================================
REQUIREMENTS
====================================================

1. TITLE

Extract the actual target job title from the job
description.

Example:

"Junior Full Stack Developer"

Do not use a generic title such as:

"Interview Report"


----------------------------------------------------
2. MATCH SCORE
----------------------------------------------------

Generate a realistic score between 0 and 100.

Compare:

- candidate skills
- candidate experience
- candidate projects
- candidate technologies
- job requirements
- required qualifications


----------------------------------------------------
3. TECHNICAL QUESTIONS
----------------------------------------------------

Generate EXACTLY 5 technical interview questions.

Questions must be relevant to the target job.

Base them on technologies and concepts mentioned
in the job description.

For every question provide:

question:
The actual interview question.

intention:
What the interviewer wants to evaluate.

answer:
A strong explanation of how the candidate should
answer.


----------------------------------------------------
4. BEHAVIORAL QUESTIONS
----------------------------------------------------

Generate EXACTLY 3 behavioral questions.

Make them relevant to:

- candidate background
- candidate projects
- candidate experience
- target job
- teamwork
- problem solving
- communication


For every question provide:

question
intention
answer


----------------------------------------------------
5. SKILL GAPS
----------------------------------------------------

Generate AT LEAST 5 skill gaps.

Compare the candidate's current profile against
the target job description.

IMPORTANT:

Only identify real skill gaps.

If the candidate already demonstrates a skill,
DO NOT incorrectly mark that skill as a gap.

Each skill gap MUST have exactly:

skill

severity

Severity must be exactly one of:

low
medium
high


----------------------------------------------------
6. PREPARATION PLAN
----------------------------------------------------

Generate EXACTLY 7 days.

Every day MUST contain:

day
focus
tasks

Every day MUST contain AT LEAST 3 tasks.

The preparation plan must be specific to the
candidate and target job.

Example:

Day 1:
Focus: JavaScript fundamentals

Tasks:
- Revise closures
- Practice promises
- Solve async JavaScript problems


----------------------------------------------------
IMPORTANT
----------------------------------------------------

Return ONLY valid JSON.

Do not return Markdown.

Do not return code fences.

Do not add explanations outside JSON.

Do not omit any field.

Do not return null.

Do not return empty arrays.

Make sure every field contains the correct data type.

`;


        // ---------------------------------------------
        // Call Gemini
        // ---------------------------------------------

        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: prompt,

            config: {

                responseMimeType: "application/json",

                responseSchema: interviewReportJsonSchema,
            },
        });


        // ---------------------------------------------
        // Get response text
        // ---------------------------------------------

        const responseText = response.text;


        if (!responseText) {
            throw new Error(
                "Gemini returned an empty response"
            );
        }


        // ---------------------------------------------
        // Parse JSON
        // ---------------------------------------------

        let parsedResponse;

        try {

            parsedResponse = JSON.parse(responseText);

        } catch (error) {

            console.error(
                "Gemini returned invalid JSON:",
                responseText
            );

            throw new Error(
                "Gemini returned invalid JSON"
            );
        }


        // ---------------------------------------------
        // Validate with Zod
        // ---------------------------------------------

        const validationResult =
            interviewReportSchema.safeParse(
                parsedResponse
            );


        if (!validationResult.success) {

            console.error(
                "\n======================================"
            );

            console.error(
                "AI RESPONSE VALIDATION FAILED"
            );

            console.error(
                "======================================"
            );

            console.error(
                validationResult.error.format()
            );

            console.error(
                "======================================\n"
            );

            throw new Error(
                "AI generated an invalid interview report"
            );
        }


        // ---------------------------------------------
        // Final validated report
        // ---------------------------------------------

        const interviewReport =
            validationResult.data;


        console.dir(
            interviewReport,
            {
                depth: null,
                colors: true,
            }
        );



        return interviewReport;

    } catch (error) {

        console.error(
            "\n======================================"
        );

        console.error(
            "generateInterviewReport ERROR"
        );

        console.error(
            "======================================"
        );

        console.error(error);

        console.error(
            "======================================\n"
        );

        throw error;
    }
}


// =====================================================
// GENERATE PDF FROM HTML
// =====================================================

async function generatePdfFromHtml(htmlContent) {

    let browser;

    try {

        browser = await puppeteer.launch({
            headless: true,
        });


        const page = await browser.newPage();


        await page.setContent(
            htmlContent,
            {
                waitUntil: "networkidle0",
            }
        );


        const pdfBuffer = await page.pdf({

            format: "A4",

            printBackground: true,

            margin: {

                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm",
            },
        });


        return pdfBuffer;

    } finally {

        if (browser) {
            await browser.close();
        }
    }
}


// =====================================================
// GENERATE ATS FRIENDLY RESUME PDF
// =====================================================

async function generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
}) {

    try {

        const resumePdfSchema = z.object({

            html: z
                .string()
                .min(1),
        });


        const resumePdfJsonSchema = {

            type: "object",

            properties: {

                html: {
                    type: "string",
                },
            },

            required: [
                "html",
            ],
        };


        const prompt = `

You are an expert professional resume writer.

Create a professional ATS-friendly resume using the
candidate information below.

====================================================
CURRENT RESUME
====================================================

${resume}


====================================================
SELF DESCRIPTION
====================================================

${selfDescription}


====================================================
TARGET JOB DESCRIPTION
====================================================

${jobDescription}


====================================================
RESUME REQUIREMENTS
====================================================

1. Tailor the resume specifically for the target job.

2. Highlight relevant technical skills.

3. Highlight relevant projects and experience.

4. Use professional human-written language.

5. Do not mention that AI generated the resume.

6. Do not invent fake companies, degrees, jobs,
   certifications, or experience.

7. Only use information supported by the candidate's
   supplied information.

8. Make the resume ATS friendly.

9. Use simple HTML.

10. The resume should ideally be 1-2 pages.

11. Use professional sections such as:

- Name
- Contact Information
- Professional Summary
- Technical Skills
- Experience
- Projects
- Education
- Certifications

Only include sections when relevant information
exists.

12. Do not use external images.

13. Do not use JavaScript.

14. Use inline or embedded CSS.

15. Return ONLY JSON.

The JSON must contain exactly:

{
    "html": "..."
}

`;


        // ---------------------------------------------
        // Gemini request
        // ---------------------------------------------

        const response =
            await ai.models.generateContent({

                model: "gemini-3.6-flash",

                contents: prompt,

                config: {

                    responseMimeType:
                        "application/json",

                    responseSchema:
                        resumePdfJsonSchema,
                },
            });


        // ---------------------------------------------
        // Parse response
        // ---------------------------------------------

        const responseText =
            response.text;


        if (!responseText) {

            throw new Error(
                "Gemini returned an empty resume response"
            );
        }


        let parsedResponse;

        try {

            parsedResponse =
                JSON.parse(responseText);

        } catch (error) {

            console.error(
                "Invalid resume JSON:",
                responseText
            );

            throw new Error(
                "Gemini returned invalid resume JSON"
            );
        }


        // ---------------------------------------------
        // Validate HTML
        // ---------------------------------------------

        const validationResult =
            resumePdfSchema.safeParse(
                parsedResponse
            );


        if (!validationResult.success) {

            console.error(
                validationResult.error.format()
            );

            throw new Error(
                "Generated resume HTML is invalid"
            );
        }


        // ---------------------------------------------
        // Generate PDF
        // ---------------------------------------------

        const pdfBuffer =
            await generatePdfFromHtml(
                validationResult.data.html
            );


        return pdfBuffer;

    } catch (error) {

        console.error(
            "generateResumePdf ERROR:",
            error
        );

        throw error;
    }
}


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    generateInterviewReport,
    generateResumePdf,
};