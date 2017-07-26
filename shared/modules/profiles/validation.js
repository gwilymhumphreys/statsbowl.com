
export default function validateProfile(data) {
  const errors = {}
  if (!data.firstName) errors.firstName = 'A first name please!'
  if (!data.lastName) errors.lastName = 'A last name please!'
  if (data.contactEmail && !data.contactEmail.match(/.+@.+/)) errors.contactEmail = 'This should look like an email address'
  return errors
}
