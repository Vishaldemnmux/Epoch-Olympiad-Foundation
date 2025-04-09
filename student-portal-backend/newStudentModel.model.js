import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    rollNo: {
      type: String,
      required: true,
      trim: true,
    },
    Duplicates: {
      type: Boolean,
      default: false,
    },
    schoolCode: {
      type: Number,
      required: true,
    },
    class: {
      type: String,
      required: true,
      trim: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    motherName: {
      type: String,
      trim: true,
      default: "",
    },
    fatherName: {
      type: String,
      trim: true,
      default: "",
    },
    dob: {
      type: String,
      trim: true,
      default: "",
    },
    mobNo: {
      type: String,
      trim: true,
      default: "",
    },
    IAOL1: {
      type: String,
      trim: true,
      default: "0",
    },
    IAOL1Book: {
      type: String,
      trim: true,
      default: "0",
    },
    ITSTL1: {
      type: String,
      trim: true,
      default: "0",
    },
    ITSTL1Book: {
      type: String,
      trim: true,
      default: "0",
    },
    IMOL1: {
      type: String,
      trim: true,
      default: "0",
    },
    IMOL1Book: {
      type: String,
      trim: true,
      default: "0",
    },
    IGKOL1: {
      type: String,
      trim: true,
      default: "0",
    },
    IGKOL1Book: {
      type: String,
      trim: true,
      default: "0",
    },
    totalBasicLevelParticipatedExams: {
      type: String,
      trim: true,
      default: "0",
    },
    basicLevelFullAmount: {
      type: String,
      trim: true,
      default: "0",
    },
    basicLevelAmountPaid: {
      type: String,
      trim: true,
      default: "0",
    },
    basicLevelAmountPaidOnline: {
      type: String,
      trim: true,
      default: "",
    },
    isBasicLevelConcessionGiven: {
      type: String,
      trim: true,
      default: "",
    },
    concessionReason: {
      type: String,
      trim: true,
      default: "",
    },
    remark: {
      type: String,
      trim: true,
      default: "",
    },
    ParentsWorkingschool: {
      type: String,
      trim: true,
      default: "",
    },
    designation: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    bookStatus: {
      type: String,
      trim: true,
      default: "",
    },
    IAOL2: {
      type: String,
      trim: true,
      default: "0",
    },
    ITSTL2: {
      type: String,
      trim: true,
      default: "0",
    },
    IMOL2: {
      type: String,
      trim: true,
      default: "0",
    },
    advanceLevelAmountPaid: {
      type: String,
      trim: true,
      default: "",
    },
    advanceLevelAmountPaidOnline: {
      type: String,
      trim: true,
      default: "",
    },
    totalAmountPaid: {
      type: String,
      trim: true,
      default: "",
    },
    totalAmountPaidOnline: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Register the model
export const STUDENT_LATEST = mongoose.model(
  "student_data_latest",
  StudentSchema
);

export const getStudentsByFilters = async (
  schoolCode,
  className,
  rollNo,
  section,
  studentName,
  subject
) => {
  const exprConditions = [
    {
      $eq: [{ $trim: { input: "$rollNo", chars: " " } }, rollNo.trim()],
    },
    {
      $eq: [{ $trim: { input: "$studentName", chars: " " } }, studentName.trim()],
    },
  ];

  if (schoolCode) {
    exprConditions.push({
      $eq: ["$schoolCode", Number(schoolCode)], // Direct number comparison
    });
  }

  if (className) {
    exprConditions.push({
      $eq: [{ $trim: { input: "$class", chars: " " } }, className.trim()],
    });
  }

  if (section) {
    exprConditions.push({
      $eq: [{ $trim: { input: "$section", chars: " " } }, section.trim()],
    });
  }

  const matchStage = {};

  if (subject) {
    const field1 = `${subject}L1`;
    const field2 = `${subject}L2`;

    matchStage.$match = {
      $and: [
        {
          $or: [
            { [field1]: 1 },
            { [field2]: 1 },
          ],
        },
        {
          $expr: {
            $and: exprConditions,
          },
        },
      ],
    };
  } else {
    matchStage.$match = {
      $expr: {
        $and: exprConditions,
      },
    };
  }

  const result = await STUDENT_LATEST.aggregate([matchStage]);

  return result;
};

