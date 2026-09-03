import express from "express";
import { signup,signin } from "../controllers/auth";
import { adminOnly,protect } from "../middleware/middleware";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/protected",protect,(req,res)=>{
    res.json({
        message:"you accesses a protected route"
    })
})
router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});


export default router;