const mongoose = require("mongoose");

// Technical Question Schema
const technicalQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Technical question is required"],
            trim: true,
        },

        intention: {
            type: String,
            required: [true, "Intention is required"],
            trim: true,
        },

        answer: {
            type: String,
            required: [true, "Answer is required"],
            trim: true,
        },
    },
    {
        _id: false,
    }
);

// Behavioral Question Schema
const behavioralQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "Behavioral question is required"],
            trim: true,
        },

        intention: {
            type: String,
            required: [true, "Intention is required"],
            trim: true,
        },

        answer: {
            type: String,
            required: [true, "Answer is required"],
            trim: true,
        },
    },
    {
        _id: false,
    }
);

// Skill Gap Schema
const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, "Skill is required"],
            trim: true,
        },

        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "Severity is required"],
        },
    },
    {
        _id: false,
    }
);

// Preparation Plan Schema
const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, "Day is required"],
        },

        focus: {
            type: String,
            required: [true, "Focus is required"],
            trim: true,
        },

        tasks: {
            type: [String],
            required: [true, "Tasks are required"],
            validate: {
                validator: function (tasks) {
                    return tasks.length >= 3;
                },
                message: "Each preparation day must have at least 3 tasks",
            },
        },
    },
    {
        _id: false,
    }
);

// Main Interview Report Schema
const interviewReportSchema = new mongoose.Schema(
    {        // Job Description
        jobDescription: {
            type: String,
            required: [true, "Job description is required"],
            trim: true,
        },

        // Resume
        resume: {
            type: String,
            required: [true, "Resume is required"],
        },

        // Self Description
        selfDescription: {
            type: String,
            required: [true, "Self description is required"],
        },

        // Match Score
        matchScore: {
            type: Number,
            required: [true, "Match score is required"],
            min: [0, "Match score cannot be less than 0"],
            max: [100, "Match score cannot be greater than 100"],
        },

        // Technical Questions
        technicalQuestions: {
            type: [technicalQuestionSchema],
            required: [true, "Technical questions are required"],

            validate: {
                validator: function (questions) {
                    return questions.length >= 5;
                },
                message:
                    "At least 5 technical questions are required",
            },
        },

        // Behavioral Questions
        behavioralQuestions: {
            type: [behavioralQuestionSchema],
            required: [true, "Behavioral questions are required"],

            validate: {
                validator: function (questions) {
                    return questions.length >= 3;
                },
                message:
                    "At least 3 behavioral questions are required",
            },
        },

        // Skill Gaps
        skillGaps: {
            type: [skillGapSchema],
            required: [true, "Skill gaps are required"],

            validate: {
                validator: function (gaps) {
                    return gaps.length >= 5;
                },
                message:
                    "At least 5 skill gaps are required",
            },
        },

        // Preparation Plan
        preparationPlan: {
            type: [preparationPlanSchema],
            required: [true, "Preparation plan is required"],

            validate: {
                validator: function (plan) {
                    return plan.length >= 7;
                },
                message:
                    "At least 7 preparation days are required",
            },
        },

        // User
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "User is required"],
        },

        // Job Title
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create Model
const interviewReportModel = mongoose.model(
    "InterviewReport",
    interviewReportSchema
);

// Export Model
module.exports = interviewReportModel;