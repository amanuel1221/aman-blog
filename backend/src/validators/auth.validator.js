const validateRegisterInput = ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
    }

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 50) {
        throw new Error("Name must be between 2 and 50 characters");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        throw new Error("Please provide a valid email address");
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
        );
    }
};

const validateLoginInput = (email, password) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        throw new Error("Please provide a valid email address");
    }
};

module.exports={validateRegisterInput,validateLoginInput};