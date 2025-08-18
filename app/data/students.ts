export interface Student {
  // Personal Details
  id: string;
  studentId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'Male' | 'Female';
  nationality: string;
  religion: string;
  bloodGroup?: string;
  photoUrl?: string;
  aadharNumber?: string;

  // Contact Details
  currentAddress: string;
  permanentAddress: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  studentPhoneNumber?: string;
  studentEmail?: string;

  // Parent/Guardian Details
  fatherName: string;
  fatherOccupation?: string;
  fatherPhoneNumber: string;
  fatherEmail?: string;
  motherName: string;
  motherOccupation?: string;
  motherPhoneNumber: string;
  motherEmail?: string;
  guardianName?: string;
  guardianRelationship?: string;
  guardianPhoneNumber?: string;
  guardianEmail?: string;

  // Academic Details
  educationalLevel: 'Play Group' | 'Pre KG' | 'Junior KG' | 'Senior KG';
  section: string;
  rollNumber: string;
  admissionDate: string;
  previousSchool?: string;
  subjects: string[];
  academicYear: string;
  status: 'Active' | 'Left' | 'Graduated';

  // Administrative Details
  feeStatus: 'Pending' | 'Completed';
  scholarshipDetails?: string;
  transportRoute?: string;
  hostelRoomNumber?: string;
  libraryBooksIssued?: number;
  extracurricularActivities?: string[];

  // Health & Emergency Details
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelationship: string;
}

export const students: Student[] = [
  {
    id: '1',
    studentId: 'DM-2024-001',
    firstName: 'Aarav',
    lastName: 'Sharma',
    dateOfBirth: '2021-05-10',
    age: 3,
    gender: 'Male',
    nationality: 'Indian',
    religion: 'Hindu',
    photoUrl: 'https://i.pravatar.cc/150?u=aarav',
    currentAddress: '123 Sunshine Apartments, Mumbai',
    permanentAddress: '123 Sunshine Apartments, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    pinCode: '400001',
    fatherName: 'Rohan Sharma',
    fatherPhoneNumber: '9876543210',
    motherName: 'Priya Sharma',
    motherPhoneNumber: '9876543211',
    educationalLevel: 'Play Group',
    section: 'A',
    rollNumber: '01',
    admissionDate: '2024-06-01',
    subjects: ['Story Time', 'Art & Craft'],
    academicYear: '2024-2025',
    status: 'Active',
    feeStatus: 'Completed',
    emergencyContactName: 'Rohan Sharma',
    emergencyContactNumber: '9876543210',
    emergencyContactRelationship: 'Father',
  },
  {
    id: '2',
    studentId: 'DM-2024-002',
    firstName: 'Vivaan',
    lastName: 'Gupta',
    dateOfBirth: '2021-03-15',
    age: 3,
    gender: 'Male',
    nationality: 'Indian',
    religion: 'Hindu',
    photoUrl: 'https://i.pravatar.cc/150?u=vivaan',
    currentAddress: '456 Rainbow Heights, Delhi',
    permanentAddress: '456 Rainbow Heights, Delhi',
    city: 'Delhi',
    state: 'Delhi',
    country: 'India',
    pinCode: '110001',
    fatherName: 'Ankit Gupta',
    fatherPhoneNumber: '9123456780',
    motherName: 'Neha Gupta',
    motherPhoneNumber: '9123456781',
    educationalLevel: 'Play Group',
    section: 'A',
    rollNumber: '02',
    admissionDate: '2024-06-01',
    subjects: ['Story Time', 'Art & Craft'],
    academicYear: '2024-2025',
    status: 'Active',
    feeStatus: 'Completed',
    emergencyContactName: 'Ankit Gupta',
    emergencyContactNumber: '9123456780',
    emergencyContactRelationship: 'Father',
  },
  {
    id: '3',
    studentId: 'DM-2024-003',
    firstName: 'Ananya',
    lastName: 'Patel',
    dateOfBirth: '2020-09-20',
    age: 4,
    gender: 'Female',
    nationality: 'Indian',
    religion: 'Hindu',
    photoUrl: 'https://i.pravatar.cc/150?u=ananya',
    currentAddress: '789 Moonlight Towers, Bangalore',
    permanentAddress: '789 Moonlight Towers, Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    pinCode: '560001',
    fatherName: 'Suresh Patel',
    fatherPhoneNumber: '9988776655',
    motherName: 'Deepa Patel',
    motherPhoneNumber: '9988776656',
    educationalLevel: 'Pre KG',
    section: 'B',
    rollNumber: '01',
    admissionDate: '2024-06-01',
    subjects: ['Phonics', 'Counting'],
    academicYear: '2024-2025',
    status: 'Active',
    feeStatus: 'Completed',
    emergencyContactName: 'Suresh Patel',
    emergencyContactNumber: '9988776655',
    emergencyContactRelationship: 'Father',
  },
];
