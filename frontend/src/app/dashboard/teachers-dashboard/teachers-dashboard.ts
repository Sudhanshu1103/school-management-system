import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teachers-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers-dashboard.html',
  styleUrl: './teachers-dashboard.scss'
})
export class TeachersDashboard {
  teachers: Teacher[] = [];
  editingId: string | null = null;
  form: Teacher = { name: '', subject: '', designation: '', bio: '', image: '' };
  constructor(private service: TeacherService) { this.load(); }
  load(): void { this.service.getTeachers().subscribe(res => this.teachers = res.data || []); }
  edit(item: Teacher): void { this.editingId = item._id || null; this.form = { ...item }; }
  save(): void { const request = this.editingId ? this.service.updateTeacher(this.editingId, this.form) : this.service.createTeacher(this.form); request.subscribe(() => { this.form = { name: '', subject: '', designation: '', bio: '', image: '' }; this.editingId = null; this.load(); }); }
  remove(id?: string): void { if (id && confirm('Delete this teacher?')) this.service.deleteTeacher(id).subscribe(() => this.load()); }

}
