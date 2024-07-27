import { TaskStatus as State } from '../values/taskStatus';

export class Note {
  private idNote: string;
  constructor(
    public name: string,
    public content: string,
    public status: string | undefined = 'pending',
    id = 'null'
  ) {
    this.idNote = id;
  }

  //la absurda serializacion de los json
  public static fromJSON(data: Note): Note {
    return new Note(data.name, data.content, data.status, data.idNote);
  }

  asignStatusNote(current: string): string | undefined {
    if (current === 'completed') {
      return (this.status = State.COMPLETED);
    }
    if (current === 'incompleted') {
      return (this.status = State.INCOMPLETE);
    }
    if (current === 'pending') {
      return (this.status = State.PENDING);
    }
    return (this.status = State.PENDING);
  }

  getId(): string {
    return this.idNote;
  }

  setId(id: string): void {
    this.idNote = id;
  }
}
