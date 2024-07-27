import { Note } from '../../domain/entities/note';

export function isObject(obj: Note | undefined): obj is Note {
  if (obj !== undefined) {
    return obj instanceof Note;
  }
  return false;
}
