# 🧪 AdminMessagesTable Component Test Documentation

---

## 📌 What was tested / What was done

The **AdminMessagesTable** component renders incoming admin messages and supports both mobile cards and desktop table views.
It also exposes message actions for status toggling and deletion.

---

## 🧩 Component Overview

- Displays incoming messages from users
- Supports responsive views:
  - mobile message cards
  - desktop message table
- Includes actions to:
  - toggle message status
  - delete a message
- Supports selection of a message row

---

## 🧪 Features Tested

### 1. Component rendering

- Verified the messages table wrapper renders
- Used `data-testid="messages-table"`

### 2. Responsive containers

- Verified mobile card container exists
- Used `data-testid="messages-cards"`
- Verified desktop table container exists
- Used `data-testid="messages-table-desktop"`

### 3. Message actions

- Verified the status toggle button invokes handler
- Used `data-testid="message-toggle-1"`
- Verified the delete button is present and accessible
- Used `data-testid="message-delete-1"`

---

## 🔧 How I solved it

- Added clear `data-testid` attributes for both views and action buttons
- Added `aria-label` on action buttons for accessibility and test clarity
- Used user interaction testing for event callbacks

---

## 📊 Final result

- Messages table is responsive and renders both mobile and desktop layouts
- Message toggle and delete actions are testable
- Component structure and accessibility are validated
