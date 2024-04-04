export interface Env {
	MY_QUEUE: Queue;
	transcribe_video: Service;
	video_process_store: KVNamespace;
}

export default {

    async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const body = await req.json(); // Get the body as an object
        const bodyString = JSON.stringify(body); // Convert the object to a string for sending
        console.log("BODY", bodyString);
        await env.MY_QUEUE.send(bodyString); // Send the serialized string
        return new Response('Sent message to the queue');
    },

    async queue(batch: MessageBatch<any>, env: Env): Promise<void> {
        for (let message of batch.messages) {
            console.log(env.transcribe_video, env.video_process_store);
            const bodyString: string = message.body; // The body is a string here
            const body: any = JSON.parse(bodyString); // Parse the string back into an object
            console.log(`job id: ${message.id} ${body["projectId"]}`);
        }
    },
};
