import React, { createContext, ReactNode, useContext, useState } from 'react';

// The shape of attendance data per subject
interface AttendanceRecord {
  date: Date;
  selectedSubject: string;
  attendance: Array<{
    roll: number;
    name: string;
    status: 'present' | 'absent' | null;
  }>;
}

interface AttendanceContextType {
  savedAttendanceBySubject: Record<string, AttendanceRecord>;
  setSavedAttendanceBySubject: React.Dispatch<React.SetStateAction<Record<string, AttendanceRecord>>>;
}

const AttendanceContext = createContext<AttendanceContextType>({
  savedAttendanceBySubject: {},
  setSavedAttendanceBySubject: () => {},
});

export const useAttendance = () => useContext(AttendanceContext);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [savedAttendanceBySubject, setSavedAttendanceBySubject] = useState<Record<string, AttendanceRecord>>({});
  // TODO: Add persistent storage (AsyncStorage, etc.) if needed
  return (
    <AttendanceContext.Provider value={{ savedAttendanceBySubject, setSavedAttendanceBySubject }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export { AttendanceContext };

