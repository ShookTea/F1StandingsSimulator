export interface Driver {
  driverDetails: DriverDetails
}

export interface DriverDetails {
  uuid: string
  givenName: string
  familyName: string
  familyNameFirst: boolean
  fullName: string
  routePart: string
}
