import firebase from 'react-native-firebase';

export const FIRESTORE = firebase.firestore();
export const FIREBASE_AUTH = firebase.auth();
export const FIREBASE_STORAGE = firebase.storage();

export const INSPECTION_TYPES = [
  "Routine",
  "PMR Follow-up",
  "Asset Survey",
  "Other",
];

export const CLEANING_TYPES = [
  "Clean ?",
  "Not Clean ?",
];

export const DEFECT_FOUND_DURING_INSPECTIONS = [
  "Yes",
  "No",
];

export const OPERATIONS_AFFECTED = [
  "Yes",
  "No",
];

export const CATEGORIES = [
  "Electrical",
  "Mechanical",
  "Civil",
  "Instruments",
  "Other",
];

