const MedicalRecords = artifacts.require('MedicalRecords');
const chai = require('chai');
const { expect } = chai;

contract('MedicalRecords', async (accounts) => {
  let medicalRecords;

  before(async () => {
    medicalRecords = await MedicalRecords.deployed();
  });

  it('should add a patient', async () => {
    const initialPatientCount = await medicalRecords.patientCount();
    await medicalRecords.addPatient(123456789012, "John Doe", 35, "Male", "High blood pressure");
    const updatedPatientCount = await medicalRecords.patientCount();
    expect(updatedPatientCount.toNumber()).to.equal(initialPatientCount.toNumber() + 1);
  });

//   it('should delete a patient', async () => {
//     await medicalRecords.addPatient(123456789012, "John Doe", 35, "Male", "High blood pressure");
//     const patientId = await medicalRecords.getPatientIdByAadharID(123456789012);
//     const initialPatientCount = await medicalRecords.patientCount();
//     await medicalRecords.deletePatient(patientId);
//     const updatedPatientCount = await medicalRecords.patientCount();
//     expect(updatedPatientCount.toNumber()).to.equal(initialPatientCount.toNumber() - 1);
//   });

  it('should get the patient ID by Aadhar ID', async () => {
    await medicalRecords.addPatient(123456789012, "John Doe", 35, "Male", "High blood pressure");
    const patientId = await medicalRecords.getPatientIdByAadharID(123456789012);
    expect(patientId.toNumber()).to.be.a('number');
  });

  it('should get a patient by ID', async () => {
    await medicalRecords.addPatient(123456789012, "John Doe", 35, "Male", "High blood pressure");
    const patientId = await medicalRecords.getPatientIdByAadharID(123456789012);
    const patient = await medicalRecords.getPatient(patientId);
    expect(patient[0].toNumber()).to.equal(123456789012);
    expect(patient[1]).to.equal("John Doe");
    expect(patient[2].toNumber()).to.equal(35);
    expect(patient[3]).to.equal("Male");
    expect(patient[4]).to.equal("High blood pressure");
  });

//   it('should get all patients', async () => {
//     await medicalRecords.addPatient(123456789012, "John Doe", 35, "Male", "High blood pressure");
//     await medicalRecords.addPatient(123456789013, "Jane Doe", 28, "Female", "Asthma");
//     const patientIds = await medicalRecords.getAllPatients();
//     expect(patientIds).to.be.an('array').that.includes(1, 2);
//   });
});
