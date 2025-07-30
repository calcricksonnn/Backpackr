export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  destination?: string;
  isPrivate: boolean;
  maxMembers?: number;
  members: GroupMember[];
  createdBy: string;
  createdAt: Date;
  interests?: string[];
}

export interface GroupMember {
  id: string;
  name: string;
  role: 'admin' | 'member';
  avatar: string;
  joinedAt: Date;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userAvatar: string;
  groupId: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration?: string;
  location: string;
  groupId: string;
  groupName: string;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  attendees: EventAttendee[];
  maxAttendees?: number;
  cost?: string;
  notes?: string;
  isPublic: boolean;
  createdAt: Date;
}

export interface EventAttendee {
  id: string;
  name: string;
  status: 'going' | 'maybe' | 'not-going';
  avatar: string;
  responseAt: Date;
}

export type AttendanceStatus = 'going' | 'maybe' | 'not-going';