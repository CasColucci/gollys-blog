export const sidebarTagPanel = $state<{
    visible: boolean;
    counts: Record<string, number>;
    activeTag: string | null;
    onSelect: (tag: string) => void;
}>({
    visible: false,
    counts: {},
    activeTag: null,
    onSelect: () => {},
});
