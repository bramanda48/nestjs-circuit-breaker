import { Injectable } from '@nestjs/common';
import { CircuitBreakerOrchestrator } from './circuit-breaker.orchestrator';
import { CircuitBreakerStats } from './interface/circuit-breaker-stats.interface';

@Injectable()
export class CircuitBreakerService {
    constructor(
        private readonly cb: CircuitBreakerOrchestrator
    ) {}

    /**
     * Execute the action for this circuit.
     * If the action fails or times out, the returned promise will be rejected.
     * If the action succeeds, the promise will resolve with the resolved value from action.
     * If a fallback function was provided, it will be invoked in the event of any failure or timeout.
     */
    async fire<TR = any>(name: string, ...args: any[]): Promise<TR> {
        let instance = this.cb.instanceOf<any, TR>(name);
        return await instance.fire(args);
    }

    /**
     * Clears the cache of this CircuitBreaker
     */
    clearCache(name: string): void {
        let instance = this.cb.instanceOf<any, any>(name);
        instance.clearCache();
    }

    /**
     * Closes the breaker, allowing the action to execute again
     */
    close(name: string): void {
        let instance = this.cb.instanceOf<any, any>(name);
        return instance.close();
    }

    /**
     * Shuts down this circuit breaker.
     * All subsequent calls to the circuit will fail, returning a rejected promise.
     */
    shutdown(name: string): void {
        let instance = this.cb.instanceOf<any, any>(name);
        return instance.shutdown();
    }

    /**
     * Disables this circuit, causing all calls to the circuit's function to be
     * executed without circuit or fallback protection.
     */
    disable(name: string): void {
        let instance = this.cb.instanceOf<any, any>(name);
        return instance.disable();
    }

    /**
     * Enables this circuit. If the circuit is the disabled state, it will be re-enabled.
     * If not, this is essentially a noop.
     */
    enable(name: string): void {
        let instance = this.cb.instanceOf<any, any>(name);
        return instance.enable();
    }

    /**
     * Get All CircuitBreaker statistic
     */
    stats(): CircuitBreakerStats[] {
        return this.cb.getStats();
    }

    /**
     * Provide a fallback function for this CircuitBreaker.
     * This function will be executed when the circuit is fired and fails.
     * It will always be preceded by a `failure` event, and `breaker.fire` returns a rejected Promise.
     */
    fallback(name: string): void {
        let instance = this.cb.instanceOf<any, any>(name);
        instance.fallback(instance);
    }
}
