# An RL Agent that play Mini Motorways

[![Mini Motorway Cover](/assets/projects/mini-motorway.png)](https://github.com/stericishere/RL-agent-play-Mini-Motorway)

**Motorways** is a complete framework for developing and running reinforcement learning agents that play Mini Motorways on macOS. It bridges the gap between simulation and real-world application by enabling agents to perceive the game through screen capture and act using native mouse inputs.

## Introduction

This project provides a robust platform for applying reinforcement learning to a real-time strategy game. By capturing the screen and controlling the mouse, it allows trained agents to play Mini Motorways without any modifications to the game itself.

### Key Features

- **Pixel-Perfect Perception**: Captures the game window in real-time using macOS Quartz for high-performance, low-latency observations.
- **Adaptive Calibration**: A two-point calibration system ensures that the agent's actions are accurately mapped to the game grid, even if the window is moved or resized.
- **Reliable Control**: Uses PyAutoGUI for precise and reliable mouse control, with a built-in failsafe to prevent unintended actions.
- **Flexible Policy Support**: Load and run policies from popular RL libraries like Stable-Baselines3 and PyTorch.
- **Real-Time Performance**: The agent loop runs at 6-12 FPS, making it suitable for real-time gameplay.
- **Extensive Logging**: Captures detailed episode data, including actions, rewards, and frame hashes, to a JSONL file for analysis.
- **Safe Dry-Run Mode**: Test your setup and agent logic without executing any mouse actions.

## Architecture

The framework is designed with a modular architecture that separates concerns and allows for easy extension and modification.

```
+---------------------+      +---------------------+      +--------------------+
|    Capture Engine   |----->|   Policy (Agent)    |----->|   Control System   |
| (macOS Quartz)      |      | (PyTorch/SB3)       |      | (PyAutoGUI)        |
+---------------------+      +---------------------+      +--------------------+
          |                            ^                            |
          |                            |                            |
          v                            |                            v
+---------------------+      +---------------------+      +--------------------+
| Image Preprocessing |----->|  Observation Space  |      | Coordinate Mapping |
| (OpenCV)            |      +---------------------+      | (Calibration)      |
+---------------------+                                   +--------------------+
```

1.  **Capture Engine**: Captures the game window and preprocesses the raw pixels into observations for the agent.
2.  **Policy (Agent)**: A trained RL model that takes an observation and returns an action.
3.  **Control System**: Maps the agent's action to screen coordinates and executes it using mouse commands.

## Reinforcement Learning Approach

The primary RL policy for this project is a **Deep Q-Network (DQN)**, chosen for its effectiveness in solving games with discrete action spaces and pixel-based inputs.

### Model Architecture

The DQN uses a convolutional neural network (CNN) to extract features from the game's screen captures. The architecture is as follows:

1.  **Input**: A stack of preprocessed game frames (e.g., 128x128 RGB images).
2.  **Convolutional Layers**: A series of convolutional layers with ReLU activation functions to identify spatial hierarchies of features, such as roads, houses, and factories.
3.  **Fully Connected Layers**: The flattened output from the convolutional layers is passed through one or more fully connected layers to learn a non-linear combination of the features.
4.  **Output Layer**: The final layer outputs a Q-value for each possible action in the action space.

### Training Logic

The DQN is trained using the following logic:

-   **Epsilon-Greedy Strategy**: To balance exploration and exploitation, the agent selects a random action with a probability of epsilon (which decays over time) and the action with the highest Q-value with a probability of 1-epsilon.
-   **Experience Replay**: The agent stores its experiences (state, action, reward, next_state) in a replay buffer. During training, it samples a random minibatch of experiences from the buffer to update the network weights. This decorrelates the experiences and improves training stability.
-   **Target Network**: A separate target network with the same architecture as the main DQN is used to generate the target Q-values. The target network's weights are periodically updated with the main network's weights, which helps to stabilize the learning process.

### Reward Function Design

A crucial component of the RL agent is the reward function. The design philosophy is to create a shaped reward function that guides the agent towards efficient and effective gameplay.

The reward function will be a combination of the following components:

-   **Positive Rewards**:
    -   Successfully connecting a house to a factory of the same color.
    -   Cars successfully reaching their destination.
    -   Collecting pins.
-   **Negative Rewards (Penalties)**:
    -   Cars waiting for a long time at a house.
    -   Factories with a high number of unfulfilled requests.
    -   Inefficient road placement (e.g., overly long roads, unnecessary intersections).
-   **Game Score**: The in-game score will be used as a baseline reward.

To address the challenges of sparse rewards and credit assignment, we will use a **shaped reward function** that provides more frequent feedback to the agent, guiding it towards desirable behaviors.

### Proposed Hyperparameters

| Hyperparameter | Value |
| :--- | :--- |
| Learning Rate | 0.0001 |
| Discount Factor (gamma) | 0.99 |
| Replay Buffer Size | 100,000 |
| Batch Size | 32 |
| Epsilon Start | 1.0 |
| Epsilon End | 0.1 |
| Epsilon Decay | 0.995 |

## Performance and Evaluation

The performance of the agent is evaluated based on the following metrics:

-   **Average Game Score**: The average score achieved by the agent over a set number of episodes.
-   **Number of Cars Served**: The total number of cars that successfully reach their destination.
-   **Average Trip Time**: The average time it takes for a car to travel from a house to a factory.
-   **Resource Utilization**: The efficiency of the agent in using available resources, such as roads and bridges.

The framework's real-time performance is also a key consideration, with the agent loop currently running at **6-12 FPS**.

## Challenges and Future Work

This project presents several challenges and opportunities for future work:

-   **Dynamic Game Environment**: The game is highly dynamic, with new houses and factories appearing over time. The agent must be able to adapt to these changes.
-   **Large Action Space**: The number of possible actions is large, making it difficult for the agent to explore the entire action space.
-   **Credit Assignment Problem**: It is challenging to determine which actions are responsible for the final outcome of the game.

Future work could involve:

-   **Advanced RL Algorithms**: Exploring more advanced RL algorithms, such as Rainbow DQN or Proximal Policy Optimization (PPO).
-   **Improved Network Architectures**: Experimenting with different network architectures, such as using attention mechanisms to focus on important parts of the game screen.
-   **Self-Supervised Learning**: Using self-supervised learning to pre-train the feature extractor on a large dataset of unlabeled game footage.

## Getting Started

### Prerequisites

- macOS (Apple Silicon or Intel)
- Mini Motorways installed
- Python 3.9+
- **macOS Permissions**: Grant **Screen Recording** and **Accessibility** permissions to your Terminal or IDE.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/stericishere/RL-agent-play-Mini-Motorways.git
    cd RL-agent-play-Mini-Motorways
    ```

2.  **Install dependencies:**
    ```bash
    pip install -e .[dev]
    ```

### Calibration

Before running the agent, you need to calibrate the game window.

1.  Launch Mini Motorways.
2.  Run the calibration command and follow the on-screen instructions:
    ```bash
    motorways calibrate --grid-h 32 --grid-w 32
    ```

## Usage

Once the calibration is complete, you can run the agent.

### Dry Run

It is recommended to start with a dry run to ensure that everything is set up correctly. In this mode, the agent will perform all actions except for the final mouse click.

```bash
motorways dry-run --max-steps 50
```

### Live Run

To run the agent with a trained model, use the `play` command:

```bash
motorways play --model path/to/your/model.zip --max-steps 1000
```

## Project Structure

```
motorways-rl/
├── src/motorways/     # Main application source code
│   ├── app/           # CLI entry point
│   ├── capture/       # Screen capture and preprocessing
│   ├── control/       # Mouse control and coordinate mapping
│   ├── policy/        # RL policy loading and action space
│   ├── config/        # Pydantic schemas and defaults
│   └── utils/         # Logging and permission checks
├── tests/             # Pytest unit and integration tests
├── pyproject.toml     # Project metadata and dependencies
└── README.md          # This file
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
