const mongoose = require("mongoose");

const validateCreatePostInput = ({
    title,
    excerpt,
    content,
    category,
    tags,
}) => {
    if (!title || !excerpt || !content || !category) {
        throw new Error(
            "Title, excerpt, content, and category are required"
        );
    }

    if (title.trim().length < 5 || title.trim().length > 80) {
        throw new Error(
            "Title must be between 5 and 80 characters"
        );
    }

    if (excerpt.trim().length > 170) {
        throw new Error(
            "Excerpt cannot exceed 170 characters"
        );
    }

    if (content.trim().length < 150) {
        throw new Error(
            "Content must be at least 150 characters"
        );
    }

    if (category.trim().length < 2) {
        throw new Error("Invalid category");
    }

    if (tags !== undefined) {
        if (!Array.isArray(tags)) {
            throw new Error("Tags must be an array");
        }

        if (tags.length > 10) {
            throw new Error("Maximum 10 tags allowed");
        }

        for (const tag of tags) {
            if (
                typeof tag !== "string" ||
                tag.trim().length < 2
            ) {
                throw new Error(
                    "Each tag must contain at least 2 characters"
                );
            }
        }
    }
};

const validateUpdatePostInput = (updateData, allowEmpty = false) => {
    if (!Object.keys(updateData).length && !allowEmpty) {
        throw new Error("No update data provided");
    }

    if (!Object.keys(updateData).length) {
        return;
    }

    if (
        updateData.title &&
        (updateData.title.trim().length < 5 ||
            updateData.title.trim().length > 80)
    ) {
        throw new Error(
            "Title must be between 5 and 80 characters"
        );
    }

    if (
        updateData.excerpt &&
        updateData.excerpt.trim().length > 170
    ) {
        throw new Error(
            "Excerpt cannot exceed 170 characters"
        );
    }

    if (
        updateData.content &&
        updateData.content.trim().length < 150
    ) {
        throw new Error(
            "Content must be at least 150 characters"
        );
    }

    if (
        updateData.tags &&
        !Array.isArray(updateData.tags)
    ) {
        throw new Error("Tags must be an array");
    }
};

const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
    }
};

module.exports = { validateCreatePostInput, validateUpdatePostInput, validateObjectId };