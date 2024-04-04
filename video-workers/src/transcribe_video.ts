export interface Env {
	video_process_store: KVNamespace;
}

export default {
	async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response(`${req}`);
    }
}