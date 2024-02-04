interface IGenderFormatter {
  [ key : string ] : string
}

export const genderFormatter : IGenderFormatter = {
  'Male': 'Masculino',
  'Female': 'Femenino',
  'Other': 'Otro'
}
