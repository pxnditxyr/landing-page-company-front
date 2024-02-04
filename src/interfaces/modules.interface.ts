export interface IUser {
  id: string
  email: string
  name: string
  lastname: string
  birthdate: Date
  gender: string
  phone: string
  info: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface ITeam {
  id: string
  name: string
  details: string
  imageUrl: string
  companyId: string

  createdAt: Date
  updatedAt: Date

  company?: ICompany | null
  teamMembers?: ITeamMember[]
  projectsTeams?: IProjectsTeam[]
}

export interface ICompany {
  id: string
  name: string
  details: string
  phone: string
  info: string
  mission: string
  vision: string
  address?: string | null
  website?: string | null
  email?: string | null
  documentNumber?: string | null
  foundedAt: Date

  createdAt: Date
  updatedAt: Date

  teams?: ITeam[]
}

export interface ITeamMember {
  id: string
  userId: string
  teamId: string

  createdAt: Date
  updatedAt: Date

  team?: ITeam | null
  user?: IUser | null
}

export interface IProjectsTeam {
  id: string
  projectId: string
  teamId: string

  createdAt: Date
  updatedAt: Date

  project?: IProject | null
  team?: ITeam | null
}

export interface IProject {
  id: string
  name: string
  details: string
  info: string
  imageUrl: string

  createdAt: Date
  updatedAt: Date

  projectsTeams?: IProjectsTeam[]
}

export interface IProjectsTeam {
  id: string
  projectId: string
  teamId: string

  createdAt: Date
  updatedAt: Date

  project?: IProject | null
  team?: ITeam | null
}
