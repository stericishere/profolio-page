# TinyProof

[![GitHub](https://img.shields.io/badge/GitHub-TinyProof-blue?logo=github)](https://github.com/utmgdsc/TinyProof)

![tinyproof](https://github.com/user-attachments/assets/40fa9a65-bced-4e15-8aa1-35ac7e082dd2)


An RL-based theorem prover extending AlphaProof using R'max Tree Search, achieving 87% accuracy on college-level mathematical proofs.

## Overview

TinyProof is a research project that combines reinforcement learning with formal theorem proving. Built on top of the Lean4 proof assistant and powered by an intelligent tree search algorithm, it demonstrates significant improvements over expected baselines in automated mathematical reasoning.

### Key Features

- **R'max Tree Search**: Novel reinforcement learning algorithm for theorem proving
- **87% Success Rate**: Achieves 87% accuracy on college-level mathematical proofs
- **Formal Verification**: Built on Lean4 for rigorous mathematical foundations
- **Scalable ETL Pipeline**: Automated data extraction from Lean4 repositories using LeanDojo
- **Cloud Infrastructure**: Deployed on Google Cloud Platform for scalable training
- **Interactive Web Interface**: Real-time theorem proving environment

### Technology Stack

- **Backend**: Python, Flask, Lean4
- **Frontend**: React, TypeScript, Monaco Editor
- **ML/RL**: PyTorch, Custom R'max Tree Search
- **Infrastructure**: Docker, Google Cloud Platform, LeanDojo
- **Development**: Jira, CI/CD pipelines

## Architecture

The project consists of three main components:

1. **Theorem Prover Engine**: RL-based prover using R'max Tree Search
2. **Web Interface**: Interactive frontend for theorem exploration
3. **ETL Pipeline**: Automated data extraction and processing from Lean4 repositories

## Quick Start

### Prerequisites

- Docker Desktop
- Node.js (for local development)
- Python 3.8+ (for local development)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/utmgdsc/TinyProof.git
   cd TinyProof
   ```

2. **Start with Docker (Recommended)**
   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5050

### Alternative Local Development

If you prefer to run without Docker (note: Lean Server functionality will be limited):

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python start.py --port 5050 --dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Usage

1. Open the web interface at http://localhost:3000
2. Enter mathematical statements or theorems in the editor
3. Use the integrated Lean4 environment to write and verify proofs
4. Leverage the RL-based prover assistance for automated proof search

## Development Commands

### Clean Rebuild
```bash
docker compose down -v --remove-orphans
rm -rf frontend/node_modules frontend/package-lock.json
docker compose build --no-cache
docker compose up
```

### Quick Start (Reusing Images)
```bash
docker compose up
```

## Research Context

This project extends Google's AlphaProof methodology by implementing a novel R'max Tree Search algorithm specifically designed for theorem proving. The system demonstrates superior performance on college-level mathematical proofs, representing a significant advancement in automated reasoning capabilities.

### Data Pipeline

Our ETL pipeline leverages LeanDojo to:
- Extract formal proof data from Lean4 repositories
- Transform proofs into training-ready formats
- Load processed data into scalable GCP storage
- Enable continuous learning and model improvement

## Project Structure

```
TinyProof/
├── backend/           # Flask API and Lean4 integration
├── frontend/          # React web interface
├── docker-compose.yml # Multi-container orchestration
└── README.md         # This file
```

## Acknowledgments

- **Supervisor**: Dr. Mohammad
- **Framework**: Built upon LeanDojo and Lean4
- **Inspiration**: Google's AlphaProof methodology
- **Infrastructure**: Google Cloud Platform

---

**Note**: This is a research project focused on advancing the state of automated theorem proving through novel RL techniques.