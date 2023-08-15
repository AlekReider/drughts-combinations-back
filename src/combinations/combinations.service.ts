import { Injectable, Logger } from '@nestjs/common';
import { CreateCombinationDto } from './dto/create-combination.dto';
import { UpdateCombinationDto } from './dto/update-combination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Combination } from 'src/db/schemas/combination.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class CombinationsService {
  constructor(@InjectModel(Combination.name) private combinationModel: Model<Combination>) {}

  async create(createCombinationDto: CreateCombinationDto): Promise<Combination | string> {
    const allPositions = (await this.combinationModel.find().exec())?.map(combination => JSON.stringify(combination.position));

    if (allPositions.includes(JSON.stringify(createCombinationDto.position))) {
      return 'Position already exists';
    }

    const createdCombination = new this.combinationModel(createCombinationDto);
    
    return createdCombination.save();
  }

  findAll(): Promise<Combination[]> {
    return this.combinationModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} combination`;
  }

  async findCurrent(row: number | null) {
    const lastRow = await this.combinationModel.count().exec();
    let combination = null;
    let id = null,
      position = null,
      hitFrom = null,
      starsCount = null,
      silentMove = null,
      draw = null;
    if (lastRow > 0) {
      if (!row) {
        row = lastRow;
      }
      combination = (await this.combinationModel.find().skip(row - 1).limit(1))[0];
      position = combination.position;
      hitFrom = combination.hitFrom;
      starsCount = combination.starsCount;
      silentMove = combination.silentMove;
      draw = combination.draw;
      id = combination._id;
    }

    return {
      id,
      position,
      hitFrom,
      starsCount,
      silentMove,
      draw,
      lastRow,
    };
  }

  update(id: string, updateCombinationDto: UpdateCombinationDto) {
    return `This action updates a #${id} combination`;
  }

  remove(id: string) {
    Logger.log(id);
    Logger.log(new Types.ObjectId(id));
    return this.combinationModel.deleteOne(new Types.ObjectId(id)).exec();
  }
}
