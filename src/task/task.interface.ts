// import * as mongoose from 'mongoose';

// export const TaskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   done: Boolean,
// });

// export interface Task extends mongoose.Document {
//   id: string;
//   title: string;
//   description: string;
//   done: boolean;
// }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  done: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
