class Education {
  gradDegrees: [
    { degreeSubject: string; university: string; duration: string[] },
  ];
  masterDegrees: [
    { degreeSubject: string; university: string; duration: string[] },
  ];
  phdDegrees: [
    { degreeSubject: string; university: string; duration: string[] },
  ];
  specializations: [
    { subject: string; institution: string; duration: string[] },
  ];
}

class Qualifications {
  languages: [{ name: string; expirience: string }];
  education: Education;
  interests: [{ subject: string; description: string }];
}

export { Education };
export default Qualifications;
