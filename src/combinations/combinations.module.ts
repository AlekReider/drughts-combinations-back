import { Module } from '@nestjs/common';
import { CombinationsService } from './combinations.service';
import { CombinationsController } from './combinations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Combination, CombinationSchema } from 'src/db/schemas/combination.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Combination.name, schema: CombinationSchema }])],
  controllers: [CombinationsController],
  providers: [CombinationsService]
})
export class CombinationsModule {}
