import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    rollNo: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    IENGOL1: {
      type: String,
      trim: true,
      default: "0",
    },
    IENGOL1Book: {
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
    IENGOL2: {
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

// const StudentSchema = new Schema(
//   {
// "Roll No": {
//   type: String,
//   required: true,
//   trim: true,
//   unique: true,
// },
// Duplicates: {
//   type: Boolean,
//   default: false,
// },
// "School Code": {
//   type: Number,
//   required: true,
// },
// Class: {
//   type: String,
//   required: true,
//   trim: true,
// },
// Section: {
//   type: String,
//   required: true,
//   trim: true,
// },
// "Student Name": {
//   type: String,
//   required: true,
//   trim: true,
// },
// "Father Name": {
//   type: String,
//   trim: true,
//   default: "",
// },
// "Mother Name": {
//   type: String,
//   trim: true,
//   default: "",
// },
// DOB: {
//   type: String,
//   trim: true,
//   default: "",
// },
// "Mob No.": {
//   type: String,
//   trim: true,
//   default: "",
// },
// IAOL1: {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "IAOL1 Book": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// ITSTL1: {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "ITSTL1 Book": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// IMOL1: {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "IMOL1 Book": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// IENGOL1: {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "IENGOL1 Book": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// IGKOL1: {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "IGKOL1 Book": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "Total Basic Level Participated Exams": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "Basic Level Full Amount": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "Basic Level Paid Amount": {
//   type: String,
//   trim: true,
//   default: "0",
// },
// "Basic Level Amount Paid Online": {
//   type: String,
//   trim: true,
//   default: "",
// },
// "Is Basic Level Concession Given": {
//   type: String,
//   trim: true,
//   default: "",
// },
// "Concession Reason": {
//   type: String,
//   trim: true,
//   default: "",
// },
// "Parents Working School": {
//   type: String,
//   trim: true,
//   default: "",
// },
// "Designation": {
//   type: String,
//   trim: true,
//   default: "",
// },
// "City": {
//   type: String,
//   trim: true,
//   default: "0",
// },
//     "IAOL2": {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     "ITSTL2": {
//       type: String,
//       trim: true,
//       default: "0",
//     },
//     "IMOL2": {
//       type: String,
//       trim: true,
//       default: "0",
//     },
//     "IENGOL2": {
//       type: String,
//       trim: true,
//       default: "0",
//     },
//     "Advance Level Paid Amount": {
//       type: String,
//       trim: true,
//       default: "0",
//     },
//     "Advance Level Amount Paid Online": {
//       type: String,
//       trim: true,
//       default: "0",
//     },
//     "Total Amount Paid": {
//       type: String,
//       trim: true,
//       default: "0",
//     },
//     "Total Amount Paid Online": {
//       type: String,
//       trim: true,
//       default: "0",
//     }
//   },
//   // { collection: "student-data" }
//   {
//     timestamps: true,
//   }
// );

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
      $eq: [
        { $trim: { input: "$studentName", chars: " " } },
        studentName.trim(),
      ],
    },
  ];

  if (schoolCode) {
    exprConditions.push({
      $eq: ["$schoolCode", Number(schoolCode)],
    });
  }

  if (className && Array.isArray(className) && className.length > 0) {
    exprConditions.push({
      $in: [
        { $trim: { input: "$class", chars: " " } },
        className.map((cls) => cls.trim()),
      ],
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
          $or: [{ [field1]: 1 }, { [field2]: 1 }],
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
