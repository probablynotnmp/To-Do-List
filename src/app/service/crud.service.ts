import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudService } from './crud.service';
import { Task } from '../model/task';

describe('CrudService', () => {
  let service: CrudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService]
    });
    service = TestBed.inject(CrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task via POST', () => {
    const dummyTask: Task = { id: 1, description: 'Test Task', completed: false };

    service.addTask(dummyTask).subscribe(task => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(dummyTask);
  });

  it('should retrieve all tasks via GET', () => {
    const dummyTasks: Task[] = [
      { id: 1, description: 'Task 1', completed: false },
      { id: 2, description: 'Task 2', completed: true }
    ];

    service.getAllTask().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should delete a task via DELETE', () => {
    const dummyTask: Task = { id: 1, description: 'Test Task', completed: false };

    service.deleteTask(dummyTask).subscribe(task => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyTask);
  });

  it('should edit a task via PUT', () => {
    const updatedTask: Task = { id: 1, description: 'Updated Task', completed: true };

    service.editTask(updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTask);
  });
});
