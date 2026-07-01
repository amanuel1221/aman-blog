# Contact Validation Testing

## 🧪 What Was Tested

- Valid contact form submissions
- Missing sender name validation
- Invalid email format validation
- Empty message validation

---

## 🐞 Problems Encountered

### 1. Required Field Validation
The validator needed to reject empty or whitespace-only sender names and messages.

### 2. Email Format Checks
A valid contact message should only pass when the email follows a basic email pattern.

### 3. Boundary Cases
Tests had to ensure that whitespace-only values do not bypass validation.

---

## 🔧 How It Was Solved

- Added validator tests for valid and invalid contact request payloads.
- Checked that required fields are enforced.
- Verified that malformed emails are rejected.
- Confirmed that blank messages are rejected.

---

## 📊 Final Result

✅ Valid contact submissions accepted

✅ Missing name rejected

✅ Invalid email rejected

✅ Empty message rejected

✅ All contact validator tests passing successfully
