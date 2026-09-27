import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss',
})
export class Teachers implements OnInit {
  teachers: Teacher[] = [];
  loading = true;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.fetchTeachers();
  }

  fetchTeachers() {
    this.loading = true;
    this.teacherService.getTeachers().subscribe({
      next: (res) => {
        this.teachers = res.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching teachers:', err);
        this.loading = false;
      }
    });
  }
}
