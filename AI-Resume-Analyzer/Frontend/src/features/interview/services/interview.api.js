import axios from "axios";

// Axios Instance
const api = axios.create({

    baseURL: "http://localhost:3000",

    // Send authentication cookie
    withCredentials: true,
});

// Generate Interview Report
/**
 * @description
 * Generate an AI interview report using:
 * - Job description
 * - Self description
 * - Resume PDF
 *
 * @param {Object} data
 * @param {string} data.jobDescription
 * @param {string} data.selfDescription
 * @param {File} data.resumeFile
 *
 * @returns {Object}
 */

export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
}) => {

    try {
        // Validate input
        if (!jobDescription?.trim()) {

            throw new Error(
                "Job description is required."
            );
        }


        if (!selfDescription?.trim()) {

            throw new Error(
                "Self description is required."
            );
        }


        if (!resumeFile) {

            throw new Error(
                "Resume file is required."
            );
        }

        // Create FormData
        const formData = new FormData();


        formData.append(
            "jobDescription",
            jobDescription
        );


        formData.append(
            "selfDescription",
            selfDescription
        );


        // IMPORTANT:
        // "resume" must match the multer field name
        // in your backend.
        formData.append(
            "resume",
            resumeFile
        );

        // Send request        //
        // Do NOT manually set Content-Type.
        // Browser/Axios will automatically add:
        //
        // multipart/form-data;
        // boundary=----------------...
        //
        const response = await api.post(
            "/api/interview/",
            formData
        );

        // Validate server response
        if (
            !response.data ||
            !response.data.interviewReport
        ) {

            throw new Error(
                "Invalid interview report response from server."
            );
        }

        return response.data;

    } catch (error) {

        console.error(
            "Generate interview report failed:",
            error.response?.data ||
            error.message
        );


        // IMPORTANT:
        // Re-throw so useInterview.js can catch it.
        throw error;
    }
};

// Get Interview Report By ID
/**
 * @description
 * Get a single interview report.
 *
 * @param {string} interviewId
 *
 * @returns {Object}
 */

export const getInterviewReportById = async (
    interviewId
) => {

    try {
        // Validate ID
        if (!interviewId) {

            throw new Error(
                "Interview ID is required."
            );
        }

        // API request
        const response = await api.get(
            `/api/interview/report/${interviewId}`
        );

        // Validate response
        if (
            !response.data ||
            !response.data.interviewReport
        ) {

            throw new Error(
                "Interview report not found."
            );
        }

        return response.data;

    } catch (error) {

        console.error(
            "Get interview report failed:",
            error.response?.data ||
            error.message
        );


        throw error;
    }
};

// Get All Interview Reports
/**
 * @description
 * Get all interview reports belonging to
 * the currently logged-in user.
 *
 * @returns {Object}
 */

export const getAllInterviewReports = async () => {

    try {
        // API request
        const response = await api.get(
            "/api/interview/"
        );

        // Validate response
        if (
            !response.data ||
            !Array.isArray(
                response.data.interviewReports
            )
        ) {

            throw new Error(
                "Invalid interview reports response from server."
            );
        }
        return response.data;

    } catch (error) {

        console.error(
            "Get all interview reports failed:",
            error.response?.data ||
            error.message
        );


        throw error;
    }
};

// Generate Resume PDF
/**
 * @description
 * Generate an ATS-friendly resume PDF from
 * an existing interview report.
 *
 * @param {string} interviewReportId
 *
 * @returns {Blob}
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })

    return response.data
}