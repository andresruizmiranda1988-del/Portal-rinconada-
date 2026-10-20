# Architecture Overview

This application is a React + TypeScript clinical workflow dashboard for COSAM Rinconada, organized as a modular single-page application with a central orchestrator and feature-specific modules.

```mermaid
flowchart TB
    U[Clinician / User]

    subgraph Client[Frontend Client]
        A[App.tsx\nMain orchestrator and app state]
        N[Navbar]
        S[Sidebar]
        D[Dashboard]
        M[Clinical Modules\nProtocolosIngreso, IngresoPAI,\nEvolucionesSOAP, VademecumClinico,\nLaboratorioIA, TriajeSIC,\nDerivacionesAltas,\nEgresosAdministrativos,\nReunionesClinicas]
        T[AudioTranscribeModal\nLiveVoiceModal]
    end

    subgraph Services[Application Services]
        G[GoogleDriveService]
        AI[Gemini / AI Studio APIs]
    end

    subgraph External[External Platforms]
        GD[Google Drive]
        GAI[Google AI Studio / LLM Services]
    end

    U --> A
    A --> N
    A --> S
    A --> D
    A --> M
    A --> T

    M --> G
    M --> AI
    T --> AI
    G --> GD
    AI --> GAI

    A -->|Network / offline status| U
    A -->|Toast notifications| U
    A -->|Billing alerts| U
```

## Layering summary

- Presentation layer: React components such as `Navbar`, `Sidebar`, `Dashboard`, and individual clinical modules.
- App orchestration layer: `App.tsx` manages navigation, modal state, alerts, toasts, and drive/voice integrations.
- Service layer: `GoogleDriveService` handles drive connectivity; AI-powered features call Gemini/AI Studio APIs.
- External systems: Google Drive and AI Studio provide persistence and intelligence features.

## Core responsibilities

- Route between modules and render the active clinical workflow.
- Maintain global UI state for connection, toasts, billing warnings, and modals.
- Provide access to backup, transcription, and real-time voice features.
- Surface availability based on internet connectivity and prepayment credit status.
