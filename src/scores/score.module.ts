/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreService } from './score.service';
import { ScoreResolver } from './score.resolver';
import { ScoreSchema } from 'src/models/schemas/score.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Score', schema: ScoreSchema }])],
  providers: [ScoreService, ScoreResolver],
})
export class ScoreModule {}
