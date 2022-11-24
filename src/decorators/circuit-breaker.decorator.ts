import { applyDecorators } from '@nestjs/common';
import { CBEvent, CIRCUIT_BREAKER_EVENT, CIRCUIT_BREAKER_PROTECTED } from '../circuit-breaker.constants';
import { CircuitBreakerOptions } from '../interface/circuit-breaker-options.interface';
import { ExtendMetadata } from './extend-metadata.decorator';

const circuitBreakerConfigDefaults: CircuitBreakerOptions = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000,
};

export function CircuitBreakerProtected(
    name: string,
    options?: CircuitBreakerOptions,
): MethodDecorator {
    options = Object.assign({}, circuitBreakerConfigDefaults, options);
    return applyDecorators((target, property) => {
        return ExtendMetadata(CIRCUIT_BREAKER_PROTECTED, {
            name,
            property,
            options,
        })(target, property);
    });
}

export function CircuitBreakerEvent(name: string, ...events: CBEvent[]): MethodDecorator {
    return applyDecorators((target, property) => {
        events.forEach(event => {
            return ExtendMetadata(CIRCUIT_BREAKER_EVENT, {
                name,
                property,
                event
            })(target, property);
        });
    });
} 
