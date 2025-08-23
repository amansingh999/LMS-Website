const StudentCourses = require("../../models/StudentCourses");

const getCoursesByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userId: studentId,
    });

    res.status(200).json({
      success: true,
      data: studentBoughtCourses.courses,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "No Courses found !",
    });
  }
};

module.exports = { getCoursesByStudentId };
