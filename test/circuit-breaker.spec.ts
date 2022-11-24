import { Test, TestingModule } from '@nestjs/testing';
import { CircuitBreakerModule, CircuitBreakerService } from '../src';

describe('CircuitBreakerModule', () => {
    let provider: Test;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CircuitBreakerModule],
        }).compile();

        provider = module.get<CircuitBreakerService>(CircuitBreakerService);
    });

    it('Hello World', () => {
        expect('Hello World!').toEqual('Hello World!');
    });
});
