# ML for Adaptive Education

[![Adaptive Education Cover](/assets/projects/adaptive-education.png)](https://github.com/utmgdsc/adaptive-education)

A collection of machine learning models for **adaptive education**, designed to predict student performance on questions. The project implements and evaluates several approaches — including **KNN, Item Response Theory (IRT), Neural Networks**, and an **ensemble model** — to achieve robust predictions.

---

## 📘 Overview

This project applies machine learning to **student–question interaction data**, aiming to:

* Estimate **student ability** and **question difficulty**
* Predict whether a student will answer correctly
* Improve accuracy using **ensemble modeling**

The pipeline supports **standalone model evaluation** as well as **ensemble predictions** for enhanced performance.

---

## ✨ Key Features

* **Multiple Model Implementations**: KNN, IRT, AutoEncoder Neural Network
* **Ensemble Modeling**: Majority-vote ensemble combines model predictions
* **Evaluation Tools**: Scripts to tune, validate, and benchmark models
* **Data Utilities**: Functions for structured loading and preprocessing

---

## 🛠 Technology Stack

* **Languages**: Python
* **Libraries**: NumPy, PyTorch, scikit-learn, Matplotlib, SciPy
* **Data Format**: CSV, NPZ

---

## 🏗 Architecture

The project is modular, supporting independent training and a final ensemble:

1. **Individual Models** – Train and evaluate KNN, IRT, and NN models independently
2. **Ensemble Script** – Aggregates predictions and applies majority voting

---

## ⚡ Quick Start

### Prerequisites

* Python 3.8+
* Required libraries (install via pip):

  ```bash
  pip install numpy scikit-learn matplotlib torch
  ```

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/utmgdsc/adaptive-education.git
   cd adaptive-education
   ```

2. **Prepare the dataset**
   Place files inside `data/` (expected structure):

   ```
   data/
   ├── train_data.csv
   ├── valid_data.csv
   ├── test_data.csv
   ├── train_sparse.npz
   ├── question_meta.csv
   └── subject_meta.csv
   ```

---

## ▶ Usage

Run the provided scripts for training/evaluation:

* **Ensemble Model**

  ```bash
  python ensemble.py
  ```

* **KNN**

  ```bash
  python knn.py
  ```

* **Item Response Theory (IRT)**

  ```bash
  python item_response.py
  ```

* **Neural Network (AutoEncoder)**

  ```bash
  python neural_network.py
  ```

* **Dual IRT (Part B)**

  ```bash
  python "part b/demo_dual_irt.py"
  ```

Each script outputs evaluation metrics and generates plots (accuracy, log-likelihood, etc.).

---

## 📂 Project Structure

```
adaptive-education/
├── data/                   # Dataset files
├── ensemble.py             # Ensemble model (majority voting)
├── knn.py                  # KNN implementation
├── item_response.py        # IRT model
├── neural_network.py       # AutoEncoder NN
├── matrix_factorization.py # SVD
├── part b/                 # Additional models
│   ├── DualIRT.py
│   ├── demo_dual_irt.py
│   ├── question_irt.py
│   └── subject_irt.py
└── utils.py                # Data loading & evaluation helpers
```

---

✅ This version is cleaner, with **icons, emoji headers, and structured sections** for readability.

Would you like me to also add a **Results & Performance section** (with placeholders for accuracy or plots) so future readers immediately see how well each model performs?
