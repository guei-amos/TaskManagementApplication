import mongoose from "mongoose";


const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["À faire", "En cours", "Terminée"],
        default: "À faire"
    },

    dueDate: {
        type: Date
    }
},
{
    timestamps: true
}
);

export default mongoose.model("Task", taskSchema);