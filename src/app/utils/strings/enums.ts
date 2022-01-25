export const enumRoles = ['Acadêmico', 'Revisor', 'Tradutor'];
export const enumLanguages = [
  'Português',
  'Inglês',
  'Espanhol',
  'Francês',
  'Alemão',
];

export const enumEducationFromString = (education: string) => {
  switch (education) {
    case 'grad':
      return 'gradDegrees';
    case 'msc':
      return 'mscDegrees';
    case 'phd':
      return 'phdDegrees';
    case 'esp':
      return 'specializations';
  }
};
