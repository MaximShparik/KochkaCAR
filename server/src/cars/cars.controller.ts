import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class CarsController {
  constructor(private readonly cars: CarsService) {}

  // Public endpoint
  @Get('public/car')
  findPublic(@Query('vin') vin: string): Promise<any> {
    return this.cars.findByVin(vin);
  }

  // Admin endpoints
  @UseGuards(AuthGuard('jwt'))
  @Get('cars')
  list(): Promise<any>  {
    return this.cars.list();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('cars')
  create(@Body() dto: CreateCarDto) {
    return this.cars.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('cars/:id')
  update(@Param('id') id: string, @Body() dto: UpdateCarDto) {
    return this.cars.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('cars/:id')
  remove(@Param('id') id: string) {
    return this.cars.remove(id);
  }
}
