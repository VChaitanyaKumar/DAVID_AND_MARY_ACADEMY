import React, { createContext, useState } from 'react';

export interface AttendanceRecord {
  date: Date;
  selectedSubject: string;
  attendance: Array<{ roll: number; name: string; status: 'present' | 'absent' | null }>;
}

interface AttendanceContextType {
  savedAttendanceBySubject: { [subject: string]: AttendanceRecord };
  setSavedAttendanceBySubject: React.Dispatch<React.SetStateAction<{ [subject: string]: AttendanceRecord }>>;
}

const defaultRecords: { [subject: string]: AttendanceRecord } = {
  'Basic of Geometry Class': {
    date: new Date('2025-07-22'),
    selectedSubject: 'Basic of Geometry Class',
    attendance: [
      { roll: 1, name: 'Emma Johnson', status: 'present' },
      { roll: 2, name: 'Liam Smith', status: 'absent' },
      { roll: 3, name: 'Sophia Davis', status: 'present' },
    ],
  },
  'English Language': {
    date: new Date('2025-07-22'),
    selectedSubject: 'English Language',
    attendance: [
      { roll: 1, name: 'Emma Johnson', status: 'absent' },
      { roll: 2, name: 'Liam Smith', status: 'present' },
      { roll: 3, name: 'Sophia Davis', status: 'present' },
    ],
  },
  'Science': {
    date: new Date('2025-07-22'),
    selectedSubject: 'Science',
    attendance: [
      { roll: 1, name: 'Emma Johnson', status: 'present' },
      { roll: 2, name: 'Liam Smith', status: 'present' },
      { roll: 3, name: 'Sophia Davis', status: 'absent' },
    ],
  },
  'Mathematics': {
    date: new Date('2025-07-22'),
    selectedSubject: 'Mathematics',
    attendance: [
      { roll: 1, name: 'Emma Johnson', status: 'absent' },
      { roll: 2, name: 'Liam Smith', status: 'absent' },
      { roll: 3, name: 'Sophia Davis', status: 'present' },
    ],
  },
};

export const AttendanceContext = createContext<AttendanceContextType>({
  savedAttendanceBySubject: defaultRecords,
  setSavedAttendanceBySubject: () => {},
});

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedAttendanceBySubject, setSavedAttendanceBySubject] = useState<{ [subject: string]: AttendanceRecord }>(defaultRecords);
  return (
    <AttendanceContext.Provider value={{ savedAttendanceBySubject, setSavedAttendanceBySubject }}>
      {children}
    </AttendanceContext.Provider>
  );
}; 