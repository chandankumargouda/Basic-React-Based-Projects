const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");

const {
    generateInterviewReport,
    generateResumePdf,
} = require("../services/ai.service");

const interviewReportModel = require("../models/interviewReport.model");


// =====================================================
// GENERATE INTERVIEW REPORT
// =====================================================

/**
 * @description
 * Generate an AI-powered interview report using:
 * - Resume PDF
 * - Self description
 * - Job description
 *
 * @route POST /api/interview/generate
 * @access Private
 */

async function generateInterViewReportController(req, res) {

    try {

        // -------------------------------------------------
        // Check authentication
        // -------------------------------------------------

        if (!req.user || !req.user.id) {

            return res.status(401).json({
                message: "Unauthorized. Please login first.",
            });
        }


        // -------------------------------------------------
        // Check resume file
        // -------------------------------------------------

        if (!req.file) {

            return res.status(400).json({
                message: "Resume file is required.",
            });
        }


        // -------------------------------------------------
        // Check file type
        // -------------------------------------------------

        if (
            req.file.mimetype !== "application/pdf" &&
            req.file.mimetype !==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {

            return res.status(400).json({
                message:
                    "Only PDF or DOCX resume files are supported.",
            });
        }


        // -------------------------------------------------
        // Get request body
        // -------------------------------------------------

        const {
            selfDescription,
            jobDescription,
        } = req.body;


        // -------------------------------------------------
        // Validate job description
        // -------------------------------------------------

        if (
            !jobDescription ||
            !jobDescription.trim()
        ) {

            return res.status(400).json({
                message: "Job description is required.",
            });
        }


        // -------------------------------------------------
        // Validate self description
        // -------------------------------------------------

        if (
            !selfDescription ||
            !selfDescription.trim()
        ) {

            return res.status(400).json({
                message: "Self description is required.",
            });
        }


        // -------------------------------------------------
        // Validate file buffer
        // -------------------------------------------------

        if (!req.file.buffer) {

            return res.status(400).json({
                message:
                    "Resume file could not be read.",
            });
        }


        // =================================================
        // Extract text from PDF
        // =================================================

        let resumeContent;

        try {

            const parser =
                new pdfParse.PDFParse(
                    Uint8Array.from(
                        req.file.buffer
                    )
                );

            resumeContent =
                await parser.getText();

        } catch (error) {

            console.error(
                "PDF parsing error:",
                error
            );

            return res.status(400).json({
                message:
                    "Could not read the resume PDF.",
            });
        }


        // -------------------------------------------------
        // Validate extracted resume text
        // -------------------------------------------------

        if (
            !resumeContent ||
            !resumeContent.text ||
            !resumeContent.text.trim()
        ) {

            return res.status(400).json({
                message:
                    "Could not extract text from the resume.",
            });
        }


        // =================================================
        // Generate AI Interview Report
        // =================================================



        const interviewReportByAi =
            await generateInterviewReport({

                resume:
                    resumeContent.text,

                selfDescription:
                    selfDescription.trim(),

                jobDescription:
                    jobDescription.trim(),
            });


        // -------------------------------------------------
        // Check AI response
        // -------------------------------------------------

        if (
            !interviewReportByAi ||
            typeof interviewReportByAi !==
                "object"
        ) {

            throw new Error(
                "AI returned an invalid interview report."
            );
        }



        console.dir(
            interviewReportByAi,
            {
                depth: null,
                colors: true,
            }
        );

        

        // =================================================
        // Save report to MongoDB
        // =================================================

        const interviewReport =
            await interviewReportModel.create({

                user: req.user.id,

                resume:
                    resumeContent.text,

                selfDescription:
                    selfDescription.trim(),

                jobDescription:
                    jobDescription.trim(),

                ...interviewReportByAi,
            });


        // =================================================
        // Send response
        // =================================================

        return res.status(201).json({

            message:
                "Interview report generated successfully.",

            interviewReport,
        });

    } catch (error) {

        console.error(
            "\n======================================"
        );

        console.error(
            "GENERATE INTERVIEW REPORT ERROR"
        );

        console.error(
            "======================================"
        );

        console.error(error);

        console.error(
            "======================================\n"
        );


        // -------------------------------------------------
        // Mongoose validation error
        // -------------------------------------------------

        if (
            error.name ===
            "ValidationError"
        ) {

            return res.status(400).json({

                message:
                    "Interview report validation failed.",

                errors:
                    Object.values(
                        error.errors
                    ).map(
                        (err) => err.message
                    ),
            });
        }


        // -------------------------------------------------
        // Default server error
        // -------------------------------------------------

        return res.status(500).json({

            message:
                "Failed to generate interview report.",

            error:
                error.message,
        });
    }
}


// =====================================================
// GET INTERVIEW REPORT BY ID
// =====================================================

/**
 * @description
 * Get a single interview report belonging to
 * the logged-in user.
 *
 * @route GET /api/interview/:interviewId
 * @access Private
 */

async function getInterviewReportByIdController(
    req,
    res
) {

    try {

        // -------------------------------------------------
        // Check authentication
        // -------------------------------------------------

        if (!req.user || !req.user.id) {

            return res.status(401).json({
                message:
                    "Unauthorized. Please login first.",
            });
        }


        // -------------------------------------------------
        // Get interview ID
        // -------------------------------------------------

        const {
            interviewId,
        } = req.params;


        // -------------------------------------------------
        // Validate ObjectId
        // -------------------------------------------------

        if (
            !mongoose.Types.ObjectId.isValid(
                interviewId
            )
        ) {

            return res.status(400).json({
                message:
                    "Invalid interview report ID.",
            });
        }


        // -------------------------------------------------
        // Find report
        // -------------------------------------------------

        const interviewReport =
            await interviewReportModel.findOne({

                _id: interviewId,

                user: req.user.id,
            });


        // -------------------------------------------------
        // Report not found
        // -------------------------------------------------

        if (!interviewReport) {

            return res.status(404).json({
                message:
                    "Interview report not found.",
            });
        }


        // -------------------------------------------------
        // Success
        // -------------------------------------------------

        return res.status(200).json({

            message:
                "Interview report fetched successfully.",

            interviewReport,
        });

    } catch (error) {

        console.error(
            "Get Interview Report Error:",
            error
        );

        return res.status(500).json({

            message:
                "Failed to fetch interview report.",

            error:
                error.message,
        });
    }
}


// =====================================================
// GET ALL INTERVIEW REPORTS
// =====================================================

/**
 * @description
 * Get all interview reports belonging to the
 * currently logged-in user.
 *
 * @route GET /api/interview
 * @access Private
 */

async function getAllInterviewReportsController(
    req,
    res
) {

    try {

        // -------------------------------------------------
        // Check authentication
        // -------------------------------------------------

        if (!req.user || !req.user.id) {

            return res.status(401).json({
                message:
                    "Unauthorized. Please login first.",
            });
        }


        // -------------------------------------------------
        // Get reports
        // -------------------------------------------------

        const interviewReports =
            await interviewReportModel

                .find({
                    user: req.user.id,
                })

                .sort({
                    createdAt: -1,
                })

                // Do not send large fields to
                // the reports listing page.
                .select(
                    "-resume " +
                    "-selfDescription " +
                    "-jobDescription " +
                    "-__v " +
                    "-technicalQuestions " +
                    "-behavioralQuestions " +
                    "-skillGaps " +
                    "-preparationPlan"
                );


        // -------------------------------------------------
        // Success
        // -------------------------------------------------

        return res.status(200).json({

            message:
                "Interview reports fetched successfully.",

            interviewReports,
        });

    } catch (error) {

        console.error(
            "Get All Interview Reports Error:",
            error
        );

        return res.status(500).json({

            message:
                "Failed to fetch interview reports.",

            error:
                error.message,
        });
    }
}


// =====================================================
// GENERATE RESUME PDF
// =====================================================

/**
 * @description
 * Generate a tailored ATS-friendly resume PDF
 * from an existing interview report.
 *
 * @route GET /api/interview/:interviewReportId/resume
 * @access Private
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}


// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {

    generateInterViewReportController,

    getInterviewReportByIdController,

    getAllInterviewReportsController,

    generateResumePdfController,
};