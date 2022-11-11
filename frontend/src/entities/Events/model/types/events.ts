export interface EventItem {
  id: string;
  appointmentId: string;
  name: Names;
  resource: string;
  date: string;
  details?: string;
  values?: ResourceValue[] | string[];
  code?: string;
}

export interface EventsSchema {
  events?: EventItem[] | undefined;
  groupedEvents?: GroupedEvents[] | undefined;
  renderEvents?: GroupedEvents[] | undefined;
  resources?: Resource[];
  isLoading: boolean;
  error?: string;
}

export interface EventsResponse {
  items: EventItem[];
}

export enum Names {
  OBSERVATION = 'Observation',
  CARE_PLAN = 'CarePlan',
  DIAGNOSIS = 'Diagnosis',
  ALLERGY_INTOLERANCE = 'AllergyIntolerance',
  CONDITION = 'Condition',
  APPOINTMENT = 'Appointment',
  IMMUNIZATION = 'Immunization',
  MEDICATION_STATEMENT = 'MedicationStatement',
  PROCEDURE = 'Procedure'
}

export interface GroupedEvents {
  name: Names;
  items: EventItem[];
}

export const EVENT_NAMES_WEIGHT = {
  [Names.ALLERGY_INTOLERANCE]: 1,
  [Names.CARE_PLAN]: 1,
  [Names.CONDITION]: 1,
  [Names.DIAGNOSIS]: 1,
  [Names.IMMUNIZATION]: 1,
  [Names.MEDICATION_STATEMENT]: 1,
  [Names.OBSERVATION]: 1,
  [Names.PROCEDURE]: 1,
  [Names.APPOINTMENT]: 2
};

export interface ResourceValue {
  value: number;
  unit: string;
}

export interface Resource {
  id: string;
  details: string;
  values: ResourceValue[];
  code: string;
}

export interface ResourceResponse {
  items: Resource[];
}
