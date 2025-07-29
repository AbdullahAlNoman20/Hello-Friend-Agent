# 🛍️ AI Retail Intelligence App

An AI-powered retail application built with **Next.js** (frontend) and **FastAPI** (backend). The system supports smart retail features like **purchase recommendations**, **demand forecasting**, and other AI-driven insights to optimize inventory, increase customer satisfaction, and boost sales.

---

## 📦 Tech Stack

| Layer              | Technology                                    |
| ------------------ | --------------------------------------------- |
| Frontend           | [Next.js](https://nextjs.org/) + Tailwind CSS |
| Backend            | [FastAPI](https://fastapi.tiangolo.com/)      |
| ML/AI Model        | will be updated                               |
| API Testing        | Swagger UI (FastAPI)                          |
| Package Management | Poetry (backend)                              |

---

## 📁 Project Structure

root/
├── app/
│ ├── frontend/ # Next.js (React) application
│ └── backend/ # FastAPI server for API and business logic
├── infra/ # (optional) Infrastructure as code (e.g., Terraform)
├── tests/ # Unit & integration tests (JS + Python)
├── scripts/ # Automation scripts (build, dev, test)
├── playground/ # Experimental notebooks (ML/AI models)
├── .env.example # Template for environment variables
├── README.md

## 🚀 Features

- 🔮 **AI-Driven Purchase Recommendations**
- 📈 **Demand Forecasting for Products**
- 🛒 **Intelligent Inventory Planning**
- ⚡ Fast and scalable APIs with FastAPI
- 🌐 Responsive, modern frontend with Next.js + Tailwind CSS

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (for frontend)
- [Poetry](https://python-poetry.org/) (for backend dependency management)
- Python 3.10+

### 📦 Backend Setup (FastAPI)

```bash
# Navigate to backend
cd app/backend

# Install dependencies using Poetry
poetry install

# Run the FastAPI app
poetry run uvicorn main:app --reload


# Navigate to frontend
cd app/frontend

# Install Node packages
npm install

# Start the dev server
npm run dev
```
