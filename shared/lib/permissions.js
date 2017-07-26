import _ from 'lodash'

export function userPermissions(props) {
  const {auth, profile} = props
  const user = props.user || auth.get('user') && auth.get('user').toJSON()
  if (!user) return {}
  return {
    globalAdmin: user.admin,
    profileOwner: profile && (user.id === profile.user_id),
  }
}

export function organisationPermissions(props) {
  const {auth, organisation, organisations} = props
  const user = props.user || auth.get('user') && auth.get('user').toJSON()

  const organisationId = props.organisationId || (organisation && organisation.id) || organisation ||
                         (organisations && organisations.get('active') && organisations.get('active').get('id'))
  if (!organisationId) return {}

  return {
    organisationAdmin: user.organisation_id === organisationId && user.organisationAdmin,
  }
}

export function permissions(props) {
  return _.merge(
    userPermissions(props),
    organisationPermissions(props)
  )
}

/*
 * User profile permissions
 */
export function userCanEditProfile(...args) {
  const userIs = permissions(...args)
  return !!(userIs.globalAdmin || userIs.profileOwner)
}

/*
 * Organisation permissions
 */
export function userCanEditOrganisation(...args) {
  const userIs = permissions(...args)
  return !!(userIs.globalAdmin || userIs.organisationAdmin)
}
