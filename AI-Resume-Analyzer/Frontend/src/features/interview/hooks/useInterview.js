import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  generateResumePdf,
} from "../services/interview.api";

import {
   useCallback, useEffect, useState, useContext
} from "react";

import { InterviewContext } from "../interview.context";

import { useParams } from "react-router";


export const useInterview = () => {

  // =====================================================
  // Context
  // =====================================================

  const context = useContext(InterviewContext);

  const { interviewId } = useParams();


  if (!context) {
    throw new Error(
      "useInterview must be used within an InterviewProvider"
    );
  }


  const {
    loading,
    setLoading,

    report,
    setReport,

    reports,
    setReports,
  } = context;


  // =====================================================
  // Generate Interview Report
  // =====================================================

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {

    setLoading(true);

    try {

      // -----------------------------------------------
      // Validate input
      // -----------------------------------------------

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


      // -----------------------------------------------
      // API request
      // -----------------------------------------------

      const response =
        await generateInterviewReport({

          jobDescription,

          selfDescription,

          resumeFile,
        });


      // -----------------------------------------------
      // Validate response
      // -----------------------------------------------

      if (
        !response ||
        !response.interviewReport
      ) {

        throw new Error(
          "Invalid response received from server."
        );
      }


      // -----------------------------------------------
      // Set report in context
      // -----------------------------------------------

      setReport(
        response.interviewReport
      );


      // -----------------------------------------------
      // Return report
      // -----------------------------------------------

      return response.interviewReport;

    } catch (error) {

      console.error(
        "generateReport failed:",
        error.response?.data ||
        error.message
      );

      // Important:
      // Do NOT access response here.
      return null;

    } finally {

      setLoading(false);
    }
  };


  // =====================================================
  // Get Interview Report By ID
  // =====================================================
const getReportById = useCallback(async (interviewId) => {
    setLoading(true);

    try {
        if (!interviewId) {
            throw new Error("Interview ID is required.");
        }

        const response = await getInterviewReportById(interviewId);

        if (!response?.interviewReport) {
            throw new Error("Interview report not found.");
        }

        setReport(response.interviewReport);

        
        return response.interviewReport;

    } catch (error) {
        console.error(
            "getReportById failed:",
            error.response?.data || error.message
        );

        return null;
    } finally {
        setLoading(false);
    }
}, []);


  // =====================================================
  // Get All Interview Reports
  // =====================================================

  const getReports = async () => {

    setLoading(true);

    try {

      // -----------------------------------------------
      // API request
      // -----------------------------------------------

      const response =
        await getAllInterviewReports();


      // -----------------------------------------------
      // Validate response
      // -----------------------------------------------

      if (
        !response ||
        !Array.isArray(
          response.interviewReports
        )
      ) {

        throw new Error(
          "Invalid reports response received from server."
        );
      }


      // -----------------------------------------------
      // Save reports
      // -----------------------------------------------

      setReports(
        response.interviewReports
      );


      return response.interviewReports;

    } catch (error) {

      console.error(
        "getReports failed:",
        error.response?.data ||
        error.message
      );

      return [];

    } finally {

      setLoading(false);
    }
  };


  // =====================================================
  // Generate / Download Resume PDF
  // =====================================================

  const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


  // =====================================================
  // Load Reports / Report By ID
  // =====================================================

  useEffect(() => {

    if (interviewId) {

      getReportById(
        interviewId
      );

    } else {

      getReports();

    }

  }, [interviewId]);


  // =====================================================
  // Return Hook API
  // =====================================================

  return {

    loading,

    report,

    reports,

    generateReport,

    getReportById,

    getReports,

    getResumePdf,
  };
};