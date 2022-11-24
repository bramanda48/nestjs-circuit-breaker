import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { CircuitBreakerMetadataAccessor } from './circuit-breaker.accessor';
import { CircuitBreakerOrchestrator } from './circuit-breaker.orchestrator';

@Injectable()
export class CircuitBreakerExplorer implements OnModuleInit {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataAccessor: CircuitBreakerMetadataAccessor,
        private readonly orchestrator: CircuitBreakerOrchestrator,
    ) {}

    onModuleInit() {
        this.explore();
    }

    explore() {
        const providers: InstanceWrapper[] = [
            ...this.discoveryService.getProviders(),
            ...this.discoveryService.getControllers(),
        ];
        providers.forEach((wrapper: InstanceWrapper) => {
            const { instance } = wrapper;
            if (!instance || typeof instance === 'string') {
                return;
            }
            this.lookupCircuitBreaker(instance);
        });
    }

    lookupCircuitBreaker(instance) {
        const cbMetadata = this.metadataAccessor.getCircuitBreakerProtected(instance);
        if (cbMetadata) {
            this.orchestrator.addCircuitBreaker(
                instance,
                cbMetadata
            );
        }
        const cbEvent = this.metadataAccessor.getCircuitBreakerEvent(instance);
        if (cbEvent) {
            this.orchestrator.addCircuitBreakerEvent(
                instance,
                cbEvent
            );
        }
    }
}
