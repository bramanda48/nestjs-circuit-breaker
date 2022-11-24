import { CBEvent } from '../circuit-breaker.constants';
import { CircuitBreakerOptions } from './circuit-breaker-options.interface';

export interface CircuitBreakerMetadata {
    name: string;
    property: string;
    options: CircuitBreakerOptions;
}

export interface CircuitBreakerEventMetadata {
    name: string;
    property: string;
    event: CBEvent;
}
