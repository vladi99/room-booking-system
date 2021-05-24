import { roles } from './roles'
import { CompanyList, CreateCompany, UpdateCompany } from '../features/company';
import { RoomList, CreateRoom, UpdateRoom } from '../features/room';
import { CreateMeeting, MeetingList, UpdateMeeting } from '../features/meeting';
import { CreateUser, UpdateUser, UserList } from '../features/user';

export const privateRouteConfig = [
  {
    component: CompanyList,
    path: '/companies',
    title: 'Companies',
    permission: [
      roles.ADMIN
    ],
  },

  {
    component: CreateCompany,
    path: '/companies/create',
    permission: [
      roles.ADMIN
    ],
  },
  {
    component: UpdateCompany,
    path: '/companies/:id',
    permission: [
      roles.ADMIN
    ],
  },

  {
    component: RoomList,
    path: '/rooms',
    title: 'Rooms',
    permission: [
      roles.COMPANY_ADMIN
    ],
  },
  {
    component: CreateRoom,
    path: '/rooms/create',
    permission: [
      roles.COMPANY_ADMIN
    ],
  },
  {
    component: UpdateRoom,
    path: '/rooms/:id',
    permission: [
      roles.COMPANY_ADMIN
    ],
  },
  {
    component: MeetingList,
    path: '/meetings',
    title: 'Meetings',
    permission: [
      roles.COMPANY_ADMIN,
      roles.MEMBER
    ],
  },
  {
    component: CreateMeeting,
    path: '/meetings/create',
    permission: [
      roles.COMPANY_ADMIN,
      roles.MEMBER
    ],
  },
  {
    component: UpdateMeeting,
    path: '/meetings/:id',
    permission: [
      roles.COMPANY_ADMIN,
      roles.MEMBER
    ],
  },
  {
    component: UserList,
    path: '/users',
    title: 'Users',
    permission: [
      roles.ADMIN,
      roles.COMPANY_ADMIN,
    ],
  },
  {
    component: CreateUser,
    path: '/users/create',
    permission: [
      roles.ADMIN,
      roles.COMPANY_ADMIN,
    ],
  },
  {
    component: UpdateUser,
    path: '/users/:id',
    permission: [
      roles.ADMIN,
      roles.COMPANY_ADMIN,
      roles.MEMBER
    ],
  },
]
