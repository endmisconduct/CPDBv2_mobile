import { visualTokenBackground } from './percentile';

export const officersTransform = officer => ({
  id: officer['id'],
  fullName: officer['full_name'],
  visualTokenBackground: visualTokenBackground(officer['percentile_allegation']),
});

export const coaccusedDataTransform = coaccusedDatum => ({
  officerId1: coaccusedDatum['officer_id_1'],
  officerId2: coaccusedDatum['officer_id_2'],
  incidentDate: coaccusedDatum['incident_date'],
  accussedCount: coaccusedDatum['accussed_count'],
});
