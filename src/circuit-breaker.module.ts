import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { CircuitBreakerMetadataAccessor } from './circuit-breaker.accessor';
import { CircuitBreakerExplorer } from './circuit-breaker.explorer';
import { CircuitBreakerOrchestrator } from './circuit-breaker.orchestrator';
import { CircuitBreakerService } from './circuit-breaker.service';

@Module({
    imports: [DiscoveryModule],
    providers: [
        CircuitBreakerOrchestrator,
        CircuitBreakerMetadataAccessor,
        CircuitBreakerExplorer,
        CircuitBreakerService,
    ],
    exports: [
        CircuitBreakerService
    ]
})
export class CircuitBreakerModule { }
