const Caregiver = require('../models/Caregiver');

// Fetch only approved caregivers
exports.getCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find({ approved: true }); // Fetch only approved caregivers
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch all caregivers (For Admin)
exports.getAllCaregivers = async (req, res) => {
    try {
        const caregivers = await Caregiver.find(); // Fetch all caregivers including unapproved
        res.status(200).json(caregivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Approve or Decline Caregiver
exports.approveCaregiver = async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body; // Receive boolean value (true/false)

        const caregiver = await Caregiver.findByIdAndUpdate(
            id,
            { approved },
            { new: true }
        );

        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }

        res.status(200).json({ message: `Caregiver ${approved ? "approved" : "declined"} successfully`, caregiver });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.registerCaregiver = async (req, res) => {
    try {
        const { name, contact_number, email, experience, certifications, availability } = req.body;

        // ✅ Check if the email or phone number already exists
        const existingCaregiver = await Caregiver.findOne({
            $or: [{ email }, { contact_number }]
        });

        if (existingCaregiver) {
            return res.status(400).json({
                message: "This email or phone number is already registered."
            });
        }

        // ✅ If not found, proceed with new caregiver registration
        const newCaregiver = new Caregiver({
            name,
            contact_number,
            email,
            experience,
            certifications,
            availability,
            approved: false, // Default to false until admin approval
        });

        await newCaregiver.save();
        res.status(201).json({ message: "Caregiver registered successfully, pending approval" });

    } catch (error) {
        console.error("❌ Caregiver Registration Error:", error);
        res.status(500).json({ error: error.message });
    }
};


// Delete caregiver by ID
exports.deleteCaregiver = async (req, res) => {
    try {
        const { id } = req.params;

        const caregiver = await Caregiver.findByIdAndDelete(id);

        if (!caregiver) {
            return res.status(404).json({ message: "Caregiver not found" });
        }

        res.status(200).json({ message: "Caregiver deleted successfully" });
    } catch (error) {
        console.error("❌ Delete Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// GET caregiver by ID
exports.getCaregiverById = async (req, res) => {
    try {
      const caregiver = await Caregiver.findById(req.params.id);
      if (!caregiver) {
        return res.status(404).json({ message: "Caregiver not found" });
      }
      res.status(200).json(caregiver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  