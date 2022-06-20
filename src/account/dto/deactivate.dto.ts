import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/database';

export class AccountDeactivateDTO extends PartialType(User) {}
