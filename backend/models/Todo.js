// import mongoose from "mongoose";

// const todoSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     complete: {
//       type: Boolean,
//       default: false
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// const Todo = mongoose.model("Todo", todoSchema);

// export default Todo;

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        complete: {
            type: Boolean,
            default: false
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt : {
            type : Date,
            default : Date.now
        }
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", todoSchema)

export default Todo;