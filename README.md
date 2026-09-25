# 🍽️ Canteen Meal Tracking System

A **Canteen Meal Tracking System** is a web-based application designed to digitally manage and track daily meal consumption in a college, university, hostel, company, or institutional canteen.

The system helps administrators monitor **student/user meal registrations, daily meal consumption, attendance, meal types, and reports** while reducing manual record-keeping and food wastage.

---

## 📌 Overview

Traditional canteen systems often depend on manual registers or physical meal tokens, making it difficult to accurately track:

* Daily meal consumption
* Breakfast, lunch, and dinner counts
* Individual meal history
* Monthly meal usage
* Canteen attendance
* Food requirements
* Meal statistics

The **Canteen Meal Tracking System** provides a centralized platform to digitally record and manage these activities.

---

## 🎯 Objectives

The main objectives of the system are:

* Digitize the canteen meal tracking process.
* Maintain individual meal consumption records.
* Track daily breakfast, lunch, and dinner.
* Reduce manual paperwork.
* Prevent duplicate meal entries.
* Monitor daily and monthly meal statistics.
* Help administrators estimate food requirements.
* Generate useful reports.
* Reduce food wastage through accurate consumption tracking.

---

## ✨ Features

### 👨‍🎓 User Module

Users can:

* Register and log in
* View their profile
* View available meals
* Register for meals
* Track meal consumption
* View previous meal records
* Check daily/monthly meal history
* View meal statistics

---

### 👨‍💼 Admin Module

Administrators can:

* Manage users
* Manage meal types
* Add/update meal schedules
* Track daily meal consumption
* Monitor canteen attendance
* View meal statistics
* Generate reports
* Manage meal availability
* View individual user meal history

---

## 🍛 Meal Tracking

The system can track different meal types:

| Meal              | Example            |
| ----------------- | ------------------ |
| 🌅 Breakfast      | 7:30 AM – 9:00 AM  |
| ☀️ Lunch          | 12:30 PM – 2:00 PM |
| 🌆 Evening Snacks | 4:30 PM – 5:30 PM  |
| 🌙 Dinner         | 7:30 PM – 9:00 PM  |

Each meal entry can contain:

```text
User ID
User Name
Date
Meal Type
Meal Status
Time
```

---

## 🔄 Meal Workflow

```text
User Login
     ↓
View Meal Schedule
     ↓
Select Meal
     ↓
Meal Registration
     ↓
Meal Verification
     ↓
Meal Consumed
     ↓
Record Stored
     ↓
Admin Dashboard
     ↓
Reports & Statistics
```

---

## 📊 Admin Dashboard

The administrator dashboard can display:

```text
┌─────────────────────────────────────┐
│       CANTEEN DASHBOARD             │
├─────────────────────────────────────┤
│                                     │
│  👥 Total Users          500        │
│  🍳 Breakfast            320        │
│  🍛 Lunch                450        │
│  🍽️ Dinner               390        │
│                                     │
│  📈 Today's Consumption             │
│  📊 Monthly Statistics              │
│                                     │
└─────────────────────────────────────┘
```

The dashboard can provide:

* Total registered users
* Today's meals
* Breakfast count
* Lunch count
* Dinner count
* Cancelled meals
* Monthly consumption
* Meal-wise statistics

---

## 📈 Reports

The system can generate reports such as:

### Daily Report

```text
Date: 25 September 2026

Breakfast:       320
Lunch:           450
Evening Snacks:  280
Dinner:          390
----------------------
Total Meals:     1440
```

### Monthly Report

Administrators can view:

* Total meals consumed
* Meal-wise consumption
* Daily consumption
* User-wise consumption
* Cancelled meals
* Peak meal periods

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* PHP

### Database

* MySQL

### Development Tools

* XAMPP
* Apache
* MySQL
* phpMyAdmin
* Visual Studio Code
* Git
* GitHub

---

## 🏗️ System Architecture

```text
                  ┌──────────────────────┐
                  │  Canteen Meal System │
                  └──────────┬───────────┘
                             │
               ┌─────────────┴─────────────┐
               │                           │
        ┌──────▼──────┐             ┌──────▼──────┐
        │    User     │             │    Admin    │
        └──────┬──────┘             └──────┬──────┘
               │                           │
               │                           │
        Meal Registration           Meal Management
        Meal History               User Management
        Profile                    Reports
               │                           │
               └─────────────┬─────────────┘
                             │
                       ┌─────▼─────┐
                       │    PHP    │
                       │  Backend  │
                       └─────┬─────┘
                             │
                       ┌─────▼─────┐
                       │   MySQL   │
                       │  Database │
                       └───────────┘
```

---

## 📂 Project Structure

```text
Canteen-Meal-Tracking-System/
│
├── admin/
│   ├── dashboard.php
│   ├── users.php
│   ├── meals.php
│   ├── meal_records.php
│   └── reports.php
│
├── user/
│   ├── dashboard.php
│   ├── profile.php
│   ├── meals.php
│   └── meal_history.php
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── config/
│   └── database.php
│
├── includes/
│   ├── header.php
│   ├── footer.php
│   └── auth.php
│
├── uploads/
│
├── index.php
├── login.php
├── register.php
├── logout.php
└── README.md
```

---

## 🗄️ Database Design

The system can use the following major tables:

### Users

```text
users
-----------------------
id
name
email
phone
password
role
status
created_at
```

### Meals

```text
meals
-----------------------
id
meal_name
meal_date
start_time
end_time
status
created_at
```

### Meal Records

```text
meal_records
-----------------------
id
user_id
meal_id
meal_type
meal_date
consumed_at
status
```

### Meal Registration

```text
meal_registration
-----------------------
id
user_id
meal_id
registration_date
status
```

---

## 🔐 Authentication

The system provides authentication for different types of users.

### User

Users can access:

* Dashboard
* Meal registration
* Meal history
* Profile

### Admin

Administrators can access:

* Admin dashboard
* User management
* Meal management
* Meal records
* Reports
* Statistics

---

## 🛡️ Security

The application should implement:

* Secure login
* Password hashing
* Session management
* Role-based authorization
* Input validation
* SQL injection prevention
* Secure database queries
* File-upload validation where applicable

---

## ⚙️ Installation

### 1. Install XAMPP

Install XAMPP with:

* Apache
* MySQL
* PHP
* phpMyAdmin

### 2. Clone Repository

```bash
git clone https://github.com/your-username/canteen-meal-tracking-system.git
```

### 3. Move Project

Place the project inside:

```text
C:\xampp\htdocs\
```

Example:

```text
C:\xampp\htdocs\canteen-meal-tracking-system
```

### 4. Start XAMPP

Start:

```text
Apache
MySQL
```

### 5. Create Database

Open:

```text
http://localhost/phpmyadmin
```

Create:

```text
canteen_db
```

### 6. Import SQL File

Import:

```text
database/canteen_db.sql
```

### 7. Configure Database

Update:

```php
$host = "localhost";
$username = "root";
$password = "";
$database = "canteen_db";
```

### 8. Run Application

Open:

```text
http://localhost/canteen-meal-tracking-system/
```

---

## 📱 Future Enhancements

Future versions can include:

* 📱 Mobile application
* 🔳 QR-code based meal verification
* 📷 QR scanning at the canteen
* 🔔 Meal reminders
* 📧 Email notifications
* 📊 Advanced analytics
* 📈 Food demand prediction
* 🤖 AI-based food consumption forecasting
* 💳 Online meal subscription
* 💰 Digital payment integration
* ☁️ Cloud deployment
* 📄 PDF/Excel reports
* 🔐 Two-factor authentication

---

## 🤖 Smart Food Demand Prediction

An optional future feature is an AI-based food demand prediction system.

Historical consumption data can be analyzed to estimate expected meal requirements.

```text
Historical Meal Data
        ↓
Data Processing
        ↓
Machine Learning Model
        ↓
Expected Meal Demand
        ↓
Food Preparation Planning
        ↓
Reduced Food Wastage
```

For example:

```text
Expected Lunch Consumption
          ↓
        450 meals
          ↓
Prepare appropriate quantity
          ↓
Reduce excess food
```

---

## 🌱 Benefits

The system can help institutions:

* Reduce paperwork
* Track meals accurately
* Reduce duplicate entries
* Monitor canteen attendance
* Estimate food requirements
* Reduce food wastage
* Generate reports quickly
* Maintain centralized records
* Improve administrative efficiency

---

## 🎓 Project Information

**Project Name:** Canteen Meal Tracking System

**Project Type:** Web Application

**Domain:** Canteen / Food Management / Institution Management

**Technology:** PHP, MySQL, HTML, CSS, JavaScript, Bootstrap

**Database:** MySQL

---

## 👩‍💻 Developed By

**Ashmitha D Kotian**

Bachelor of Engineering – Computer Science and Engineering

Shri Madhwa Vadiraja Institute of Technology and Management

---

## 📄 License

This project is developed for **academic and educational purposes**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
