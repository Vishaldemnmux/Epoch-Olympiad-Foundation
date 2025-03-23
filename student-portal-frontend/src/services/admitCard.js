import nodeHtmlToImage from "node-html-to-image";
import fs from "fs";

export default async function generateAdmitCard(info) {
  await nodeHtmlToImage({
    output: `../outputs/admitCard_${info.name}.png`,
    html: fs.readFileSync("../designs/admitCard.html", "utf8"),
    content: {
      name: info.name,
      father: info.fatherName,
      mother: info.mother,
      class: info.class,
      section: info.section,
      rollNo: info.rollNo,
      school: info.school,
      classTeacher: info.classTeacher || "",
      principal: info.principal || "",
      IAO: info.IAO, // boolean
      ITST: info.ITST,
      IMO: info.IMO,
      IGKO: info.IGKO,
      ITSTDetails: info.ITSTDetails,
      IMODetails: info.IMODetails,
      examCenter: info.examCenter || "YOUR OWN SCHOOL",
      qrUrl:
        "https://api.qrserver.com/v1/create-qr-code/?data=https://wa.me/919999999999&size=100x100",
    },
    puppeteerArgs: {
      defaultViewport: {
        width: 900,
        height: 1100,
      },
    },
    type: "png",
    quality: 100,
  });

  console.log(`Admit card generated for ${info.name}`);
}

const studentInfo = {
  name: "Aviral Shukla",
  fatherName: "Ajay Shukla",
  mother: "Vashnavi Shukla",
  class: "10",
  section: "B",
  rollNo: "16101110",
  school: "S. J. EDUCATION CENTRE, HANSH PURAM",
  classTeacher: "Mrs. Sharma",
  principal: "Mr. Rajesh Kumar",

  IAO: false,
  ITST: true,
  IMO: true,
  IGKO: false,

  ITSTDetails: "18 November 2024, During School Hours",
  IMODetails: "9 November 2024, During School Hours",

  examCenter: "YOUR OWN SCHOOL",
};


generateAdmitCard(studentInfo);
