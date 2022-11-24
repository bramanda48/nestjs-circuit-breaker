import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CIRCUIT_BREAKER_EVENT, CIRCUIT_BREAKER_PROTECTED } from './circuit-breaker.constants';
import { CircuitBreakerEventMetadata, CircuitBreakerMetadata } from './interface/circuit-breaker-metadata.interface';

@Injectable()
export class CircuitBreakerMetadataAccessor {
    constructor(private readonly reflector: Reflector) {}

    getCircuitBreakerProtected(
        target: Function,
    ): CircuitBreakerMetadata[] | undefined {
        return this.reflector.get(CIRCUIT_BREAKER_PROTECTED, target);
    }

    getCircuitBreakerEvent(
        target: Function
    ): CircuitBreakerEventMetadata[] | undefined {
        return this.reflector.get(CIRCUIT_BREAKER_EVENT, target);
    }
}
