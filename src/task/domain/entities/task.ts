import { Note } from './note';

export class Task {
  private readonly note: Note;

  constructor(name: string, description: string) {
    this.note = new Note(name, description);
  }

  getNote(): Note {
    return this.note;
  }
}
