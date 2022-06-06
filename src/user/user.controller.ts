import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
