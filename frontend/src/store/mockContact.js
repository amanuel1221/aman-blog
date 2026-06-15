const mockContact = {
  sendMessage: async (formData) => {
    // Simulate backend delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Fake validation like a backend would do
    if (!formData.email || !formData.name || !formData.message) {
      throw new Error("Missing required fields");
    }

    // Simulated success response
    return {
      status: "success",
      message: "Message sent successfully 🚀",
      data: {
        id: `msg_${Date.now()}`,
        ...formData,
      },
    };
  },
};

export default mockContact;