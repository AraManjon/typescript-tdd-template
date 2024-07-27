import { Note } from "../../../../src/task/domain/entities/note";
import { Task } from "../../../../src/task/domain/entities/task";
import { ManageTask } from "../../../../src/task/infrastructure/adapters/manageTask";


export const taskNotes = [
	{
		idNote: "1",
		name : "comprar",
		content: "ir al super",
		status : "pending"
	},
	{
		idNote: "2",
		name : "acabar sprint",
		content: "terminar sprint 4",
		status : "completed"
	},
	{
		idNote: "3",
		name : "reunion",
		content: "meeting zoom",
		status : "pending"
	}
];

export const emptyTask = {
    status: 'pending'
}
export const updateTask = {
    status: 'completed'
}

export const saveTask =  async() =>{
	let manage : ManageTask =  new ManageTask();
	for (const note of taskNotes) {
		const task : Task = new Task(note.name, note.content)
		await manage.save(task.getNote());	
	} 
}
