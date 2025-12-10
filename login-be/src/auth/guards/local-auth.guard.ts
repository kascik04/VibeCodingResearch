import {
	BadRequestException,
	ExecutionContext,
	Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const dto = plainToInstance(LoginDto, request.body);
		const errors = validateSync(dto);
		if (errors.length) {
			throw new BadRequestException(errors);
		}
		return super.canActivate(context);
	}
}