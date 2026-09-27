import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss',
})
export class Admission {
  @ViewChild('pdfContent') pdfContent!: ElementRef;

  admissionForm: FormGroup;
  studentPhotoUrl: string = 'assets/images/gallery/image.png';
  generatingPdf = false;
  pdfGenerated = false;

  constructor(private fb: FormBuilder) {
    this.admissionForm = this.fb.group({
      // Student Details
      studentName: ['Ashish Prashad', Validators.required],
      dob: ['2019-06-15', Validators.required],
      gender: ['Male', Validators.required],
      age: [6, [Validators.required, Validators.min(3), Validators.max(18)]],
      bloodGroup: ['A+'],
      religion: ['Hindu'],
      casteCategory: ['OBC'],
      nationality: ['Indian'],
      motherTongue: ['Hindi'],
      aadhaar: ['987654345678'],

      // Admission Details
      admissionClass: ['3', Validators.required],
      academicYear: ['2025-2026', Validators.required],
      previousSchool: ['NA'],
      reasonOfLeaving: ['Relocation'],

      // Father Details
      fatherName: ['Kundan Prashad', Validators.required],
      fatherQualification: ['12th'],
      fatherContact: ['9876789876', Validators.required],
      fatherAadhaar: ['897654567897'],
      fatherOccupation: ['Farmer'],
      fatherOffice: ['NA'],
      fatherEmail: ['kundan@example.com'],

      // Mother Details
      motherName: ['Shreya Prashad', Validators.required],
      motherQualification: ['12th'],
      motherContact: ['8976567897'],
      motherAadhaar: ['897654567897'],
      motherOccupation: ['House Wife'],
      motherOffice: ['NA'],
      motherEmail: ['NA'],

      // Address
      sameAsPresent: [false],
      presentLine1: ['Salempur Derva', Validators.required],
      presentLine2: ['Salempur'],
      presentCity: ['Gopalganj', Validators.required],
      presentState: ['Bihar', Validators.required],
      presentPin: ['841405', Validators.required],

      permanentLine1: ['Salempur Derva'],
      permanentLine2: ['Salempur'],
      permanentCity: ['Gopalganj'],
      permanentState: ['Bihar'],
      permanentPin: ['841405'],

      guardianName: [''],
      guardianRelation: [''],
      guardianContact: [''],
      guardianAddress: [''],
      presentAddress: [''],
      permanentAddress: [''],
      emergencyContact: [''],
      altContact: [''],
      studentPhoto: [''],

      declaration: [true, Validators.requiredTrue],
      declarationDate: [new Date().toISOString().substring(0, 10), Validators.required]
    });
  }

  onSameAsPresentChange(event: any) {
    if (event.target.checked) {
      this.admissionForm.patchValue({
        permanentLine1: this.admissionForm.get('presentLine1')?.value,
        permanentLine2: this.admissionForm.get('presentLine2')?.value,
        permanentCity: this.admissionForm.get('presentCity')?.value,
        permanentState: this.admissionForm.get('presentState')?.value,
        permanentPin: this.admissionForm.get('presentPin')?.value,
        permanentAddress: this.admissionForm.get('presentAddress')?.value
      });
    }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.studentPhotoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async generatePdf() {
    if (this.admissionForm.invalid) {
      this.admissionForm.markAllAsTouched();
      alert('Please fill all required fields before generating PDF.');
      return;
    }

    this.generatingPdf = true;

    try {
      const element = this.pdfContent.nativeElement;
      element.style.display = 'block';

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const studentName = this.admissionForm.get('studentName')?.value || 'Student';
      pdf.save(`Admission_Form_${studentName}.pdf`);
      this.pdfGenerated = true;
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      this.generatingPdf = false;
    }
  }
}
