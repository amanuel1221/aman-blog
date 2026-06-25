# Post Validators Testing

## 🧪 What Was Tested

* Post creation validation
* Post update validation
* MongoDB ObjectId validation
* Title, excerpt, content, category, and tags validation
* Success and failure validation scenarios

---

## 🐞 Problems Encountered

### 1. Missing Required Fields

Some test cases failed because required fields such as title, excerpt, content, and category were not provided.

### 2. Tags Validation

Additional validation was needed to ensure tags were arrays and did not exceed the allowed limit.

### 3. Boundary Value Testing

Title, excerpt, and content length limits required dedicated tests to verify validation rules behaved correctly.

---

## 🔧 How It Was Solved

* Added tests for missing required fields.
* Added validation coverage for tags format and tag limits.
* Created boundary tests for minimum and maximum allowed lengths.

---

## 📊 Final Result

✅ Create post validation fully tested

✅ Update post validation fully tested

✅ ObjectId validation tested

✅ Valid and invalid scenarios covered

✅ All validator tests passing successfully
