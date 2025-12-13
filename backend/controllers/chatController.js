import Thread from '../models/threadModel.js';
import Message from '../models/messageModel.js';
import getOpenAIAPIResponse from '../utils/gemini.js';

const testThread = async(req, res) => {
    try {
        const thread = new Thread({
            threadId: '123',
            title: 'testing new thread',
        });

        const response = await thread.save();
        res.send(response);

    } catch (err) {
        console.error(err);
        res.status(500).json({err: 'Failed to save in DB'});
    }
};

const getAllThreads = async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        res.json(threads);
    } catch(err) {
        console.log(err);
        res.status(500).json({err: 'Failed to fetch thread'});
    }
};

const getThread = async(req, res) => {

    const {threadId} = req.params;

    try {
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            res.status(404).json({message : 'thread not found'});
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({err: 'Failed to fetch chat'});
    }
};


const deleteThread = async(req, res) => {

    const threadId = req.params;

    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread) {
            res.status(404).json({message: 'Thread not Found'});
        }

        res.status(200).json({message: 'chat deleted'});

    }catch(err) {
        console.error(err);
        res.status(500).json({err: 'Failed to delete Thread'});
    }
};


const newThread = async(req, res) => {
    const {threadId, message} = req.body;

    if(!threadId || message) {
        res.status(400).json({error : 'missing required fields'});
    }

    try {
        const newChat = await Thread.findOne({threadId});

        if(!newChat) {
            newChat = new Thread({
                threadId,
                title: message,
                messages : [{role : 'user', content : message}]
            });
        } else {
            newChat.messages.push({role: 'user', content: message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        newChat.messages.push({role: 'assistant', content: assistantReply});
        newChat.updatedAt = new Date();

        await newChat.save();
        res.json({reply : assistantReply});
    } catch(err) {
        console.error(err);
        res.status(500).json({err : 'something went wrong'});
    }
};


export {testThread, getAllThreads, getThread, deleteThread, newThread};