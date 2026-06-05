import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const modules = import.meta.glob('/src/routes/posts/**/+page.md', { eager: true });

    const posts = Object.entries(modules).map(([path, mod]) => {
        const slug = path.split('/').at(-2) ?? '';
        const meta = (mod as { metadata: Record<string, unknown> }).metadata ?? {};
        return { slug, ...meta };
    }) as Post[];

    posts.sort((a, b) => (b.n ?? 0) - (a.n ?? 0));

    return { posts };
};

export type Post = {
    slug: string;
    n: number;
    title: string;
    date: string;
    long: string;
    excerpt: string;
    tags: string[];
    project: string;
    stage: 'seedling' | 'growing' | 'evergreen' | 'neglected';
    img: boolean;
    url?: string;
};
