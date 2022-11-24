import * as CircuitBreaker from 'opossum';

export interface CircuitBreakerStats {
    name: string;
    stats: CircuitBreaker.Stats;
}
