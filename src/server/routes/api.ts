import express from "express";
const router = express.Router();

/* GET api listing. */
router.get("/", (req: any, res: any) => {
  res.send("api works");
});

export default router;
