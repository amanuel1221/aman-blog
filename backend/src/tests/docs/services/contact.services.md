# Contact Services Testing

## 🧪 What Was Tested

- Creating a new contact message
- Normalizing contact fields such as name, email, company, and message
- Returning paginated contact messages with filters
- Looking up a contact message by ID
- Handling missing messages gracefully

---

## 🐞 Problems Encountered

### 1. Default Values
The service needed to assign a default company value of `Personal` when none was provided.

### 2. Query Building
The pagination and search logic required careful assertions to ensure the correct filter object was built.

### 3. Missing Record Handling
The service should throw a clear error when no contact message exists for a given ID.

---

## 🔧 How It Was Solved

- Mocked the contact model methods so the service layer could be tested without connecting to a database.
- Verified that input values were trimmed and normalized before persistence.
- Checked the filter object passed to the query builder for search and read-state filtering.
- Added tests for both successful retrieval and not-found behavior.

---

## 📊 Final Result

✅ Contact message creation tested successfully

✅ Input normalization covered

✅ Pagination and filtering tested

✅ Single-message lookup tested

✅ Error handling for missing messages covered

✅ All contact service tests passing successfully
