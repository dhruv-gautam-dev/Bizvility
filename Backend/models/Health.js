// models/HealthMedical.js

import mongoose from 'mongoose';

const healthMedicalSchema = new mongoose.Schema({
  speciality: {
    type: String,
    required: true,
  },
  registerNumber: {
    type: String,
    required: true,
    unique: true
  },
  YearOfEstablishment: {
    type: Date,
    required: true
  },
  AC: Boolean,
  Ambulance: Boolean,
  PetAllowed: Boolean,
  Parking: Boolean,
  LabAvailable: Boolean,
  Pharmacy: Boolean,
  extraFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  }
});


const Health = mongoose.model('Health', healthMedicalSchema);
export default Health;