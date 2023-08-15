import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CombinationsModule } from './combinations/combinations.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://olehkosenko82:Mongodb11071602@cluster0.esghkul.mongodb.net', { dbName: 'draughts-combinations' }),
    CombinationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
