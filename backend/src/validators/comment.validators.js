const mongoose = require("mongoose");

const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
    }
};

const validateCommentContent = (content) => {
    if (!content || typeof content !== "string") {
        throw new Error("Comment content is required");
    }

    const trimmed = content.trim();

    if (trimmed.length < 2) {
        throw new Error(
            "Comment must be at least 2 characters"
        );
    }

    if (trimmed.length > 500) {
        throw new Error(
            "Comment cannot exceed 500 characters"
        );
    }
};

module.exports = {
    validateObjectId,
    validateCommentContent,
};