import type {Course} from "@/utils/interfaces.ts";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function fetchData(url: string, method: RequestMethod, body?: unknown): Promise<Response> {
    const init: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (body !== undefined && method !== 'GET' && method !== 'DELETE') {
        init.body = JSON.stringify(body);
    }

    const res = await fetch(url, init);
    if (!res.ok) {
        // surface server error text if present
        const msg = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} ${res.statusText}${msg ? ` — ${msg}` : ''}`);
    }
    return res;
}


export async function getActiveCourseData(  ):Promise<Course[]> {

    let res;

    try {
        res = await fetchData('/api/courses','GET');

        let data:Course[] = await res.json();

        data.forEach((value) => {

            if (!value.imgSrc){
                value.imgSrc = `https://picsum.photos/seed/${value.name}/640/320`;
            }
        });

        return data;

    }
    catch (e) {
        console.error('error loading data');
    }

    return [];
}
