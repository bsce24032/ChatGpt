import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();

// test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz2",
      title: "testing2",
    });
    const response = await thread.save();
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to save in Db" });
  }
});

// get all Threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    // desending order of updated at. // most recent on top
    res.json(threads);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to fetch Thread in DB" });
  }
});

router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      res.status(404).json({ error: "Chat Not found" });
    }

    return res.json(thread.messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to fetch Chat in DB" });
  }
});

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete(threadId);
    if (!threadId) {
      res
        .status(404)
        .json({ error: "Thread not found Or was not Able to Delete" });
    }
    return res.status(200).json({ success: "The Chat was Deleted Sucesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "failed to Delete Chat in DB" });
  }
});

router.post("/chat", async (req, res) => {
  const {threadId,message} = req.body;
  if(!threadId || !message){
    res.status(400).json({error:"Missing required Fields"});
  }
  try {
    let thread = await Thread.findOne({threadId});
    if(!thread){
     // create a new Thread
     thread = new Thread({
        threadId,
        title:message,
        messages:[{role:"user",content:message}]
     })
    } else{
        thread.messages.push({role:"user",content:message});
    }
    const asistantReply = await getOpenAIAPIResponse(message);
    thread.messages.push({role:"assistant",content:asistantReply});
    thread.updatedAt = new Date();
    await thread.save();
    res.json({reply:asistantReply});
  } catch (err) {
    console.log(err);
    res.status(500).json({error:"Somethong went wrong"});
  }
});

export default router;
