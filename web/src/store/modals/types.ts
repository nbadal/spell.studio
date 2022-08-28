export type OpenAppModal = 'add-card' | 'import-json' | 'post-import';

export enum Activity {
    SEARCH = 'Search',
    STYLE = 'Style',
    LAYOUT = 'Layout',
    FILTERING = 'Filtering',
    EXPORT = 'Export',
    DEBUG = 'Debugging',
}

export type ModalsState = {
    openModal: OpenAppModal | null;
    openActivity: Activity | null;
};
