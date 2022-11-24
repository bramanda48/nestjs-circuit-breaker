import { Injectable, Logger } from '@nestjs/common';
import * as CircuitBreaker from 'opossum';
import { CBEvent } from './circuit-breaker.constants';
import { CircuitBreakerEventMetadata, CircuitBreakerMetadata } from './interface/circuit-breaker-metadata.interface';
import { CircuitBreakerStats } from './interface/circuit-breaker-stats.interface';

@Injectable()
export class CircuitBreakerOrchestrator {
    private readonly cb = new Map<string, CircuitBreaker>();
    private readonly logger = new Logger(CircuitBreakerOrchestrator.name);

    instanceOf<TI, TR>(name: string) {
        return this.cb.get(name) as CircuitBreaker<TI[], TR>;
    }

    addCircuitBreaker(instance, metadata: CircuitBreakerMetadata[]) {
        metadata.forEach(({ name, property, options }) => {
            let key = name;
            let methodRef = instance[property].bind(instance);
            let cb = new CircuitBreaker(methodRef, options);
            this.logger.log(`CircuitBreaker {${instance.constructor.name}->${property}}`, `Initialized`);
            this.cb.set(key, cb);
        });
    }

    addCircuitBreakerEvent(instance, events: CircuitBreakerEventMetadata[]) {
        events.forEach(({ name, property, event }) => {
            let key = name;
            let methodRef = instance[property].bind(instance);
            let cbInstance = this.instanceOf(key);

            if (event == CBEvent.halfOpen) cbInstance.on('halfOpen', methodRef);
            if (event == CBEvent.close) cbInstance.on('close', methodRef);
            if (event == CBEvent.open) cbInstance.on('open', methodRef);
            if (event == CBEvent.shutdown) cbInstance.on('shutdown', methodRef);
            if (event == CBEvent.fire) cbInstance.on('fire', methodRef);
            if (event == CBEvent.cacheHit) cbInstance.on('cacheHit', methodRef);
            if (event == CBEvent.cacheMiss) cbInstance.on('cacheMiss', methodRef);
            if (event == CBEvent.reject) cbInstance.on('reject', methodRef);
            if (event == CBEvent.timeout) cbInstance.on('timeout', methodRef);
            if (event == CBEvent.success) cbInstance.on('success', methodRef);
            if (event == CBEvent.halfOpen) cbInstance.on('halfOpen', methodRef);
            if (event == CBEvent.semaphoreLocked) cbInstance.on('semaphoreLocked', methodRef);
            if (event == CBEvent.healthCheckFailed) cbInstance.on('healthCheckFailed', methodRef);
            if (event == CBEvent.fallback) cbInstance.on('fallback', methodRef);
            if (event == CBEvent.failure) cbInstance.on('failure', methodRef);
        });
    }

    getStats(): CircuitBreakerStats[] {
        return Array.from(this.cb.keys()).map(key => ({ name: key, stats: this.cb.get(key).stats }));
    }
}