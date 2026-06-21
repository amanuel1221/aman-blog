# 🧪 Contact Page Testing Documentation

## 🧩 What I tested / What was done

## 📌 Contact Component Overview
- Full contact form system with validation
- API submission using `fetch`
- Success & error handling
- Social media links section
- CV download functionality
- Accessibility support (ARIA + semantic HTML)

---

## 🧪 Main Features Tested

## 1. 📄 Page Rendering & UI Structure

### ✔ What was tested
- Main heading renders correctly
- Intro description appears
- Contact section is visible

### ✔ Test strategy
- `getByRole("heading")` → semantic accessibility check
- `getByText()` → visible UI content
- `getByTestId()` → structural validation

### ✔ Assertions
- Page heading exists
- Description text renders
- Contact section is mounted

---

## 2. 🧾 Form Rendering

### ✔ What was tested
- All input fields render correctly
- Form exists in DOM
- Submit button is visible

### ✔ Inputs tested
- Name input
- Email input
- Company input
- Message input

### ✔ Strategy used
- `getByTestId()` for stable selectors
- `getByRole()` for buttons

### ✔ Expected result
- All inputs exist in DOM
- Submit button is accessible

---

## 3. ❌ Empty Form Validation

### ✔ What was tested
- Submitting empty form triggers validation errors

### ✔ Expected errors
- Name required message
- Email required message
- Message required message

### ✔ Assertions
- Error messages appear on submit
- Validation blocks submission

### ✔ Error texts
- "please tell me your name"
- "i'll need your email"
- "please say something"

---

## 4. ⚠️ Invalid Input Validation

### ✔ What was tested
- Numeric name validation
- Invalid email format validation

### ✔ Input scenario
- Name: `1234`
- Email: `wrongemail`

### ✔ Expected behavior
- Name error appears
- Email format error appears

### ✔ Error messages
- "Names usually don't have numbers"
- "doesn't look like a valid email"

---

## 5. 🚀 Successful Form Submission

### ✔ What was tested
- Valid form submission
- API call via `fetch`
- Success UI rendering

### ✔ Mock strategy
- Mocked `fetch` API response
- Simulated success response

### ✔ Expected result
- Success message appears
- Form resets after submission

### ✔ Success message
- "Message sent successfully 🚀 I'll get back to you soon."

---

## 6. 🌐 Social Links & Accessibility

### ✔ What was tested
- GitHub link
- LinkedIn link
- Twitter link
- HackerRank link
- Email link

### ✔ Strategy
- `getByTestId()` for elements
- `toHaveAttribute()` for URL validation
- `getByRole("link")` for accessibility

### ✔ Assertions
- Links exist in DOM
- Correct href attributes
- External links open in new tab (`target="_blank"`)

---

## 7. 📄 CV Download Button

### ✔ What was tested
- CV download button exists
- Accessible as a link role

### ✔ Assertion
- Button renders correctly
- Has correct accessible name

---

## 🐞 Problems I encountered

## 1. ❌ Apostrophe mismatch issue
- Component uses: `Let's`
- Test used: `Let’s`
- ❌ Unicode mismatch caused failure

### ✔ Fix
- Use regex: `/let's/i`

---

## 2. ❌ Wrong role query usage
### Issue
```js
getAllByRole("heading","text")

Final Result
✅ All tests passed
✔ Coverage includes:
Page rendering
Form structure
Input validation
Wrong input handling
Successful submission
API failure handling
Social links
CV download
Accessibility checks