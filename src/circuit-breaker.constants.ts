export const CIRCUIT_BREAKER_PROTECTED = 'CIRCUIT_BREAKER_PROTECTED';
export const CIRCUIT_BREAKER_EVENT = 'CIRCUIT_BREAKER_TRIGGERS';

export enum CBEvent {
    halfOpen = 'halfOpen',
    close = 'close',
    open = 'open',
    shutdown = 'shutdown',
    fire = 'fire',
    cacheHit = 'cacheHit',
    cacheMiss = 'cacheMiss',
    reject = 'reject',
    timeout = 'timeout',
    success = 'success',
    semaphoreLocked = 'semaphoreLocked',
    healthCheckFailed = 'healthCheckFailed',
    fallback = 'fallback',
    failure = 'failure'
}