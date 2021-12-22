class Education {
  gradDegrees: [{ name: string; university: string; duration: string }];
  masterDegrees: [{ name: string; university: string; duration: string }];
  phdDegrees: [{ name: string; university: string; duration: string }];
  specializations: [{ subject: string }];
}

class Qualifications {
  languages: [{ name: string; expirience: string }];
  education: Education;
  interests: [{ subject: string; description: string }];
}

export default Qualifications;
