import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CombinationDocument = HydratedDocument<Combination>;

@Schema()
export class Combination {
  @Prop()
  position: ECell[][];

  @Prop()
  hitFrom: string;

  @Prop()
  starsCount: number;

  @Prop()
  silentMove: boolean;

  @Prop()
  draw: boolean;  
}

export const CombinationSchema = SchemaFactory.createForClass(Combination);